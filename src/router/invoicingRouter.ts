import express from "express"
import { InvoicingController } from "../controller/InvoicingController"
import { InvoicingBusiness } from "../business/InvoicingBusiness"
import { InvoicingDatabase } from "../database/InvoicingDatabase"
import { UpdateTotalValuesDatabase } from "../database/UpdateTotalValuesDatabase"


export const invoicingRouter = express.Router()


const newInvoicingController = new InvoicingController(
    new InvoicingBusiness(
        new InvoicingDatabase(),
        new UpdateTotalValuesDatabase()
    )
)

invoicingRouter.get('/', newInvoicingController.getSaleItemByDate)
