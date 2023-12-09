import { ExpensesDatabase } from "../database/ExpensesDatabase";
import { InvoicingDatabase } from "../database/InvoicingDatabase";
import { UpdateTotalValuesDatabase } from "../database/UpdateTotalValuesDatabase";
import { calculateMonths } from "../services/CalculateMonths";
import { IdGenerator } from "../services/IdGenerator";
import { roundValues } from "../services/RoundValues";
import { TotalValuesDB } from "../types/types";



export class UpdateTotalValuesBusiness {

    constructor(
        private expensesDatabase: ExpensesDatabase,
        private invoicingDatabase: InvoicingDatabase,
        private updateTotalValuesDatabase: UpdateTotalValuesDatabase,
        private idGenerator: IdGenerator
    ){}

    public updateDatabase = async (): Promise<void> => {

        const invoicing = await this.invoicingDatabase.getItensInvoicingSubgroupAll()

        const orderDate = invoicing.sort((a, b) => {
            return new Date(a.dtvenda).getMilliseconds() - new Date(b.dtvenda).getMilliseconds()
        })

        const initialDate = new Date(orderDate[0].dtvenda)
        const finalDate = new Date(orderDate[orderDate.length - 1].dtvenda)

        const months = calculateMonths(initialDate, finalDate)
        
        const amountInvoicing = invoicing.reduce((accumulator, currentValue) => accumulator + currentValue.total, 0)
        const amountCost = invoicing.reduce((accumulator, currentValue) => accumulator + currentValue.vrcusto_composicao * (currentValue.qtd - currentValue.qtd_devolvida), 0)
        const amountDiscount = invoicing.reduce((accumulator, currentValue) => accumulator + currentValue.desconto, 0)
        
        const resultFixed = await this.expensesDatabase.getExpensesFixedByDateInitialDateFinal(undefined)
        const resultVariable = await this.expensesDatabase.getExpensesVaribalByDateInitialDateFinal(undefined)

        const amountExpenseFixed = resultFixed.map((expense) => {
            return expense.rateio_vlrparcela
        }).reduce((accumulator, currentValue) => accumulator + currentValue, 0)

        const amountExpenseVariable = resultVariable.map((expense) => {
            return expense.rateio_vlrparcela
        }).reduce((accumulator, currentValue) => accumulator + currentValue, 0)

        const discountPercentage = amountDiscount && amountInvoicing ? amountDiscount / amountInvoicing : 0
        const variableExpensePercentage = amountExpenseVariable && amountInvoicing ? amountExpenseVariable / amountInvoicing : 0
        const generalMonetaryProfit = roundValues('round', amountInvoicing - (amountCost + amountExpenseFixed + amountExpenseVariable), 2)
        const generalPercentageProfit = roundValues('round', generalMonetaryProfit / amountInvoicing, 2)
        
        const totalVelueExist = await this.updateTotalValuesDatabase.findTotalValue()

        const resume: TotalValuesDB = {
            id: "",
            invoicing: roundValues('round', amountInvoicing, 2),
            cost: roundValues('round', amountCost, 2),
            fixed_expenses: roundValues('round', amountExpenseFixed, 2),
            variable_expenses: roundValues('round', amountExpenseVariable, 2),
            general_monetary_profit: generalMonetaryProfit,
            general_percentage_profit: generalPercentageProfit,
            discount: roundValues('round', amountDiscount, 2),
            variable_expense_percentage: roundValues('round', variableExpensePercentage, 3),
            discount_percentage: roundValues('round', discountPercentage, 2),
            created_at: "",
            updated_at: new Date().toISOString(),
            number_of_months: months
        }

        if(totalVelueExist.length > 0){

            const {id, created_at} = totalVelueExist[0]

            resume.id = id
            resume.created_at = created_at

            await this.updateTotalValuesDatabase.updateTotalValue(resume)

        }else{

            const date = new Date().toISOString()

            resume.id = this.idGenerator.generate()
            resume.created_at = date
            resume.updated_at = date

            await this.updateTotalValuesDatabase.createTotalValue(resume)
        }
    }


    public getValuesTotal = async () => {

        const search = await this.updateTotalValuesDatabase.findTotalValue()

        return search
    }
}