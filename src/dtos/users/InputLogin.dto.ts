import z from "zod"


export interface InputLoginDTO {
    email: string
    password: string
}

export interface OutputLoginDTO {
    token: string
    idUser: string
}

export const InputLoginSchema = z.object(
    {
        email: z.string({required_error: "Email não informado.", invalid_type_error: "Tipo de dados inválido, esperava-se strings."})
                .email({message: "Email inválido."}),
        password: z.string({required_error: "Informe a senha.", invalid_type_error: "A senha deve ser do tipo string"}).min(1, {message: "Foi informado uma senha vazia."})
    }
).transform(data => data as InputLoginDTO)