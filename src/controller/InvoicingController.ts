import { Request, Response } from "express";
import { ZodError } from "zod";
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

    public getSaleItemByDate = async (req: Request, res: Response) => {

        try {
           

            const output = await this.invoicingBusiness.getSaleItemByDate({initialDate: '2023-12-01', finalDate: ''})

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