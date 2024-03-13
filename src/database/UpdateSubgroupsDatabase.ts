import { ResumeSubgroupDB, Subgroup } from "../types/types";
import { BaseDatabase } from "./BaseDatabase";

export class UpdateSubgroupsDatabase extends BaseDatabase {

    public static UPDATE_SUGROUP_DATABASE_TABLE = 'resume_subgroups'

    public createResumeSubgroup = async (input: ResumeSubgroupDB[]) => {

        await UpdateSubgroupsDatabase.connection(UpdateSubgroupsDatabase.UPDATE_SUGROUP_DATABASE_TABLE).insert(input)
    }

    public updateResumeSubgroup = async (input: ResumeSubgroupDB[]) => {

        for(const value of input){

            await UpdateSubgroupsDatabase.connection(UpdateSubgroupsDatabase.UPDATE_SUGROUP_DATABASE_TABLE)
            .where({cod_subgroup: value.cod_subgroup})
            .update(value)
        }
    }

    public getResumeSubgroup = async (): Promise<ResumeSubgroupDB[]> => {

        const result: ResumeSubgroupDB[] = await UpdateSubgroupsDatabase
        .connection(UpdateSubgroupsDatabase.UPDATE_SUGROUP_DATABASE_TABLE).select("*")

        return result
    }

    public getAllSubgroupsRegistred = async (): Promise<Subgroup[]> => {

        const subgroupSearch: Subgroup[] = await UpdateSubgroupsDatabase.connection('subgrupo_produtos').select("*")

        return subgroupSearch
        
    }
}