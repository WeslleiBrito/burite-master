import { ResumeSubgroupModel } from "../types/types"


export class ResumeSubgroup {

    constructor(
        private codSubgroup: number,
        private nameSubgroup: string,
        private amountQuantity: number,
        private amountInvoicing: number,
        private amountCost: number,
        private amountDiscount: number,
        private amountFixed: number,
        private amountVariableExpense: number,
        private fixedUnitExpense: number,
        private subgroupProfit: number,
        private discountPercentage: number,
        private invoicingPercentage: number,
        private costPercentage: number,
        private fixedExpensePercentage: number,
        private subgroupProfitPercentage: number
    ){}
    
    public getAllResumeSubgroup = (): ResumeSubgroupModel => {
        return {
            codSubgroup: this.codSubgroup,
            nameSubgroup: this.nameSubgroup,
            amountQuantity: this.amountQuantity,
            amountInvoicing: this.amountInvoicing,
            amountCost: this.amountCost,
            amountDiscount: this.amountDiscount,
            amountFixed: this.amountFixed,
            amountVariableExpense: this.amountVariableExpense,
            fixedUnitExpense: this.fixedUnitExpense,
            subgroupProfit: this.subgroupProfit,
            discountPercentage: this.discountPercentage,
            invoicingPercentage: this.invoicingPercentage,
            costPercentage: this.costPercentage,
            fixedExpensePercentage: this.fixedExpensePercentage,
            subgroupProfitPercentage: this.subgroupProfitPercentage
        }
    }
    public getCodSubgroup = (): number => {
        return this.codSubgroup
    }

    public getNameSubgroup = (): string => {
        return this.nameSubgroup
    }

    public getAmountQuantity = (): number => {
        return this.amountQuantity
    }

    public getAmountInvoincing = (): number => {
        return this.amountInvoicing
    }

    public getAmountCost = (): number => {
        return this.amountCost
    }

    public getAmountDiscount = (): number => {
        return this.amountDiscount
    }

    public getAmountFixed = (): number => {
        return this.amountFixed
    }

    public getAmountVariableExpense = (): number => {
        return this.amountVariableExpense
    }

    public getFixedUnitExpense = (): number => {
        return this.fixedUnitExpense
    }

    public getSubgroupProfit = (): number => {
        return this.subgroupProfit
    }

    public getDiscountPercentage = (): number => {
        return this.discountPercentage
    }
    
    public getInvoicingPercentage = (): number => {
        return this.invoicingPercentage
    }

    public getCostPercentage = (): number => {
        return this.costPercentage
    }

    public getFixedExpensePercentage = (): number => {
        return this.fixedExpensePercentage
    }

    public getSubgroupProfitPercentage = (): number => {
        return this.subgroupProfitPercentage
    }

}