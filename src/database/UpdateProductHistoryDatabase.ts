import { BaseDatabase } from "./BaseDatabase";


export class UpdateProductHistoryDatabase extends BaseDatabase {

    public static VENDA_ITEM = "venda_item" 

    public getAllProductHistory = async () => {

        const result = await UpdateProductHistoryDatabase.connection(UpdateProductHistoryDatabase.VENDA_ITEM)
        .innerJoin('venda', 'venda_item.venda', 'venda.vend_cod')
        .innerJoin('funcionario', 'vendedor', 'funcionario.fun_cod')

        return result
    }
}