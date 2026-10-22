import { DEPARTMENT_ARRAY, SPECIALTY_ARRAY, STATUS_PROFESSIONAL_ARRAY } from "@/utils/datadummy";
import { z } from "zod";

export const filterProfesionalsSchema = z.object({
    name: z.string().optional(),
    specialty: z.enum([...SPECIALTY_ARRAY, 'all']).default('all'),
    status: z.enum([...STATUS_PROFESSIONAL_ARRAY, 'all']).default('all'),
    department: z.enum([...DEPARTMENT_ARRAY, 'all']).default('all'),
    orderByCreatedAt: z.enum(['asc', 'desc']).default('asc'),
    orderBySpecialty: z.enum(['asc', 'desc']).default('asc'),
    orderByStatus: z.enum(['asc', 'desc']).default('asc'),
});

export type FilterData = z.infer<typeof filterProfesionalsSchema>;