import { UpdateSubgroupsDatabase } from "../database/UpdateSubgroupsDatabase";
import { ResumeSubgroup } from "../models/ResumeSubgroups";
import { ResumeSubgroupDB, ResumeSubgroupModel } from "../types/types";
import { InvoicingBusiness } from "./InvoicingBusiness";


export class UpdateSubgroupsValues  {

    constructor(
        private invoicingBusiness: InvoicingBusiness,
        private updateSubgroupDatabase: UpdateSubgroupsDatabase 
    ){}
    
    public updateValues = async (): Promise<void> => {
        const subgroups = await this.invoicingBusiness.getAllSaleItem()
        const updateExist = await this.updateSubgroupDatabase.getResumeSubgroup()
        const subgroupsRegistred = await this.updateSubgroupDatabase.getAllSubgroupsRegistred()
        const subgroupDb: ResumeSubgroupDB[] = []
        const dateNow = new Date()

        const subgroupsOut = subgroupsRegistred.filter((item) => {
            if(!subgroups[item.subprod_descricao]){
                return item
            }
        })
        
        subgroupsOut.forEach((item) => {
            subgroups[item.subprod_descricao] = {
                amountCost: 0,
                amountDiscount: 0,
                amountFixed: 0,
                amountInvoicing: 0,
                amountQuantity: 0,
                amountQuantityReturned: 0,
                amountVariableExpense: 0,
                codSubgroup: item.subprod_cod,
                costPercentage: 0,
                discountPercentage: 0,
                fixedExpensePercentage: 0,
                fixedUnitExpense: 0,
                invoicingPercentage: 0,
                nameSubgroup: item.subprod_descricao,
                plucro: item.plucro,
                subgroupProfit:0,
                subgroupProfitPercentage: 0,
                updatedAt: new Date().toISOString()
            }
        })

        Object.entries(subgroups).forEach((item: [string, ResumeSubgroupModel]) => {
            const [key, value] = item

            subgroupDb.push(
                {
                    amount_cost: value.amountCost,
                    amount_discount: value.amountDiscount,
                    amount_fixed: value.amountFixed,
                    amount_variable: value.amountVariableExpense,
                    amount_invoicing: value.amountInvoicing,
                    amount_quantity: value.amountQuantity,
                    amount_quantity_returned: value.amountQuantityReturned,
                    cod_subgroup: value.codSubgroup,
                    cost_percentage: value.costPercentage,
                    discount_percentage: value.discountPercentage,
                    fixed_expense_percentage: value.fixedExpensePercentage,
                    fixed_unit_expense: value.fixedUnitExpense,
                    invoicing_percentage: value.invoicingPercentage,
                    name_subgroup: value.nameSubgroup,
                    plucro: value.plucro,
                    subgroup_profit: value.subgroupProfit,
                    subgroup_profit_percentage: value.subgroupProfitPercentage,
                    updated_at: dateNow
                }
            )
        })

        
        
        if(updateExist.length === 0){
            
            await this.updateSubgroupDatabase.createResumeSubgroup(subgroupDb) 
            
        }else{

            if(updateExist.length < subgroupDb.length){
                const newSubgroup: ResumeSubgroupDB[] = [] 

                Object.entries(subgroups).forEach((item: [string, ResumeSubgroupModel]) => {
                    const [key, value] = item
                    

                    if(!updateExist.find((subgroup) => subgroup.cod_subgroup === value.codSubgroup)){
                        newSubgroup.push(
                            {
                                amount_cost: value.amountCost,
                                amount_discount: value.amountDiscount,
                                amount_fixed: value.amountFixed,
                                amount_variable: value.amountVariableExpense,
                                amount_invoicing: value.amountInvoicing,
                                amount_quantity: value.amountQuantity,
                                amount_quantity_returned: value.amountQuantityReturned,
                                cod_subgroup: value.codSubgroup,
                                cost_percentage: value.costPercentage,
                                discount_percentage: value.discountPercentage,
                                fixed_expense_percentage: value.fixedExpensePercentage,
                                fixed_unit_expense: value.fixedUnitExpense,
                                invoicing_percentage: value.invoicingPercentage,
                                name_subgroup: value.nameSubgroup,
                                plucro: value.plucro,
                                subgroup_profit: value.subgroupProfit,
                                subgroup_profit_percentage: value.subgroupProfitPercentage,
                                updated_at: dateNow
                            }
                        )
                    }
                    
                })

                await this.updateSubgroupDatabase.createResumeSubgroup(newSubgroup)
            }else{
              
                await this.updateSubgroupDatabase.updateResumeSubgroup(subgroupDb)
            }


        }
    }
}