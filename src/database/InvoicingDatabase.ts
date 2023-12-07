import { InvoicingItemDB } from "../types/types";
import { BaseDatabase } from "./BaseDatabase";


export class InvoicingDatabase extends BaseDatabase{

    public static TABLE_SALE_ITEM = "venda_item"

    public getSaleItemAll = async (): Promise<InvoicingItemDB[]> => {
        const result: InvoicingItemDB[] = await InvoicingDatabase.connection(InvoicingDatabase.TABLE_SALE_ITEM)
        .innerJoin('produto', 'venda_item.produto', 'produto.prod_cod')
        .innerJoin('subgrupo_produtos', 'produto.prod_subgrupo', 'subgrupo_produtos.subprod_cod')
        .select(
            'produto',
            'venda',
            'descricao',
            'prod_dsubgrupo',
            'prod_subgrupo',
            'plucro',
            'qtd',
            'qtd_devolvida',
            'vrunitario',
            'total',
            'vrcusto_composicao',
            'desconto',
            'fator',
            'dtvenda',
            
        )
        
        return result
    }

    public getSaleItemByDate = async (input: {initialDate: string, finalDate: string}): Promise<InvoicingItemDB[]> => {
        const result: InvoicingItemDB[] = await InvoicingDatabase.connection(InvoicingDatabase.TABLE_SALE_ITEM)
        .whereBetween('dtvenda', ['2023-11-01', '2023-11-30'])
        .innerJoin('produto', 'venda_item.produto', 'produto.prod_cod')
        .innerJoin('subgrupo_produtos', 'produto.prod_subgrupo', 'subgrupo_produtos.subprod_cod')
        .select(
            'produto',
            'venda',
            'descricao',
            'prod_dsubgrupo',
            'prod_subgrupo',
            'plucro',
            'qtd',
            'qtd_devolvida',
            'vrunitario',
            'total',
            'vrcusto_composicao',
            'desconto',
            'fator',
            'dtvenda',
            
        )
        
        return result
    }

}