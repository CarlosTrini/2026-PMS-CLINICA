import { STATUS_PERSONAL_ARRAY, HEADQUARTERS_DATA } from "@/utils/constants";
import { z } from "zod";

export const filterPersonalSchema = z.object({
    name: z.string().optional(),
    speciality: z.string(),
    status: z.enum([...STATUS_PERSONAL_ARRAY, 'all']),
    headquarters: z.string(),
    department: z.string(),
    services: z.string(),
    orderByCreatedAt: z.enum(['asc', 'desc']),
    orderBySpeciality: z.enum(['asc', 'desc']),
    orderByStatus: z.enum(['asc', 'desc']),
});
export type FilterData = z.infer<typeof filterPersonalSchema>;
export type FilterInput = z.input<typeof filterPersonalSchema>;

export const filtersPersonalDefault: FilterData = {
    name: '',
    speciality: 'all',
    status: 'all',
    headquarters: '',
    department: 'all',
    orderByCreatedAt: 'asc',
    orderBySpeciality: 'asc',
    orderByStatus: 'asc',
    services: 'all'
}

