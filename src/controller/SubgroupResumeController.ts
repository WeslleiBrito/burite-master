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
            
            const input = inputGetSubgroupSchema.parse(
                {
                    token: req.headers.authorization,
                    initialDate: req.body.initialDate,
                    finalDate: req.body.finalDate
                }
            )
            
            const output = await this.subgroupResumeBusiness.getSubgroup(input)

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