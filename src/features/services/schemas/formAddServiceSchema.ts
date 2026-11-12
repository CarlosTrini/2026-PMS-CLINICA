import { z } from "zod";

export const formAddServiceSchema = z.object({
    name: z.string('Nombre requerido').min(1),
    status: z.boolean().optional(),
});

export type formAddServiceData = z.infer<typeof formAddServiceSchema>;

export const formAddServiceDefault: formAddServiceData = {
    name: '',
    status: false,
}