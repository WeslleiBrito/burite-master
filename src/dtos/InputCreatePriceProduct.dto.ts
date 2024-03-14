import { z } from 'zod';
import { InputProductSalePrice } from '../types/types';

export interface InputCreatePriceProductDTO {
    products: InputProductSalePrice[],
    commission?: number
}

const objectProductSchema = z.object(
    {
        codeProduct: z.number({
            invalid_type_error: "O código do produto deve ser um número.", 
            required_error: "Informe o código do produto."
        }).positive(
            {
                message: "O código do produto não pode ser menor ou igual a zero."
            }
        ),

        cost: z.number(
            {
                invalid_type_error: "O custo do produto deve ser um número.",
                required_error: "Informe o custo do produto"
            }
        ),

        profitPercentage: z.number({invalid_type_error: "A porcentagem de lucro deve ser um número."}).nonnegative(
            {
                message: "A porcentagem de lucro não pode ser um valor negativo"
            }
        ).optional(),

        profitValue: z.number({invalid_type_error: "O valor do lucro deve ser do tipo numérico."}).nonnegative(
            {
                message: "O valor do lucro não pode ser negativo"
            }
        ).optional(),
        commission: z.number(
            {
                invalid_type_error: "O valor da comissão deve ser um tipo numérico."
            }
        ).nonnegative(
            {
                message: "A comissão não pode ser negativa."
            }
        ).optional()
        
    }
)

export const InputCreatePriceProductSchema = z.object(
    {
        products: z.array(
            objectProductSchema,
            {
                invalid_type_error: "Os produtos devem ser um arry de objetos",
                required_error: "É obrigatório informar o(s) produto(s)."
            }
        ),
        commission: z.number(
            {
                invalid_type_error: "O valor da comissão deve ser um tipo numérico."
            }
        ).nonnegative(
            {
                message: "A comissão não pode ser negativa."
            }
        ).optional()
    }
).transform(data => data as InputCreatePriceProductDTO)