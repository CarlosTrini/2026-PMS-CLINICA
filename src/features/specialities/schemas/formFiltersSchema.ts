import { STATUS_SIMPLE_ARRAY } from "@/utils/constants";
import { z } from "zod";

export const filterSpecialitySchema = z.object({
    name: z.string().optional(),
    status: z.enum([...STATUS_SIMPLE_ARRAY, 'all']),
    specialities: z.string(),
    orderByCreatedAt: z.enum(['asc', 'desc']),
    orderBySpecialities: z.enum(['asc', 'desc']),
});
export type FilterSpecialityData = z.infer<typeof filterSpecialitySchema>;

export const filtersSpecialityDefault: FilterSpecialityData = {
    name: '',
    status: 'all',
    specialities: 'all',
    orderByCreatedAt: 'asc',
    orderBySpecialities: 'asc',
}

