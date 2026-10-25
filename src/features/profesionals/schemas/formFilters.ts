import { DEPARTMENT_ARRAY, SPECIALITY_ARRAY, STATUS_PROFESSIONAL_ARRAY } from "@/utils/datadummy";
import { z } from "zod";

export const filterProfesionalsSchema = z.object({
    name: z.string().optional(),
    speciality: z.enum([...SPECIALITY_ARRAY, 'all']).default('all'),
    status: z.enum([...STATUS_PROFESSIONAL_ARRAY, 'all']).default('all'),
    department: z.enum([...DEPARTMENT_ARRAY, 'all']).default('all'),
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
    department: 'all',
    orderByCreatedAt: 'asc',
    orderBySpeciality: 'asc',
    orderByStatus: 'asc',
}