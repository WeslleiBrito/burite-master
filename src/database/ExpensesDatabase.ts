import { BaseDatabase } from "./BaseDatabase";


export class ExpensesDatabase extends BaseDatabase {

    public static TABLE_TIPO_CONTA = "tipoconta"

    public getExpensesFixedByDateInitialDateFinal = async (input: {initialDate: string, finalDate: string} | undefined): Promise<{rateio_vlrparcela: number}[]> => {

        if(input){
            const {initialDate, finalDate} = input
            const result: {rateio_vlrparcela: number}[] = await ExpensesDatabase.connection(ExpensesDatabase.TABLE_TIPO_CONTA).innerJoin('pagar_rateio', 'tipoconta.tipocont_cod', 'pagar_rateio.rateio_tipoconta')
            .whereBetween('pagar_rateio.rateio_dtvencimento', [initialDate, finalDate]).where({conta_fixa: 1})
            return result
        }

        const result: {rateio_vlrparcela: number}[] = await ExpensesDatabase.connection(ExpensesDatabase.TABLE_TIPO_CONTA)
        .innerJoin('pagar_rateio', 'tipoconta.tipocont_cod', 'pagar_rateio.rateio_tipoconta').where({conta_fixa: 1})
       
       return result

    }

    public getExpensesVaribalByDateInitialDateFinal = async (input: {initialDate: string, finalDate: string} | undefined): Promise<{rateio_vlrparcela: number}[]> => {

        if(input){
            const {initialDate, finalDate} = input
            const result: {rateio_vlrparcela: number}[] = await ExpensesDatabase.connection(ExpensesDatabase.TABLE_TIPO_CONTA).innerJoin('pagar_rateio', 'tipoconta.tipocont_cod', 'pagar_rateio.rateio_tipoconta')
            .whereBetween('pagar_rateio.rateio_dtvencimento', [initialDate, finalDate]).whereNotIn('tipocont_cod', [75, 79]).where({conta_fixa: 0})
            return result
        }

        const result: {rateio_vlrparcela: number}[] = await ExpensesDatabase.connection(ExpensesDatabase.TABLE_TIPO_CONTA)
        .innerJoin('pagar_rateio', 'tipoconta.tipocont_cod', 'pagar_rateio.rateio_tipoconta').whereNotIn('tipocont_cod', [75, 79]).where({conta_fixa: 0})
       
       return result

    }

    public getExpenseFixed = async (input: {initial: string, final: string}): Promise<{rateio_vlrparcela: number}[]> => {
        const {initial, final} = input
        const result: {rateio_vlrparcela: number}[] = await ExpensesDatabase.connection(ExpensesDatabase.TABLE_TIPO_CONTA).innerJoin('pagar_rateio', 'tipoconta.tipocont_cod', 'pagar_rateio.rateio_tipoconta')
        .whereBetween('pagar_rateio.rateio_dtvencimento', [initial, final]).where({conta_fixa: 1})

        return result
    }

    public getExpenseVariable = async (input: {initial: string, final: string}): Promise<{rateio_vlrparcela: number}[]> => {
        const {initial, final} = input
        const result: {rateio_vlrparcela: number}[] = await ExpensesDatabase.connection(ExpensesDatabase.TABLE_TIPO_CONTA).innerJoin('pagar_rateio', 'tipoconta.tipocont_cod', 'pagar_rateio.rateio_tipoconta')
        .whereBetween('pagar_rateio.rateio_dtvencimento', [initial, final]).whereNotIn('tipocont_cod', [75, 79]).where({conta_fixa: 0})
        
        return result
    }
}