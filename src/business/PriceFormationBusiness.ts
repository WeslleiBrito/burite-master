import { PriceFormationDatabase } from "../database/PriceFormationDatabase";
import { UpdateSubgroupsDatabase } from "../database/UpdateSubgroupsDatabase";
import { UpdateTotalValuesDatabase } from "../database/UpdateTotalValuesDatabase";
import { NotFoundError } from "../errors/NotFoundError";
import { OpenPurchasesDB, OpenPurchasesModel } from "../types/types";

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

    public getOpenPurchasesAll = async (): Promise<OpenPurchasesDB[]> => {

        const result = await this.database.getOpenPurchases()

        return result
    }

    public createPriceSale = async (codeNF: string) => {

        const nfExist = await this.database.getOpenPurchaseByNF(codeNF)

        if(!nfExist){
            throw new NotFoundError('A nf informada não exite.')
        }

        const nfSale = []
    }
}