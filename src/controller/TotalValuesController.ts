import { Request, Response } from "express";
import { ZodError } from "zod";
import { BaseError } from "../errors/BaseError";
import { UpdateTotalValuesBusiness } from "../business/UpdateTotalValuesBusiness";


export class UpdateTotalValuesController {

    constructor(
        private updateTotalValuesBusiness: UpdateTotalValuesBusiness
    ){}

    public getTotalValues = async (req: Request, res: Response) => {

        try {
           

            const output = await this.updateTotalValuesBusiness.getValuesTotal()

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