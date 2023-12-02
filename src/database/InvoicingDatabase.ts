import { BaseDatabase } from "./BaseDatabase";


export class InvoicingDatabase extends BaseDatabase{

    public static TABLE_SALE_ITEM = "venda_item"

    public getSaleItemAll = async () => {
        return await InvoicingDatabase.connection(InvoicingDatabase.TABLE_SALE_ITEM).whereBetween('dtvenda', ['2023-11-01', '2023-11-30'])
    }

}