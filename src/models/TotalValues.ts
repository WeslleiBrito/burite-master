

export class TotalValues {

    constructor(
        private id: string,
        private invoicing: number,
        private cost: number,
        private fixedExpenses: number,
        private variableExpenses: number,
        private createdAt: string,
        private updatedAt: string
    ){}

    public getAllTotatValues = (): TotalValuesModel => {

        return {
            id: this.id,
            invoicing: this.invoicing,
            cost: this.cost,
            fixedExpenses: this.fixedExpenses,
            variableExpenses: this.variableExpenses,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt
        }
    }

    public getId = (): string => {
        return this.id
    }

    public getInvoicing = (): number => {
        return this.invoicing
    }
    
    public getCost = (): number => {
        return this.cost
    }

    public getFixedExpenses = (): number => {
        return this.fixedExpenses
    }

    public getVariableExpenses = (): number => {
        return this.variableExpenses
    }

    public getCreatedAt = (): string => {
        return this.createdAt
    }

    public getUpdatedAt = (): string => {
        return this.updatedAt
    }
}


export interface TotalValuesModel {
    id: string,
    invoicing: number,
    cost: number,
    fixedExpenses: number,
    variableExpenses: number,
    createdAt: string,
    updatedAt: string
}