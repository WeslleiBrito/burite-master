import { z } from 'zod';

export interface InputDateDTO {
    initial?: Date,
    final?: Date
}

export const InputDateSchema = z.object(
    {
        initial: z.string({ invalid_type_error: 'A data precisa ser do tipo string.' })
            .optional()
            .refine((value) => {
                if (!value) return true; // Se não houver valor, não aplicar validação
                const parsedDate = new Date(value);
                return !isNaN(parsedDate.getTime());
            })
            .transform((value) => (value ? new Date(value) : undefined)),
        final: z.string({ invalid_type_error: 'A data precisa ser do tipo string.' })
            .optional()
            .refine((value) => {
                if (!value) return true; // Se não houver valor, não aplicar validação
                const parsedDate = new Date(value);
                return !isNaN(parsedDate.getTime());
            })
            .transform((value) => (value ? new Date(value) : undefined))
    }
).transform(data => data as InputDateDTO);
