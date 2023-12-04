import { InvoicingItemDB } from "../types/types";
import { BaseDatabase } from "./BaseDatabase";


export class InvoicingDatabase extends BaseDatabase{

    public static TABLE_SALE_ITEM = "venda_item"

    public getSaleItemAll = async (): Promise<InvoicingItemDB[]> => {
        const result: InvoicingItemDB[] = await InvoicingDatabase.connection(InvoicingDatabase.TABLE_SALE_ITEM).whereBetween('dtvenda', ['2023-11-01', '2023-11-30'])
        
        return result
    }

}