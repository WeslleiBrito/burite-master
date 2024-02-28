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

    public getExpenseFixed = async (input?: InputDateDTO): Promise<{value: number, valeuFormatted: string}> => {
        
        let initial: string | undefined
        let final: string | undefined 
        let resultSearch: {rateio_vlrparcela: number}[] = []

        if(!input || (input && (!input.initial && !input.final))){

            initial = "1970-01-01"
            final = new Date().toISOString()

            resultSearch = await this.expensesDatabase.getExpenseFixed({initial, final})

        }else if(input && (input.initial && !input.final)){

            final = new Date().toISOString()
            resultSearch = await this.expensesDatabase.getExpenseFixed({initial: input.initial.toISOString(), final})

        }else if(input && (!input.initial && input.final)){

            initial = "1970-01-01"
            resultSearch = await this.expensesDatabase.getExpenseFixed({initial, final: input.final.toISOString()})

        }else if (input && (input.initial && input.final)){
            resultSearch = await this.expensesDatabase.getExpenseFixed({initial: input.initial.toISOString(), final: input.final.toISOString()})
        }else{
            console.log(input)
        }

        const amount = resultSearch.reduce((accumulator, currentValue) => accumulator + currentValue.rateio_vlrparcela, 0)

        return {
            value: parseFloat(amount.toFixed(2)),
            valeuFormatted: amount.toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL'
            })
        }

    }

    public getExpenseVariable = async (input?: InputDateDTO): Promise<{value: number, valeuFormatted: string}> => {
        
        let initial: string | undefined
        let final: string | undefined 
        let resultSearch: {rateio_vlrparcela: number}[] = []

        if(!input || (input && (!input.initial && !input.final))){

            initial = "1970-01-01"
            final = new Date().toISOString()

            resultSearch = await this.expensesDatabase.getExpenseVariable({initial, final})

        }else if(input && (input.initial && !input.final)){

            final = new Date().toISOString()
            resultSearch = await this.expensesDatabase.getExpenseVariable({initial: input.initial.toISOString(), final})

        }else if(input && (!input.initial && input.final)){

            initial = "1970-01-01"
            resultSearch = await this.expensesDatabase.getExpenseVariable({initial, final: input.final.toISOString()})

        }else if (input && (input.initial && input.final)){
            resultSearch = await this.expensesDatabase.getExpenseVariable({initial: input.initial.toISOString(), final: input.final.toISOString()})
        }

        const amount = resultSearch.reduce((accumulator, currentValue) => accumulator + currentValue.rateio_vlrparcela, 0)

        return {
            value: parseFloat(amount.toFixed(2)),
            valeuFormatted: amount.toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL'
            })
        }

    }

    public getExpenseFixedVariable = async (input?: InputDateDTO): Promise<{fixed: number, variable: number, fixedFormatted: string, variableFormatted: string}> => {

        let initial: string | undefined
        let final: string | undefined 
        let searchFixed: {rateio_vlrparcela: number}[] = []
        let searchVariable: {rateio_vlrparcela: number}[] = []

        if(!input || (input && (!input.initial && !input.final))){

            initial = "1970-01-01"
            final = new Date().toISOString()

            searchVariable = await this.expensesDatabase.getExpenseVariable({initial, final})
            searchFixed = await this.expensesDatabase.getExpenseFixed({initial, final})

        }else if(input && (input.initial && !input.final)){

            final = new Date().toISOString()
            searchVariable = await this.expensesDatabase.getExpenseVariable({initial: input.initial.toISOString(), final})
            searchFixed = await this.expensesDatabase.getExpenseFixed({initial: input.initial.toISOString(), final})

        }else if(input && (!input.initial && input.final)){

            initial = "1970-01-01"
            searchVariable = await this.expensesDatabase.getExpenseVariable({initial, final: input.final.toISOString()})
            searchFixed = await this.expensesDatabase.getExpenseFixed({initial, final: input.final.toISOString()})
        }else if (input && (input.initial && input.final)){
            searchVariable = await this.expensesDatabase.getExpenseVariable({initial: input.initial.toISOString(), final: input.final.toISOString()})
            searchFixed = await this.expensesDatabase.getExpenseFixed({initial: input.initial.toISOString(), final: input.final.toISOString()})
        }

        const amountFixed = searchFixed.reduce((accumulator, currentValue) => accumulator + currentValue.rateio_vlrparcela, 0)
        const amountVariable = searchVariable.reduce((accumulator, currentValue) => accumulator + currentValue.rateio_vlrparcela, 0)
        return {
            fixed: parseFloat(amountFixed.toFixed(2)),
            variable: parseFloat(amountVariable.toFixed(2)),
            fixedFormatted: amountFixed.toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL'
            }),
            variableFormatted: amountVariable.toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL'
            })
        }
    }
}