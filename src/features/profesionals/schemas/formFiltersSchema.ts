import { STATUS_PROFESSIONAL_ARRAY, HEADQUARTERS_DATA } from "@/utils/constants";
import { z } from "zod";

export const filterProfesionalsSchema = z.object({
    name: z.string().optional(),
    speciality: z.string().default('all'),
    status: z.enum([...STATUS_PROFESSIONAL_ARRAY, 'all']).default('all'),
    headquarters: z.string().default(HEADQUARTERS_DATA[0].id),
    department: z.string().default('all'),
    orderByCreatedAt: z.enum(['asc', 'desc']).default('asc'),
    orderBySpeciality: z.enum(['asc', 'desc']).default('asc'),
    orderByStatus: z.enum(['asc', 'desc']).default('asc'),
});
export type FilterData = z.infer<typeof filterProfesionalsSchema>;
export type FilterInput = z.input<typeof filterProfesionalsSchema>;

export const filtersProfesionalsDefault: FilterData = {
    name: '',
    speciality: 'all',
    status: 'all',
    headquarters: HEADQUARTERS_DATA[0].id,
    department: 'all',
    orderByCreatedAt: 'asc',
    orderBySpeciality: 'asc',
    orderByStatus: 'asc',
}
