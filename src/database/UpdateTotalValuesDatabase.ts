import { TotalValuesDB } from "../types/types";
import { BaseDatabase } from "./BaseDatabase";


export class UpdateTotalValuesDatabase extends BaseDatabase {

    public static TABLE_TOTAL_VALUES = "total_values"

    public createTotalValue = async (input: TotalValuesDB): Promise<void> => {

       await UpdateTotalValuesDatabase.connection(UpdateTotalValuesDatabase.TABLE_TOTAL_VALUES).insert(input)

    }

}