import { InvoicingItemDB } from "../types/types";
import { BaseDatabase } from "./BaseDatabase";


export class InvoicingDatabase extends BaseDatabase{

    public static TABLE_SALE_ITEM = "venda_item"

    public getSaleItemAll = async (): Promise<InvoicingItemDB[]> => {
        const result: InvoicingItemDB[] = await InvoicingDatabase.connection(InvoicingDatabase.TABLE_SALE_ITEM)
        
        return result
    }

    public getSaleItemByDate = async (input: {initialDate: string, finalDate: string}): Promise<InvoicingItemDB[]> => {
        const result: InvoicingItemDB[] = await InvoicingDatabase.connection(InvoicingDatabase.TABLE_SALE_ITEM).whereBetween('dtvenda', [input.initialDate, input.finalDate])
        
        return result
    }

}