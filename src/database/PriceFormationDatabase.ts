import { OpenPurchasesDB } from "../types/types";
import { BaseDatabase } from "./BaseDatabase";

export class PriceFormationDatabase extends BaseDatabase {

    public static TABLE_SALE_ITEM = "formacao_preco"

    public getOpenPurchases = async (): Promise<OpenPurchasesDB[]> => {
    
        const result: OpenPurchasesDB[] = await PriceFormationDatabase.connection.select(
            'N.numero as num_NF',
            'N.emi_razao as fornecedor',
            PriceFormationDatabase.connection.raw('DATE_FORMAT(N.dtentrada, "%d/%m/%Y") as data'),
            'I.nitem as item',
            'P.prod_cod as codigo',
            'P.prod_descricao',
            'I.und as un',
            'I.qtdestoque as qtd_estoque',
            'I.vrcompra as vr_compra',
            'I.pcustos as perc_custo',
            'I.vrcompra as vr_custo',
            'I.margem',
            'I.vrvenda as vr_venda',
            'I.pdescmax as desconto_max',
            'I.vrcusto_medio',
            'I.qtdentrada',
            'I.vrcompra_novo',
            'I.vrcustoagregado',
            'I.fracao',
            'I.custo as vr_compra_fracionado',
            'I.pcusto_nota as perc_custo_NF',
            'I.vrvenda_novo'
          )
          .from('formacao_preco as F')
          .innerJoin('formacao_itens as I', 'F.codigo', '=', 'I.formacao')
          .innerJoin('produto as P', 'P.prod_cod', '=', 'I.produto')
          .innerJoin('nfc as N', 'N.nfc_codigo', '=', 'F.nf_codigo')
          .where('N.status', '=', 'F')
          .andWhere('F.situacao', '=', '0')
          .orderBy('F.codigo')
          .orderBy('I.nitem')

        return result
    }


}

