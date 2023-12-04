import { InvoicingDatabase } from "../database/InvoicingDatabase";
import { InvoicingItem, InvoicingItemModel } from "../models/InvoicingItem";



export class InvoicingBusiness {

    constructor(
        private invoicingDatabase: InvoicingDatabase
    ){}

    public getAllSaleItem = async (): Promise<InvoicingItemModel[]> => {

        const result = await this.invoicingDatabase.getSaleItemAll()
        
        return result.map((item): InvoicingItemModel => {
            
            const newInvoicingItem = new InvoicingItem(
                item.produto,
                item.venda,
                item.descricao,
                item.qtd,
                item.qtd_devolvida,
                item.total,
                item.vrunitario,
                item.vrcusto_composicao,
                item.desconto,
                item.fator,
                item.dtvenda
            )

            return newInvoicingItem.getAllInvoicingItem()
        })
        
    }
}