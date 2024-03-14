import { PriceFormationDatabase } from "../database/PriceFormationDatabase";
import { UpdateSubgroupsDatabase } from "../database/UpdateSubgroupsDatabase";
import { UpdateTotalValuesDatabase } from "../database/UpdateTotalValuesDatabase";
import { InputCreateNfDTO } from "../dtos/InputCreateNf.dto";
import { InputCreatePriceProductDTO } from "../dtos/InputCreatePriceProduct.dto";
import { CustomError } from "../errors/CustomError";
import { NotFoundError } from "../errors/NotFoundError";
import { InputGeneratePrice, InputProductSalePrice, NF_Price, NfPurchase, OpenPurchasesDB, OpenPurchasesModel, ProductsNf, ProductsPrice, ResumeSubgroupDB } from "../types/types";

export class PriceFormationBusiness {
    constructor(
        private database: PriceFormationDatabase,
        private databaseExpenseFixed: UpdateSubgroupsDatabase,
        private databaseExpenseVariable: UpdateTotalValuesDatabase
    ){}

    public getOpenPurchases = async (): Promise<OpenPurchasesModel[]> => {

        const result = await this.database.getOpenPurchases()

        const filter: OpenPurchasesModel[] = []

        result.forEach((item) => {

            if(!filter.find(purchase => purchase.nf === item.num_NF)){
                filter.push(
                    {
                        nf: item.num_NF,
                        provider: item.fornecedor,
                        value: item.total_nf,
                        date: new Date(item.data)
                    }
                )
            }
        })

        return filter
    }

    public getOpenPurchasesAll = async () => {

        const result = await this.database.getOpenPurchases()
        const itens: NF_Price[] = []
        const numNfs = [... new Set(result.map((nf) => nf.num_NF))]

        numNfs.forEach(item => {

            const filter = result.filter(product => {
                return item === product.num_NF
            })
            
            const findDataNf = result.find((nf) => nf.num_NF === item) as OpenPurchasesDB

            itens.push(
                {
                    nf: findDataNf.num_NF,
                    provider: findDataNf.fornecedor,
                    date: new Date(findDataNf.data),
                    total: findDataNf.total_nf,
                    products: filter.map((p) => {
                        return {
                            item: p.item,
                            code: p.codigo,
                            nameProduct: p.prod_descricao,
                            unit:p.un,
                            codeSubgroup: p.prod_subgrupo,
                            nameSubgroup: p.prod_dsubgrupo,
                            costValue: p.vr_compra_fracionado,
                            inputQuantity: p.qtdentrada,
                            fraction: p.fracao,
                            newSalePrice: p.vrvenda_novo

                        }
                    })
                }
            )
            
        })
        
        return itens
    }

    private generatePrice = (input: InputGeneratePrice) => {

        const {
            commission,
            cost,
            discount,
            expenseFixed,
            expenseVariable,
            profit
        } = input
        
        const price = (cost + expenseFixed) / (1 - (((commission + discount + profit)) + expenseVariable))
        let round = 0

        if(price < 1){
            round = 2
        }else if(price > 1 && price < 2){
            round = 1
        }

        const mult = Math.pow(10, round)
        const valueMult = mult * price
        const priceRound = Math.ceil(valueMult) / mult
        
    
        return Number(price.toFixed(round))

    }

    public createPriceSaleNF = async (input: InputCreateNfDTO): Promise<NfPurchase> => {

        const {codeNF, commission} = input

        const nfs = await this.getOpenPurchasesAll()
        const nfExist = nfs.find((nf) => nf.nf === codeNF)

        if(!nfExist){
            throw new NotFoundError('A nf informada não exite.')
        }
        
        const expenseVariable = (await this.databaseExpenseVariable.findTotalValue())[0].variable_expense_percentage
        const fixedExpenses = await this.databaseExpenseFixed.getResumeSubgroup()

        const products: ProductsNf[] = nfExist.products.map((product) => {
            const subgroup = fixedExpenses.find((subgroupItem) => subgroupItem.cod_subgroup === product.codeSubgroup) as ResumeSubgroupDB
            let profit = 0 

            if(subgroup.discount_percentage < 0.3){

                const profitSubgroup = subgroup.plucro / 100  
                profit = 0.3 - subgroup.discount_percentage > profitSubgroup ? profitSubgroup : 0.3 - subgroup.discount_percentage
            }


            const dataPrice: InputGeneratePrice = {
                commission: (typeof commission === "undefined" ? 1 : commission) / 100,
                cost: product.costValue,
                discount: subgroup.discount_percentage > 0.15 ? subgroup.discount_percentage : 0.15,
                expenseFixed: subgroup.fixed_unit_expense,
                expenseVariable: expenseVariable,
                profit: profit
            }
        
            
            const newSalePrice = this.generatePrice(dataPrice)
            const expenseVariableUnit = Number((expenseVariable * newSalePrice).toFixed(2))
            const discountValueMax = Number(((subgroup.discount_percentage * newSalePrice)).toFixed(2))
            const comm = Number((dataPrice.commission * newSalePrice).toFixed(2)) / 100
            
            const profitUnit = Number((newSalePrice - (
                product.costValue + 
                subgroup.fixed_unit_expense +
                expenseVariableUnit +
                comm +
                discountValueMax
            )).toFixed(2))

            return {
                code: product.code,
                nameProduct: product.nameProduct,
                codeSubgroup: product.codeSubgroup,
                costValue: product.costValue,
                fraction: product.fraction,
                inputQuantity: product.inputQuantity,
                item: product.item,
                nameSubgroup: product.nameSubgroup,
                newSalePrice: newSalePrice,
                unit: product.unit,
                amountCost: Number((product.inputQuantity * product.costValue).toFixed(2)),
                amountInvoicing: Number((product.inputQuantity * newSalePrice).toFixed(2)),
                commission: comm,
                discountPercentageMax: subgroup.discount_percentage,
                discountValueMax,
                expenseFixedUnit: subgroup.fixed_unit_expense,
                expenseVariableUnit,
                profitUnit,
                profitPercentage: Number((profitUnit / newSalePrice).toFixed(3))

            }
        })

        return {
            provider: nfExist.provider,
            nf: nfExist.nf,
            total: nfExist.total,
            date: nfExist.date,
            products: products
        }
    }

    public createPriceSaleProducts = async (input: InputCreatePriceProductDTO) => {

        const {products, commission} = input
        const codesNotLocalized: InputProductSalePrice[] = []

        const itensExist = await this.database.getProductsByCode(products.map(product => product.codeProduct))
        
        if(products.length > itensExist.length){
            products.forEach((product) => {
                const element = itensExist.find((item) => {
                    return item.codeProduct !== product.codeProduct
                })
                
                if(element){
                    codesNotLocalized.push(
                        {
                            codeProduct: product.codeProduct,
                            cost: product.cost
                        }
                    )
                }
            })
        }
        

        if(codesNotLocalized.length > 0){
            throw new CustomError(
                "Existem produtos não localizados na base de dados",
                codesNotLocalized,
                404
            )
        }

        return "Tudo funcionando"

    }
}