import { Request, Response } from "express";
import { ZodError } from "zod";
import { BaseError } from "../errors/BaseError";
import { SubgroupResumeBusiness } from "../business/SubgroupResumeBusiness";
import { inputGetSubgroupSchema } from "../dtos/InputGetSubgroup.dto";


export class SubgroupResumeController {

    constructor(
        private subgroupResumeBusiness: SubgroupResumeBusiness
    ){}

    public getSubgroup = async (req: Request, res: Response) => {

        try {
        

            const output = await this.subgroupResumeBusiness.getSubgroup()

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