import express from "express"
import { InvoicingDatabase } from "../database/InvoicingDatabase"
import { UpdateTotalValuesDatabase } from "../database/UpdateTotalValuesDatabase"
import { SubgroupResumeController } from "../controller/SubgroupResumeController"
import { SubgroupResumeBusiness } from "../business/SubgroupResumeBusiness"
import { UpdateSubgroupsDatabase } from "../database/UpdateSubgroupsDatabase"
import { CryptToken } from "../services/CryptToken"
import { TokenManager } from "../services/TokenManager"


export const subgroupResumeRouter = express.Router()


const newInvoicingController = new SubgroupResumeController(
    new SubgroupResumeBusiness(
        new InvoicingDatabase(),
        new UpdateTotalValuesDatabase(),
        new UpdateSubgroupsDatabase(),
        new CryptToken(),
        new TokenManager()
    )
)

subgroupResumeRouter.get('/', newInvoicingController.getSubgroup)
