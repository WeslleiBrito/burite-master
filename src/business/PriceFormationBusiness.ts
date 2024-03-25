import { PriceFormationDatabase } from "../database/PriceFormationDatabase";
import { UpdateSubgroupsDatabase } from "../database/UpdateSubgroupsDatabase";
import { UpdateTotalValuesDatabase } from "../database/UpdateTotalValuesDatabase";
import { InputCreateNfDTO } from "../dtos/InputCreateNf.dto";
import { InputCreatePriceProductDTO } from "../dtos/InputCreatePriceProduct.dto";
import { CustomError } from "../errors/CustomError";
import { NotFoundError } from "../errors/NotFoundError";
import { InputGeneratePrice, InputProductSalePrice, NF_Price, NfPurchase, OpenPurchasesDB, OpenPurchasesModel, ProductDB, ProductsNf, ProductsPrice, ResumeSubgroupDB } from "../types/types";

export class PriceFormationBusiness {
    constructor(
        private database: PriceFormationDatabase,
        private databaseExpenseFixed: UpdateSubgroupsDatabase,
        private databaseExpenseVariable: UpdateTotalValuesDatabase
    ) { }

    public getOpenPurchases = async (): Promise<OpenPurchasesModel[]> => {

        const result = await this.database.getOpenPurchases()

        const filter: OpenPurchasesModel[] = []

        result.forEach((item) => {

            if (!filter.find(purchase => purchase.nf === item.num_NF)) {
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
                            unit: p.un,
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
            code,
            nameProduct,
            codeSubgroup,
            nameSubgroup,
            quantity,
            unit,
            discount,
            expenseFixed,
            expenseVariable,
            fraction,
            item,
            profit,
            profitValue,
        } = input

        const percentageSum = commission + profit + discount + expenseVariable
        
        const limit = percentageSum > 0.99 ? 0.99 - (commission + discount + expenseVariable) : 0

        const price = (cost + expenseFixed + (typeof profitValue !== "undefined" ? profitValue : 0)) / (1 - (((commission + discount + (typeof profitValue !== "undefined" ? 0 : limit > 0 ? limit : profit))) + expenseVariable))
        
        let round = 0

        if (price < 4) {
            round = 2
        } else if (price > 4 && price < 10) {
            round = 1
        }else{
            
        }

        const mult = Math.pow(10, round)
        const valueMult = mult * price      
        let roundedPrice = Math.ceil(valueMult) / mult
        
        const restDivision = Number((roundedPrice % 0.05).toFixed(2))

        if(roundedPrice < 4){
            if (roundedPrice % 0.05 !== 0 && restDivision < 0.05) {
                roundedPrice = Number((roundedPrice + Number((0.05 - restDivision).toFixed(2))).toFixed(2))
            } else if (roundedPrice % 0.05 !== 0 && restDivision > 0.05) {
                roundedPrice = Number((roundedPrice + Number((0.1 - restDivision).toFixed(2)).toFixed(2)))
            }
        }else{
            roundedPrice = Math.ceil(roundedPrice)
        }
        

        const discountValueMax = Number((discount * roundedPrice).toFixed(2))
        const comm = Number((commission * roundedPrice).toFixed(2))
        const expenseVariableUnit = Number((expenseVariable * roundedPrice).toFixed(2))
        const profitUnit = Number((roundedPrice - (
            cost +
            expenseFixed +
            expenseVariableUnit +
            discountValueMax +
            comm
        )).toFixed(2)
        )

        const profitPercentage = Number((profitUnit / roundedPrice).toFixed(2))

        const result: ProductsNf = {
            nameProduct: nameProduct,
            nameSubgroup: nameSubgroup,
            newSalePrice: roundedPrice,
            costValue: cost,
            profitUnit: profitUnit,
            profitPercentage: profitPercentage,
            code: code,
            expenseFixedUnit: expenseFixed,
            expenseVariableUnit: expenseVariableUnit,
            commission: comm,
            codeSubgroup: codeSubgroup,
            amountCost: Number((quantity * cost * fraction).toFixed(2)),
            amountInvoicing: Number((quantity * roundedPrice * fraction).toFixed(2)),
            discountPercentageMax: discount,
            discountValueMax: discountValueMax,
            fraction: fraction,
            inputQuantity: quantity * fraction,
            item: item,
            unit: unit,
            limitedProfitPorcentage: {
                status: limit > 0 ? true : false,
                limit: Number(limit.toFixed(2))
            }
        }

        return result

    }

    public createPriceSaleNF = async (input: InputCreateNfDTO): Promise<NfPurchase> => {

        const { codeNF, commission } = input

        const nfs = await this.getOpenPurchasesAll()
        const nfExist = nfs.find((nf) => nf.nf === codeNF)

        if (!nfExist) {
            throw new NotFoundError('A nf informada não exite.')
        }

        const expenseVariable = (await this.databaseExpenseVariable.findTotalValue())[0].variable_expense_percentage
        const fixedExpenses = await this.databaseExpenseFixed.getResumeSubgroup()

        const products: ProductsNf[] = nfExist.products.map((product) => {
            const subgroup = fixedExpenses.find((subgroupItem) => subgroupItem.cod_subgroup === product.codeSubgroup) as ResumeSubgroupDB
            let profit = 0

            if (subgroup.discount_percentage < 0.3) {

                const profitSubgroup = subgroup.plucro / 100
                profit = profitSubgroup + subgroup.discount_percentage > 0.3 ? 0.3 - subgroup.discount_percentage : profitSubgroup
            }



            const dataPrice: InputGeneratePrice = {
                commission: (typeof commission === "undefined" ? 1 : commission) / 100,
                cost: product.costValue,
                discount: subgroup.discount_percentage > 0.15 ? subgroup.discount_percentage : 0.15,
                expenseFixed: subgroup.fixed_unit_expense,
                expenseVariable: expenseVariable,
                profit: profit,
                code: product.code,
                codeSubgroup: product.codeSubgroup,
                fraction: product.fraction,
                item: product.item,
                nameProduct: product.nameProduct,
                nameSubgroup: product.nameSubgroup,
                quantity: product.inputQuantity,
                unit: product.unit
            }


            const priceItem = this.generatePrice(dataPrice)

            return priceItem

        })

        return {
            provider: nfExist.provider,
            nf: nfExist.nf,
            total: nfExist.total,
            date: nfExist.date,
            products: products
        }
    }

    public createPriceSaleProducts = async (input: InputCreatePriceProductDTO): Promise<NfPurchase> => {

        const { products, nf, date, provider } = input
        const codesNotLocalized: InputProductSalePrice[] = []

        const itensExist = await this.database.getProductsByCode(products.map(product => product.codeProduct))

        if (products.length > itensExist.length) {
            products.forEach((product) => {
                const element = itensExist.find((item) => {
                    return item.codeProduct !== product.codeProduct
                })

                if (element) {
                    codesNotLocalized.push(
                        {
                            codeProduct: product.codeProduct,
                            cost: product.cost,
                            unit: product.unit
                        }
                    )
                }
            })
        }


        if (codesNotLocalized.length > 0) {
            throw new CustomError(
                "Existem produtos não localizados na base de dados",
                codesNotLocalized,
                404
            )
        }

        const expenseVariable = (await this.databaseExpenseVariable.findTotalValue())[0].variable_expense_percentage
        const fixedExpenses = await this.databaseExpenseFixed.getResumeSubgroup()
        let total = 0

        const productsPrice: ProductsNf[] = products.map((product, index) => {

            const item = itensExist.find((productItem) => productItem.codeProduct === product.codeProduct) as ProductDB
            const subgroup = fixedExpenses.find((subgroupItem) => subgroupItem.cod_subgroup === item.codeSubgroup) as ResumeSubgroupDB

            const dataPrice: InputGeneratePrice = {
                code: product.codeProduct,
                codeSubgroup: subgroup.cod_subgroup,
                commission: ((typeof product.commission !== "undefined" ? product.commission : 1)) / 100,
                cost: product.cost,
                discount: product.discount ? product.discount / 100 : subgroup.discount_percentage > 0.15 ? subgroup.discount_percentage : 0.15,
                expenseFixed: subgroup.fixed_unit_expense,
                expenseVariable: expenseVariable,
                fraction: product.fraction ? product.fraction : 1,
                item: index + 1,
                nameProduct: item.nameProduct,
                nameSubgroup: subgroup.name_subgroup,
                profit: (product.profitPercentage ? product.profitPercentage : subgroup.plucro) / 100,
                quantity: product.quantity ? product.quantity : 1,
                unit: product.unit ? product.unit : item.unit,
                profitValue: typeof product.profitValue === "undefined" ? undefined : product.profitValue
            }

            total += dataPrice.cost * dataPrice.quantity * dataPrice.fraction

            return this.generatePrice(dataPrice)

        })

       
        return {
            nf: nf ? nf : "00000",
            date: date ? date : new Date(),
            provider: provider ? provider : "standard",
            total: Number(total.toFixed(2)),
            products: productsPrice
        }

    }
}