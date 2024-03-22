import z from 'zod'



export interface InputGetUsersDTO {
    token: string
}

export type OutputGetUsersDTO = string[]

export const InputGetUsersSchema = z.object(
    {
        token: z.string({required_error: "O token é obrigatório.", invalid_type_error: "O token deve ser do tipo string"}).min(1, "Token vazio.")
    }
).transform(data => data as InputGetUsersDTO)