import express from "express"
import { PriceFormationController } from "../controller/PriceFormationController"
import { PriceFormationBusiness } from "../business/PriceFormationBusiness"
import { PriceFormationDatabase } from "../database/PriceFormationDatabase"


export const priceFormationRouter = express.Router()


const newPriceFormationController = new PriceFormationController(
    new PriceFormationBusiness(
        new PriceFormationDatabase()
    )
)

priceFormationRouter.get('/', newPriceFormationController.getOpenPurchases)
