import { UpdateSubgroupsDatabase } from "../database/UpdateSubgroupsDatabase";
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
        const subgroupDb: ResumeSubgroupDB[] = []
        const dateNow = new Date()

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
                                subgroup_profit: value.subgroupProfit,
                                subgroup_profit_percentage: value.subgroupProfitPercentage,
                                updated_at: dateNow
                            }
                        )
                    }
                    
                })

                await this.updateSubgroupDatabase.createResumeSubgroup(newSubgroup)
            }

            await this.updateSubgroupDatabase.updateResumeSubgroup(subgroupDb)

        }
    }
}