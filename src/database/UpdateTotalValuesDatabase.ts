import { TotalValuesDB } from "../types/types";
import { BaseDatabase } from "./BaseDatabase";


export class UpdateTotalValuesDatabase extends BaseDatabase {

    public static TABLE_TOTAL_VALUES = "total_values"

    public findTotalValue = async (): Promise<TotalValuesDB[]> => {

        const result: TotalValuesDB[] = await UpdateTotalValuesDatabase.connectionDatabaseSqlite(UpdateTotalValuesDatabase.TABLE_TOTAL_VALUES)

        return result
    }

    public createTotalValue = async (input: TotalValuesDB): Promise<void> => {

        await UpdateTotalValuesDatabase.connectionDatabaseSqlite(UpdateTotalValuesDatabase.TABLE_TOTAL_VALUES).insert(input)

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
            variable_expense_percentage 
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
                variable_expense_percentage
            }
        ).where({ id })

    }

}