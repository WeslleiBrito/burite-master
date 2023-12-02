import express from "express"
import { InvoicingController } from "../controller/InvoicingController"
import { InvoicingBusiness } from "../business/InvoicingBusiness"
import { InvoicingDatabase } from "../database/InvoicingDatabase"


export const invoicingRouter = express.Router()


const newInvoicingController = new InvoicingController(
    new InvoicingBusiness(
        new InvoicingDatabase()
    )
)

invoicingRouter.get('/', newInvoicingController.getAllSaleItem)
