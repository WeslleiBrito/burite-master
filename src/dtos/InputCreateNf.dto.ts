import { z } from 'zod';

export interface InputCreateNfDTO {
    codeNF: string,
    commission?: number
}


export const InputCreateNfSchema = z.object(
    {
        codeNF: z.string(
            {
                invalid_type_error: "Espera-se que o código da nota de compra seja uma string.",
                required_error: "É obrigatório informar o código da nota."
            }
        ),
        commission: z.number(
            {
                invalid_type_error: "O valor da comissão deve ser um tipo numérico."
            }
        ).positive(
            {
                message: "A comissão não pode ser um valor negativo ou igual a zero."
            }
        ).optional()
    }
).transform(data => data as InputCreateNfDTO)