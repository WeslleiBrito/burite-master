import { InvoicingDatabase } from "../database/InvoicingDatabase";

export class ProductHistory {
    constructor(
        private invoicingDatabase: InvoicingDatabase
    ){}

    public getAllProductHistory = async () => {
        const historyProducts = await this.invoicingDatabase.getItensInvoicingSubgroupAll()
    }
}