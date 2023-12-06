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

    public getSaleItemByDate = async (req: Request, res: Response) => {

        try {
           

            const output = await this.invoicingBusiness.getSaleItemById({initialDate: '2023-12-01', finalDate: '2023-12-06'})

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