import { z } from 'zod';

// en base a la interface de Services
export const formUpdateServiceSchema = z.object({
    id: z.string({ message: 'Falta el id del servicio' }),
    name: z.string({ message: 'Nombre de servicio requerido' }),
    isActive: z.boolean().optional(),
    createdAt: z.string(),
    updatedAt: z.string()
});

export type formUpdateServiceData = z.infer<typeof formUpdateServiceSchema>;
// no hay default ahora, porque el default será el servicio seleccionado