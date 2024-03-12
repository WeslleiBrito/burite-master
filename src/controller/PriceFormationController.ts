import { Request, Response } from "express";
import { ZodError } from "zod";
import { BaseError } from "../errors/BaseError";
import { PriceFormationBusiness } from "../business/PriceFormationBusiness";
import { InputCreateNfSchema } from "../dtos/InputCreateNf.dto";


export class PriceFormationController {

    constructor(
        private priceFormationBusiness: PriceFormationBusiness
    ){}

    public getOpenPurchases = async (req: Request, res: Response) => {

        try {
           
            const output = await this.priceFormationBusiness.getOpenPurchases()

            res.status(200).send(output)

        } catch (error) {
            if (error instanceof ZodError) {
                res.status(400).send(error.issues)
            } else if (error instanceof BaseError) {
                res.status(error.statusCode).send(error.message)
            } else {
                res.send("Erro inesperado\n " + error)
                
            }
        }

    }

    public getOpenPurchasesAll = async (req: Request, res: Response) => {

        try {
           
            const output = await this.priceFormationBusiness.getOpenPurchasesAll()

            res.status(200).send(output)

        } catch (error) {
            if (error instanceof ZodError) {
                res.status(400).send(error.issues)
            } else if (error instanceof BaseError) {
                res.status(error.statusCode).send(error.message)
            } else {
                res.send("Erro inesperado\n " + error)
                
            }
        }

    }

    public createPriceSale = async (req: Request, res: Response) => {

        try {
            
            const input = InputCreateNfSchema.parse(
                {
                    codeNF: req.body.codeNF,
                    commission: req.body.commission
                }
            )

            const output = await this.priceFormationBusiness.createPriceSale(input)

            res.status(200).send(output)

        } catch (error) {
            if (error instanceof ZodError) {
                res.status(400).send(error.issues)
            } else if (error instanceof BaseError) {
                res.status(error.statusCode).send(error.message)
            } else {
                res.send("Erro inesperado\n " + error)
                
            }
        }

    }

}