import { InvoicingDatabase } from "../database/InvoicingDatabase";
import { UpdateTotalValuesDatabase } from "../database/UpdateTotalValuesDatabase";
import { InvoicingItem, InvoicingItemModel } from "../models/InvoicingItem";
import { ResumeSubgroup } from "../models/ResumeSubgroups";
import { roundValues } from "../services/RoundValues";
import { ResumeSubgroupModel } from "../types/types";



export class InvoicingBusiness {

    constructor(
        private invoicingDatabase: InvoicingDatabase,
        private updateTotalValuesDatabase: UpdateTotalValuesDatabase
    ){}
    
    public getAllSaleItem = async (): Promise<{[key: string]: ResumeSubgroupModel}> => {
        
        const result = await this.invoicingDatabase.getItensInvoicingSubgroupAll()
        const [totals] = await this.updateTotalValuesDatabase.findTotalValue()
        const date = new Date().toDateString()
        const resumeSubgroup: {[key: string]: ResumeSubgroupModel} = {}
        
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
            
                const amountQuantity = itensSubgrupo.reduce((accumulator, currentValue) => accumulator + currentValue.quantity, 0)
                const quantityReturned = itensSubgrupo.reduce((accumulator, currentValue) => accumulator + currentValue.quantityReturned, 0)
                const amountInvoicing = itensSubgrupo.reduce((accumulator, currentValue) => accumulator + ((currentValue.amountSale / currentValue.quantity) * (currentValue.quantity - currentValue.quantityReturned)), 0)
                const amountCost = ((itensSubgrupo.reduce((accumulator, currentValue) => accumulator + (currentValue.cost * currentValue.quantity), 0)) / amountQuantity) * (amountQuantity - quantityReturned)
                const amountDiscount = itensSubgrupo.reduce((accumulator, currentValue) => accumulator + ((currentValue.discount / currentValue.quantity) * (currentValue.quantity - currentValue.quantityReturned)), 0)
                const amountFixed = (amountInvoicing / totals.invoicing) * totals.fixed_expenses
                const amountVariableExpense = amountInvoicing * totals.variable_expense_percentage
                const fixedUnitExpense = amountFixed / (amountQuantity - quantityReturned)
                const subgroupProfit = amountInvoicing - (amountCost + amountFixed + (amountInvoicing * totals.variable_expense_percentage))
                const discountPercentage = amountDiscount / (amountDiscount + amountInvoicing)
                const invoicingPercentage = amountInvoicing / totals.invoicing
                const costPercentage = amountCost / totals.cost
                const fixedExpensePercentage = amountFixed / totals.fixed_expenses
                const subgroupProfitPercentage = subgroupProfit / totals.general_monetary_profit

                const newResumeSubgroup = new ResumeSubgroup (
                    item.codSubgroup,
                    item.nameSubgroup,
                    roundValues('round', amountQuantity - quantityReturned, 2),
                    roundValues('round', amountInvoicing, 2),
                    roundValues('round', amountCost, 2),
                    roundValues('round', amountDiscount, 2),
                    roundValues('round', amountFixed, 2),
                    roundValues('round', amountVariableExpense, 2),
                    roundValues('round', fixedUnitExpense, 3),
                    roundValues('round', subgroupProfit, 2),
                    roundValues('round', discountPercentage, 2),
                    roundValues('round', invoicingPercentage, 2),
                    roundValues('round', costPercentage, 2),
                    roundValues('round', fixedExpensePercentage, 2),
                    roundValues('round', subgroupProfitPercentage, 2),
                    date
                    
                )
                resumeSubgroup[item.nameSubgroup] = newResumeSubgroup.getAllResumeSubgroup()
            }
        })

        return resumeSubgroup
        
    }

    public getSaleItemByDate = async (input: {initialDate: string, finalDate: string}): Promise<{[key: string]: ResumeSubgroupModel}> => {

        const result = await this.invoicingDatabase.getSaleItemByDate({initialDate: input.initialDate, finalDate: input.finalDate})
        const [totals] = await this.updateTotalValuesDatabase.findTotalValueMonthly()
        const date = new Date().toDateString()
        const resumeSubgroup: {[key: string]: ResumeSubgroupModel} = {}
        
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
            
                const amountQuantity = itensSubgrupo.reduce((accumulator, currentValue) => accumulator + currentValue.quantity, 0)
                const quantityReturned = itensSubgrupo.reduce((accumulator, currentValue) => accumulator + currentValue.quantityReturned, 0)
                const amountInvoicing = itensSubgrupo.reduce((accumulator, currentValue) => accumulator + ((currentValue.amountSale / currentValue.quantity) * (currentValue.quantity - currentValue.quantityReturned)), 0)
                const amountCost = ((itensSubgrupo.reduce((accumulator, currentValue) => accumulator + (currentValue.cost * currentValue.quantity), 0)) / amountQuantity) * (amountQuantity - quantityReturned)
                const amountDiscount = itensSubgrupo.reduce((accumulator, currentValue) => accumulator + ((currentValue.discount / currentValue.quantity) * (currentValue.quantity - currentValue.quantityReturned)), 0)
                const amountVariableExpense = amountInvoicing * totals.variable_expense_percentage
                const amountFixed = (amountInvoicing / totals.invoicing) * totals.fixed_expenses
                const fixedUnitExpense = amountFixed / (amountQuantity - quantityReturned)
                const subgroupProfit = amountInvoicing - (amountCost + amountFixed + (amountInvoicing * totals.variable_expense_percentage))
                const discountPercentage = amountDiscount / amountInvoicing
                const invoicingPercentage = amountInvoicing / totals.invoicing
                const costPercentage = amountCost / totals.cost
                const fixedExpensePercentage = amountFixed / totals.fixed_expenses
                const subgroupProfitPercentage = subgroupProfit / totals.general_monetary_profit

                const newResumeSubgroup = new ResumeSubgroup (
                    item.codSubgroup,
                    item.nameSubgroup,
                    roundValues('round', amountQuantity - quantityReturned, 2),
                    roundValues('round', amountInvoicing, 2),
                    roundValues('round', amountCost, 2),
                    roundValues('round', amountDiscount, 2),
                    roundValues('round', amountFixed, 2),
                    roundValues('round', amountVariableExpense, 2),
                    roundValues('round', fixedUnitExpense, 2),
                    roundValues('round', subgroupProfit, 2),
                    roundValues('round', discountPercentage, 2),
                    roundValues('round', invoicingPercentage, 2),
                    roundValues('round', costPercentage, 2),
                    roundValues('round', fixedExpensePercentage, 2),
                    roundValues('round', subgroupProfitPercentage, 2),
                    date
                    
                )
                resumeSubgroup[item.nameSubgroup] = newResumeSubgroup.getAllResumeSubgroup()
            }
        })

        return resumeSubgroup
        
    }
}