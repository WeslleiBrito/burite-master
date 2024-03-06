import { InvoicingDatabase } from "../database/InvoicingDatabase";
import { UpdateSubgroupsDatabase } from "../database/UpdateSubgroupsDatabase";
import { UpdateTotalValuesDatabase } from "../database/UpdateTotalValuesDatabase";
import { inputGetSubgroupDTO } from "../dtos/InputGetSubgroup.dto";
import { InvoicingItem, InvoicingItemModel } from "../models/InvoicingItem";
import { ResumeSubgroup } from "../models/ResumeSubgroups";
import { roundValues } from "../services/RoundValues";
import { InvoicingItemDB, ResumeSubgroupDB, ResumeSubgroupModel } from "../types/types";



export class SubgroupResumeBusiness {

    constructor(
        private invoicingDatabase: InvoicingDatabase,
        private updateTotalValuesDatabase: UpdateTotalValuesDatabase,
        private updateSubgroupsDatabase: UpdateSubgroupsDatabase
    ){}
    
    public getInvoicingSubgroup = async (input: inputGetSubgroupDTO): Promise<{[key: string]: ResumeSubgroupModel}> => {
        
        const {initialDate, finalDate} = input

        let result: InvoicingItemDB[] = []
        const updateDate = new Date().toISOString()

        if(initialDate && finalDate){
            result = await this.invoicingDatabase.getSaleItemByDate({initialDate, finalDate})
        }else if(initialDate){
            result = await this.invoicingDatabase.getItensInvoicingSubgroupByInitialDate(initialDate)
        }else if(finalDate){
            result = await this.invoicingDatabase.getItensInvoicingSubgroupByFinalDate(finalDate)
        }else{
            result = await this.invoicingDatabase.getItensInvoicingSubgroupAll()
        }

        const [totals] = await this.updateTotalValuesDatabase.findTotalValue()

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
                const amountQuantityReturned = itensSubgrupo.reduce((accumulator, currentValue) => accumulator + currentValue.quantityReturned, 0)
                const amountInvoicing = itensSubgrupo.reduce((accumulator, currentValue) => accumulator + ((currentValue.amountSale / currentValue.quantity) * (currentValue.quantity - currentValue.quantityReturned)), 0)
                const amountCost = ((itensSubgrupo.reduce((accumulator, currentValue) => accumulator + (currentValue.cost * currentValue.quantity), 0)) / amountQuantity) * (amountQuantity - amountQuantityReturned)
                const amountDiscount = itensSubgrupo.reduce((accumulator, currentValue) => accumulator + ((currentValue.discount / currentValue.quantity) * (currentValue.quantity - currentValue.quantityReturned)), 0)
                const amountFixed = (amountInvoicing / totals.invoicing) * totals.fixed_expenses
                const amountVariableExpense = amountInvoicing * totals.variable_expense_percentage
                const fixedUnitExpense = amountFixed / (amountQuantity - amountQuantityReturned)
                const subgroupProfit = amountInvoicing - (amountCost + amountFixed + (amountInvoicing * totals.variable_expense_percentage))
                const discountPercentage = amountDiscount / (amountDiscount + amountInvoicing)
                const invoicingPercentage = amountInvoicing / totals.invoicing
                const costPercentage = amountCost / totals.cost
                const fixedExpensePercentage = amountFixed / totals.fixed_expenses
                const subgroupProfitPercentage = subgroupProfit / totals.general_monetary_profit

                const newResumeSubgroup = new ResumeSubgroup (
                    item.codSubgroup,
                    item.nameSubgroup,
                    roundValues('round', amountQuantity - amountQuantityReturned, 2),
                    roundValues('round', amountQuantityReturned, 2),
                    roundValues('round', amountInvoicing, 2),
                    roundValues('round', amountCost, 2),
                    roundValues('round', amountDiscount, 2),
                    roundValues('round', amountFixed, 2),
                    roundValues('round', amountVariableExpense, 2),
                    roundValues('round', fixedUnitExpense, 2),
                    item.baseProfit,
                    roundValues('round', subgroupProfit, 2),
                    roundValues('round', discountPercentage, 2),
                    roundValues('round', invoicingPercentage, 2),
                    roundValues('round', costPercentage, 2),
                    roundValues('round', fixedExpensePercentage, 2),
                    roundValues('round', subgroupProfitPercentage, 2),
                    updateDate
                )
                resumeSubgroup[item.nameSubgroup] = newResumeSubgroup.getAllResumeSubgroup()
            }
        })

        return resumeSubgroup
        
    }

    public getSubgroup = async (): Promise<ResumeSubgroupModel[]> => {

        const result: ResumeSubgroupDB[] = await this.updateSubgroupsDatabase.getResumeSubgroup()
        
        const resultModel: ResumeSubgroupModel[] = result.map((subgroup) => {

            const model: ResumeSubgroupModel = {
                amountCost: subgroup.amount_cost,
                amountDiscount: subgroup.amount_discount,
                amountFixed: subgroup.amount_fixed,
                amountInvoicing: subgroup.amount_invoicing,
                amountQuantity: subgroup.amount_quantity,
                amountQuantityReturned: subgroup.amount_quantity_returned,
                amountVariableExpense: subgroup.amount_variable,
                codSubgroup: subgroup.cod_subgroup,
                costPercentage: subgroup.cost_percentage,
                discountPercentage: subgroup.discount_percentage,
                fixedExpensePercentage: subgroup.fixed_expense_percentage,
                fixedUnitExpense: subgroup.fixed_unit_expense,
                plucro: subgroup.plucro,
                invoicingPercentage: subgroup.invoicing_percentage,
                nameSubgroup: subgroup.name_subgroup,
                subgroupProfit: subgroup.subgroup_profit,
                subgroupProfitPercentage: subgroup.subgroup_profit_percentage,
                updatedAt: subgroup.updated_at.toISOString()
            }

            return model
        })
        
        return resultModel
    }
}