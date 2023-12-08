import express from "express"
import { InvoicingDatabase } from "../database/InvoicingDatabase"
import { UpdateTotalValuesDatabase } from "../database/UpdateTotalValuesDatabase"
import { SubgroupResumeController } from "../controller/SubgroupResumeController"
import { SubgroupResumeBusiness } from "../business/SubgroupResumeBusiness"


export const subgroupResumeRouter = express.Router()


const newInvoicingController = new SubgroupResumeController(
    new SubgroupResumeBusiness(
        new InvoicingDatabase(),
        new UpdateTotalValuesDatabase()
    )
)

subgroupResumeRouter.get('/', newInvoicingController.getInvoicingSubgroup)
