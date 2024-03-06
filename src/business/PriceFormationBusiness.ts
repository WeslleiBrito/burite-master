import { PriceFormationDatabase } from "../database/PriceFormationDatabase";
import { OpenPurchasesDB } from "../types/types";

export class PriceFormationBusiness {
    constructor(
        private database: PriceFormationDatabase
    ){}

    public getOpenPurchases = async () => {

        const result = await this.database.getOpenPurchases()

        const filter: OpenPurchasesDB[] = []

        result.forEach((item) => {

            if(!filter.find(element => element.num_NF === item.num_NF)){
                filter.push(item)
            }
        })

        return filter.map((item) => {
            return {
                nf: item.num_NF,
                provider: item.fornecedor,
                date: item.data
            }
        })
    }
}