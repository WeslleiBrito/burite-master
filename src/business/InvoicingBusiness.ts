import { InvoicingDatabase } from "../database/InvoicingDatabase";


export class InvoicingBusiness {

    constructor(
        private invoicingDatabase: InvoicingDatabase
    ){}

    public getAllSaleItem = async () => {

        return this.invoicingDatabase.getSaleItemAll()
        
    }
}