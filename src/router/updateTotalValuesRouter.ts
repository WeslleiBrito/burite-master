import express from "express"
import { UpdateTotalValuesController } from "../controller/TotalValuesController"
import { UpdateTotalValuesBusiness } from "../business/UpdateTotalValuesBusiness"
import { ExpensesDatabase } from "../database/ExpensesDatabase"
import { UpdateTotalValuesDatabase } from "../database/UpdateTotalValuesDatabase"
import { IdGenerator } from "../services/IdGenerator"
import { InvoicingDatabase } from "../database/InvoicingDatabase"


export const updateTotalValuesRouter = express.Router()


const newUpdateTotalValuesRouterController = new UpdateTotalValuesController (
    new UpdateTotalValuesBusiness(
        new ExpensesDatabase(),
        new InvoicingDatabase(),
        new UpdateTotalValuesDatabase(),
        new IdGenerator()
    )
)

updateTotalValuesRouter.get('/', newUpdateTotalValuesRouterController.getTotalValues)
