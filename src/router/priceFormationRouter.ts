import express from "express"
import { PriceFormationController } from "../controller/PriceFormationController"
import { PriceFormationBusiness } from "../business/PriceFormationBusiness"
import { PriceFormationDatabase } from "../database/PriceFormationDatabase"
import { UpdateSubgroupsDatabase } from "../database/UpdateSubgroupsDatabase"
import { UpdateTotalValuesDatabase } from "../database/UpdateTotalValuesDatabase"


export const priceFormationRouter = express.Router()


const newPriceFormationController = new PriceFormationController(
    new PriceFormationBusiness(
        new PriceFormationDatabase(),
        new UpdateSubgroupsDatabase(),
        new UpdateTotalValuesDatabase()
    )
)

priceFormationRouter.get('/', newPriceFormationController.getOpenPurchases)
priceFormationRouter.get('/all', newPriceFormationController.getOpenPurchasesAll)
priceFormationRouter.post('/', newPriceFormationController.createPriceSale)
priceFormationRouter.post('/products', newPriceFormationController.createPriceSaleProducts)
