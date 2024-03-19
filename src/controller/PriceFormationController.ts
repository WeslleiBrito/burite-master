import { Request, Response } from "express";
import { ZodError } from "zod";
import { BaseError } from "../errors/BaseError";
import { PriceFormationBusiness } from "../business/PriceFormationBusiness";
import { InputCreateNfSchema } from "../dtos/InputCreateNf.dto";
import { InputCreatePriceProductSchema } from "../dtos/InputCreatePriceProduct.dto";
import { CustomError } from "../errors/CustomError";


export class PriceFormationController {

    constructor(
        private priceFormationBusiness: PriceFormationBusiness
    ){}

    public getOpenPurchases = async (req: Request, res: Response) => {

        try {
           
            const output = await this.priceFormationBusiness.getOpenPurchases()

            res.status(200).json(output)

        } catch (error) {
            if (error instanceof ZodError) {
                res.status(400).json(error.issues)
            } else if (error instanceof BaseError) {
                res.status(error.statusCode).json(error.message)
            } else {
                res.json("Erro inesperado\n " + error)
                
            }
        }

    }

    public getOpenPurchasesAll = async (req: Request, res: Response) => {

        try {
           
            const output = await this.priceFormationBusiness.getOpenPurchasesAll()

            res.status(200).json(output)

        } catch (error) {
            if (error instanceof ZodError) {
                res.status(400).json(error.issues)
            } else if (error instanceof BaseError) {
                res.status(error.statusCode).json(error.message)
            } else {
                res.json("Erro inesperado\n " + error)
                
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

            const output = await this.priceFormationBusiness.createPriceSaleNF(input)

            res.status(200).json(output)

        } catch (error) {
            if (error instanceof ZodError) {
                res.status(400).json(error.issues)
            } else if (error instanceof BaseError) {
                res.status(error.statusCode).json(error.message)
            } else {
                res.json("Erro inesperado\n " + error)
                
            }
        }

    }

    public createPriceSaleProducts = async (req: Request, res: Response) => {

        try {
            
            const input = InputCreatePriceProductSchema.parse(
                {
                    products: req.body.products,
                    commission: req.body.commission
                }
            )

            const output = await this.priceFormationBusiness.createPriceSaleProducts(input)

            res.status(200).json(output)

        } catch (error) {
            if (error instanceof ZodError) {
                res.status(400).json(error.issues)
            } else if (error instanceof BaseError) {
                res.status(error.statusCode).json(error.message)
            } else if (error instanceof CustomError){
                res.status(error.codeError).json(
                    {
                        message: error.message,
                        elements: error.elements
                    }
                )
            } else {
                res.json("Erro inesperado\n " + error)
                
            }
        }

    }

}