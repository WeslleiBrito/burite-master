import { ExpensesDatabase } from "../database/ExpensesDatabase";
import { InputDateDTO } from "../dtos/InputDate.dto";


export class ExpensesBusiness {
    constructor(
        private expensesDatabase: ExpensesDatabase
    ){}

    public getExpenses = async () => {
        
        const resultFixed = await this.expensesDatabase.getExpensesFixedByDateInitialDateFinal(undefined)
        const resultVariable = await this.expensesDatabase.getExpensesVaribalByDateInitialDateFinal(undefined)

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

    public getExpenseFixed = async (input: InputDateDTO) => {
        const final = input.final?.toISOString()
        const initial = input.initial?.toISOString()

        
    }
}