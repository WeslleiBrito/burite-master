import z from 'zod'

export interface inputGetSubgroupDTO {
    token: string,
    initialDate?: string,
    finalDate?: string
} 

const regexDate = /^\d{4}-\d{2}-\d{2}$/

export const inputGetSubgroupSchema = z.object(
    {
        token: z.string({invalid_type_error: "O token deve ser do tipo string", required_error: "O envio do token é obrigatório."}),
        initialDate: z.string({invalid_type_error: 'A data deve ser uma string'}).regex(regexDate, {message: 'Data inicial inválida.'}).optional(),
        finalDate: z.string({invalid_type_error: 'A data deve ser uma string'}).regex(regexDate, {message: 'Data final inválida.'}).optional(),
    }
).transform(data => data as inputGetSubgroupDTO)

