import { Request, Response } from "express";
import { ZodError } from "zod";
import { BaseError } from "../errors/BaseError";
import { ExpensesBusiness } from "../business/ExpensesBusiness";


export class ExpensesController {

    constructor(
        private expensesBusiness: ExpensesBusiness
    ){}

    public getAllExpenses = async (req: Request, res: Response) => {

        try {
           
            const output = await this.expensesBusiness.getExpenses()

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