import { ResumeSubgroupModel } from "../types/types"


export class ResumeSubgroup {

    constructor(
        private codSubgroup: number,
        private nameSubgroup: string,
        private amountQuantity: number,
        private amountQuantityRetorned: number,
        private amountInvoicing: number,
        private amountCost: number,
        private amountDiscount: number,
        private amountFixed: number,
        private amountVariableExpense: number,
        private fixedUnitExpense: number,
        private pLucro: number,
        private subgroupProfit: number,
        private discountPercentage: number,
        private invoicingPercentage: number,
        private costPercentage: number,
        private fixedExpensePercentage: number,
        private subgroupProfitPercentage: number,
        private updatedAt: string
    ){}
    
    public getAllResumeSubgroup = (): ResumeSubgroupModel => {
        return {
            codSubgroup: this.codSubgroup,
            nameSubgroup: this.nameSubgroup,
            amountQuantity: this.amountQuantity,
            amountQuantityReturned: this.amountQuantityRetorned,
            amountInvoicing: this.amountInvoicing,
            amountCost: this.amountCost,
            amountDiscount: this.amountDiscount,
            amountFixed: this.amountFixed,
            amountVariableExpense: this.amountVariableExpense,
            fixedUnitExpense: this.fixedUnitExpense,
            plucro: this.pLucro,
            subgroupProfit: this.subgroupProfit,
            discountPercentage: this.discountPercentage,
            invoicingPercentage: this.invoicingPercentage,
            costPercentage: this.costPercentage,
            fixedExpensePercentage: this.fixedExpensePercentage,
            subgroupProfitPercentage: this.subgroupProfitPercentage,
            updatedAt: this.updatedAt
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
    public getAmountQuantityRetorned = (): number => {
        return this.amountQuantityRetorned
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

    public getPLucro = (): number => {
        return this.pLucro
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

    public getUpdatedAt = (): string => {
        return this.updatedAt
    }

}