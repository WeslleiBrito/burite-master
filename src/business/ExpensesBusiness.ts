import { ExpensesDatabase } from "../database/ExpensesDatabase";


export class ExpensesBusiness {
    constructor(
        private expensesDatabase: ExpensesDatabase
    ){}

    public getExpenses = async () => {
        
        const resultFixed = await this.expensesDatabase.getExpensesFixed(undefined)
        const resultVariable = await this.expensesDatabase.getExpensesVariable(undefined)

        const amountExpenseFixed = resultFixed.map((expense) => {
            return expense.rateio_vlrparcela
        }).reduce((accumulator, currentValue) => accumulator + currentValue, 0)

        const amountExpenseVariable = resultVariable.map((expense) => {
            return expense.rateio_vlrparcela
        }).reduce((accumulator, currentValue) => accumulator + currentValue, 0)

        return {
            fixed: Math.ceil(amountExpenseFixed),
            variable: Math.ceil(amountExpenseVariable)
        }
    }
}