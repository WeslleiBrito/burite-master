import { TotalValuesDB } from "../types/types";
import { BaseDatabase } from "./BaseDatabase";


export class UpdateTotalValuesDatabase extends BaseDatabase {

    public static TABLE_TOTAL_VALUES = "total_values"
    public static TABLE_TOTAL_VALUES_MONTHLY = "total_values_monthly"

    public findTotalValue = async (): Promise<TotalValuesDB[]> => {

        const result: TotalValuesDB[] = await UpdateTotalValuesDatabase.connectionDatabaseSqlite(UpdateTotalValuesDatabase.TABLE_TOTAL_VALUES)
        
        return result
    }

    public findTotalValueMonthly = async (): Promise<TotalValuesDB[]> => {

        const result: TotalValuesDB[] = await UpdateTotalValuesDatabase.connectionDatabaseSqlite(UpdateTotalValuesDatabase.TABLE_TOTAL_VALUES_MONTHLY)
        

        return result
    }

    public findTotalValueByDate = async (input: {initialDate: string, finalDate: string}): Promise<TotalValuesDB[]> => {

        const result: TotalValuesDB[] = await UpdateTotalValuesDatabase.connectionDatabaseSqlite(UpdateTotalValuesDatabase.TABLE_TOTAL_VALUES)

        return result
    }

    public createTotalValue = async (input: TotalValuesDB): Promise<void> => {

        await UpdateTotalValuesDatabase.connectionDatabaseSqlite(UpdateTotalValuesDatabase.TABLE_TOTAL_VALUES).insert(input)

    }

    public createTotalValueMonthly = async (input: TotalValuesDB): Promise<void> => {

        await UpdateTotalValuesDatabase.connectionDatabaseSqlite(UpdateTotalValuesDatabase.TABLE_TOTAL_VALUES_MONTHLY).insert(input)

    }

    public updateTotalValue = async (input: TotalValuesDB): Promise<void> => {

        const { 
            id, 
            invoicing, 
            cost, 
            fixed_expenses, 
            variable_expenses, 
            updated_at, 
            discount, 
            discount_percentage, 
            general_monetary_profit, 
            general_percentage_profit, 
            variable_expense_percentage,
            number_of_months 
        } = input

        await UpdateTotalValuesDatabase.connectionDatabaseSqlite(UpdateTotalValuesDatabase.TABLE_TOTAL_VALUES).update(
            {
                invoicing,
                cost,
                fixed_expenses,
                variable_expenses,
                updated_at,
                discount,
                discount_percentage,
                general_monetary_profit,
                general_percentage_profit,
                variable_expense_percentage,
                number_of_months
            }
        ).where({ id })

    }

    public updateTotalValueMonthly = async (input: TotalValuesDB): Promise<void> => {

        const { 
            id, 
            invoicing, 
            cost, 
            fixed_expenses, 
            variable_expenses, 
            updated_at, 
            discount, 
            discount_percentage, 
            general_monetary_profit, 
            general_percentage_profit, 
            variable_expense_percentage 
        } = input

        await UpdateTotalValuesDatabase.connectionDatabaseSqlite(UpdateTotalValuesDatabase.TABLE_TOTAL_VALUES_MONTHLY).update(
            {
                invoicing,
                cost,
                fixed_expenses,
                variable_expenses,
                updated_at,
                discount,
                discount_percentage,
                general_monetary_profit,
                general_percentage_profit,
                variable_expense_percentage
            }
        ).where({ id })

    }

}