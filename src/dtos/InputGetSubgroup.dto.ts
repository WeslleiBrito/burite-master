import z from 'zod'

export interface inputGetSubgroupDTO {
    initialDate?: string,
    finalDate?: string
} 

const regexDate = /^\d{4}-\d{2}-\d{2}$/

export const inputGetSubgroupSchema = z.object(
    {
        initialDate: z.string({invalid_type_error: 'A data deve ser uma string'}).regex(regexDate, {message: 'Data inicial inválida.'}).optional(),
        finalDate: z.string({invalid_type_error: 'A data deve ser uma string'}).regex(regexDate, {message: 'Data final inválida.'}).optional(),
    }
).transform(data => data as inputGetSubgroupDTO)

