import z from "zod"

export interface InputSignupDTO {
    name: string,
    email: string,
    password: string
}

export interface OutputSignupDTO {
    message: string,
    token: string
}

export const InputSignupSchema = z.object(
    {
        name: z.string({required_error: "Nome não informado.",  invalid_type_error: "Espera-se que o nome venha como string."}).min(3, {message: "O nome precisa ter pelo menos 3 caracteres."}),
        email: z.string({required_error: "Email não informado.",  invalid_type_error: "Espera-se que o email venha como string."}).email({message: "Email inválido."}),
        password: z.string({required_error: "Senha não informado.",  invalid_type_error: "Espera-se que a senha venha como string."}).min(5, {message: "O password precisa ter pelo menos 5 caracteres."})
    }
).transform(data => data as InputSignupDTO)
