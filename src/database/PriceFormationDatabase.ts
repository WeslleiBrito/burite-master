import { OpenPurchasesDB, ProductDB } from "../types/types";
import { BaseDatabase } from "./BaseDatabase";

export class PriceFormationDatabase extends BaseDatabase {

    public static TABLE_SALE_ITEM = "formacao_preco"
    public static TABLE_PRODUCT = "produto"

    public getOpenPurchases = async (): Promise<OpenPurchasesDB[]> => {
    
        const result: OpenPurchasesDB[] = await PriceFormationDatabase.connection.select(
            'N.numero as num_NF',
            'N.emi_razao as fornecedor',
            'N.dtentrada as data' ,
            'I.nitem as item',
            'P.prod_cod as codigo',
            'P.prod_subgrupo',
            'P.prod_dsubgrupo',
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
            'I.vrvenda_novo',
            'F.total as total_nf'
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

    public getOpenPurchaseByNF = async (codeNF: string): Promise<OpenPurchasesDB[] | undefined> => {

        const result: OpenPurchasesDB[] = await PriceFormationDatabase.connection.select(
            'N.numero as num_NF',
            'N.emi_razao as fornecedor',
            'N.dtentrada as data' ,
            'I.nitem as item',
            'P.prod_cod as codigo',
            'P.prod_descricao',
            'P.prod_subgrupo',
            'P.prod_dsubgrupo',
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
            'I.vrvenda_novo',
            'F.total as total_nf'
          )
          .from('formacao_preco as F')
          .innerJoin('formacao_itens as I', 'F.codigo', '=', 'I.formacao')
          .innerJoin('produto as P', 'P.prod_cod', '=', 'I.produto')
          .innerJoin('nfc as N', 'N.nfc_codigo', '=', 'F.nf_codigo')
          .where('N.status', '=', 'F')
          .andWhere('F.nf', '=', codeNF)
          .andWhere('F.situacao', '=', '0')
          .orderBy('F.codigo')
          .orderBy('I.nitem')
        
        return result.length === 0 ? undefined : result
    }

    public getProductsByCode = async (input: number[]): Promise<ProductDB[]> => {

      const result: ProductDB[] = await PriceFormationDatabase.connection(PriceFormationDatabase.TABLE_PRODUCT).whereIn(
        "prod_cod",
        input
      ).select(
        "prod_cod as codeProduct",
        "prod_descricao as nameProduct",
        "prod_subgrupo as codeSubgroup",
        "prod_unidade as unit"
      )

      return result

    }   
    
    
}

