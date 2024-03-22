import z from 'zod'


export interface InputDeleteAccountDTO {
    token: string
    id: string
}


export interface OutputDeleteAccountDTO {
    message: string
}


export const InputDeleteAccountSchema = z.object(
    {
        token: z.string({required_error: "O token é obrigatório.", invalid_type_error: "O token deve ser do tipo string"}).min(1, "Token vazio."),
        id: z.string({required_error: "O id é obrigatório.", invalid_type_error: "O id deve ser do tipo string"}).min(1, "Id vazio.")
    }
).transform(data => data as InputDeleteAccountDTO)