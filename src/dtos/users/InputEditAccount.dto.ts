import z from "zod"

export interface InputEditAccountDTO {
    token: string
    id: string
    name?: string
    password?: string
}

export interface OutputEditAccountDTO {
    message: string
}

export const InputEditAccountSchema = z.object(
    {
        token: z.string({required_error: "O token é obrigatório.", invalid_type_error: "Espera-se que o token seja uma string"}).min(1, "O token vazio."),
        id: z.string({required_error: "O id é obrigatório.", invalid_type_error: "O id deve ser uma string"}).min(1, "Id vazio"),
        name: z.string({invalid_type_error: "Espera-se que o name venha como string."}).min(3, {message: "O nome precisa ter pelo menos 3 caracteres."}).optional(),
        password: z.string({invalid_type_error: "Espera-se que o password venha como string."}).min(5, {message: "O password precisa ter pelo menos 5 caracteres."}).optional()
    }
)