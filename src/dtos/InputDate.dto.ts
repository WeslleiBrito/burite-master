import z from 'zod'

export interface InputDateDTO {
    initial?: Date,
    final?: Date
}


export const InputDateSchema = z.object(
    {
        initial: z.string({ required_error: 'A data de realização do exame é obrigatória.', invalid_type_error: 'A data precisa ser do tipo string.' })
        .refine((value) => {
            const parsedDate = new Date(value);
            return !isNaN(parsedDate.getTime()); // Garante que a string possa ser convertida para um objeto Date válido
        })
        .transform((value) => new Date(value)),
        final: z.string({ required_error: 'A data de realização do exame é obrigatória.', invalid_type_error: 'A data precisa ser do tipo string.' })
        .refine((value) => {
            const parsedDate = new Date(value);
            return !isNaN(parsedDate.getTime()); // Garante que a string possa ser convertida para um objeto Date válido
        })
        .transform((value) => new Date(value))
    }
).transform(data => data as InputDateDTO)