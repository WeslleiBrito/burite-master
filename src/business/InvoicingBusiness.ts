import { InvoicingDatabase } from "../database/InvoicingDatabase";
import { UpdateTotalValuesDatabase } from "../database/UpdateTotalValuesDatabase";
import { InvoicingItem, InvoicingItemModel } from "../models/InvoicingItem";



export class InvoicingBusiness {

    constructor(
        private invoicingDatabase: InvoicingDatabase,
        private updateTotalValuesDatabase: UpdateTotalValuesDatabase
    ){}
    
    public getAllSaleItem = async (): Promise<{[key: string]: InvoicingItemModel[]}> => {
        
        const result = await this.invoicingDatabase.getSaleItemAll()

        const resumeSubgroup: {[key: string]: InvoicingItemModel[]} = {}
        
        const itens = result.map((item): InvoicingItemModel => {
            
            const newInvoicingItem = new InvoicingItem(
                item.produto,
                item.venda,
                item.descricao,
                item.prod_dsubgrupo,
                item.prod_subgrupo,
                item.plucro,
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

        itens.forEach((item) => {

            if(!resumeSubgroup[item.nameSubgroup]){

                const itensSubgrupo = itens.filter((sale) => {
                    return sale.nameSubgroup === item.nameSubgroup
                })

                resumeSubgroup[item.nameSubgroup] = itensSubgrupo
            }
        })

        return resumeSubgroup
        
    }

    public getSaleItemById = async (input: {initialDate: string, finalDate: string}): Promise<{[key: string]: InvoicingItemModel & {fixedExpense: number}[]}> => {

        const result = await this.invoicingDatabase.getSaleItemByDate(input)
        const globalValues = await this.updateTotalValuesDatabase.findTotalValue()

        const resumeSubgroup: {[key: string]: InvoicingItemModel[]} = {}
        
        const itens = result.map((item): InvoicingItemModel => {
            
            const newInvoicingItem = new InvoicingItem(
                item.produto,
                item.venda,
                item.descricao,
                item.prod_dsubgrupo,
                item.prod_subgrupo,
                item.plucro,
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

        itens.forEach((item) => {

            if(!resumeSubgroup[item.nameSubgroup]){

                const itensSubgrupo = itens.filter((sale) => {
                    return sale.nameSubgroup === item.nameSubgroup
                })
                
                const subgroupBillingAmount = itensSubgrupo.reduce((accumulator, currentValue) => accumulator + currentValue.amountSale, 0)

                resumeSubgroup[item.nameSubgroup] = itensSubgrupo
            }
        })

        return resumeSubgroup
        
    }
}