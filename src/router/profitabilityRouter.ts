import express from "express"
import { ProfitabilityController } from "../controller/ProfitabilityController"
import { ProfitabilityBusiness } from "../business/ProfitabilityBusiness"
import { InvoicingBusiness } from "../business/InvoicingBusiness"
import { InvoicingDatabase } from "../database/InvoicingDatabase"
import { UpdateTotalValuesDatabase } from "../database/UpdateTotalValuesDatabase"

export const profitabilityRouter = express.Router()

const newProfitabilityController = new ProfitabilityController(
    new ProfitabilityBusiness(
        new InvoicingBusiness(
            new InvoicingDatabase(),
            new UpdateTotalValuesDatabase()
        )
    )
)

profitabilityRouter.get('/', newProfitabilityController.getResultByDate)