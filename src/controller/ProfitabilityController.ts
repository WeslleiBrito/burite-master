import { Request, Response } from "express";
import { ZodError } from "zod";
import { BaseError } from "../errors/BaseError";
import { ProfitabilityBusiness } from "../business/ProfitabilityBusiness";
import { InputDateSchema } from "../dtos/InputDate.dto";


export class ProfitabilityController {

    constructor(
        private profitabilityBusiness: ProfitabilityBusiness
    ){}

    public getResultByDate = async (req: Request, res: Response) => {

        try {

            const input = InputDateSchema.parse(
                {
                    initial: req.body.initial,
                    final: req.body.final
                }
            )
           
            const output = await this.profitabilityBusiness.resultByDate(input)

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