import { Request, Response } from "express";
import { ZodError, date } from "zod";
import { BaseError } from "../errors/BaseError";
import { InvoicingBusiness } from "../business/InvoicingBusiness";


export class InvoicingController {

    constructor(
        private invoicingBusiness: InvoicingBusiness
    ){}

    public getAllSaleItem = async (req: Request, res: Response) => {

        try {
           

            const output = await this.invoicingBusiness.getAllSaleItem()

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

    public getAllSaleItemTest = async (req: Request, res: Response) => {

        try {
           

            const output = await this.invoicingBusiness.getProductsTest()

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

    public getSaleItemByDate = async (req: Request, res: Response) => {

        try {
           

            const output = await this.invoicingBusiness.getSaleSubgroupByDate({initialDate: new Date('2023-12-01'), finalDate: undefined})

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
}