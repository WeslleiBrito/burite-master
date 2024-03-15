import { z } from 'zod';
import { InputProductSalePrice } from '../types/types';

export interface InputCreatePriceProductDTO {
    products: InputProductSalePrice[],
    nf?: string,
    date?: Date,
    provider?: string
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
                required_error: "Informe o custo do produto."
            }
        ),
        unit: z.string(
            {
                invalid_type_error: "A unidade deve ser do tipo string.",
                required_error: "A unidade deve ser informada."
            }
        ).min(1, {message: "A unidade não pode ser vazia."}),
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
        ).optional(),
        discount: z.number(
            {
                invalid_type_error: "O valor do desconto deve ser um tipo numérico."
            }
        ).nonnegative(
            {
                message: "O desconto não pode ser negativa."
            }
        ).optional(),
        quantity: z.number(
            {
                invalid_type_error: "A quantidade deve ser um tipo numérico."
            }
        ).positive(
            {
                message: "A quantidade deve ser um valor maior que zero."
            }
        ).optional(),
        fraction: z.number(
            {
                invalid_type_error: "O valor da fração deve ser um tipo numérico."
            }
        ).positive(
            {
                message: "A fração deve ter um valor maior que zero."
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
        nf: z.string(
            {
                invalid_type_error: "O número da nota deve ser do tipo string."
            }
        ).min(1, {message: "O número da nota não pode ser vazia."}).optional(),
        date: z.string({ invalid_type_error: 'A data precisa ser do tipo string.' })
        .optional()
        .refine((value) => {
            if (!value) return true; // Se não houver valor, não aplicar validação
            const parsedDate = new Date(value);
            return !isNaN(parsedDate.getTime());
        })
        .transform((value) => (value ? new Date(value) : undefined)),
        provider: z.string(
            {
                invalid_type_error: "O nome do fornecedor deve ser do tipo string."
            }
        ).min(1, {message: "O nome do fornecedor não pode ser vazio."}).optional()
    }
).transform(data => data as InputCreatePriceProductDTO)