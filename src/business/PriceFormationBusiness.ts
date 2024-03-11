import { PriceFormationDatabase } from "../database/PriceFormationDatabase";
import { UpdateSubgroupsDatabase } from "../database/UpdateSubgroupsDatabase";
import { UpdateTotalValuesDatabase } from "../database/UpdateTotalValuesDatabase";
import { NotFoundError } from "../errors/NotFoundError";
import { NF_Price, OpenPurchasesDB, OpenPurchasesModel, ProductsPrice } from "../types/types";

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

        result.forEach(item => {

            const filter = result.filter(product => {
                return item.num_NF === product.num_NF
            })

            itens.push(
                {
                    nf: item.num_NF,
                    provider: item.fornecedor,
                    date: new Date(item.data),
                    total: item.total_nf,
                    products: filter.map((p) => {
                        return {
                            item: p.item,
                            code: p.codigo,
                            nameProduct: p.prod_descricao,
                            unit:p.un,
                            codeSubgroup: p.prod_subgrupo,
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

    public createPriceSale = async (codeNF: string) => {

        const nfExist = await this.database.getOpenPurchaseByNF(codeNF)

        if(!nfExist){
            throw new NotFoundError('A nf informada não exite.')
        }

        const nfSale = []
    }
}