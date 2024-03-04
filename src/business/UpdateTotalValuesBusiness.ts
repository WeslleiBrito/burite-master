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

        let amountInvoicing: number = 0
        let amountCost: number = 0
        let amountDiscount: number = 0

        invoicing.forEach((item) => {

            if(item.qtd_devolvida > 0){
                const qtd_final = item.qtd - item.qtd_devolvida
                if(qtd_final > 0){
                    amountInvoicing += (item.total / item.qtd) * qtd_final
                    amountCost += item.vrcusto_composicao * qtd_final
                    amountDiscount += (item.desconto / item.qtd) * qtd_final
                }
            }else{
                amountInvoicing += item.total
                amountCost += item.vrcusto_composicao * item.qtd
                amountDiscount += item.total
            }
        })
        
        const resultFixed = await this.expensesDatabase.getExpenseFixed({initial: initialDate.toISOString(), final: finalDate.toISOString()})
        const resultVariable = await this.expensesDatabase.getExpenseVariable({initial: initialDate.toISOString(), final: finalDate.toISOString()})
        
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


    public getValuesTotal = async (): Promise<TotalValuesDB[]> => {

        const search = await this.updateTotalValuesDatabase.findTotalValue()

        return search
    }
}