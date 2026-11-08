import { STATUS_SIMPLE_ARRAY } from "@/utils/constants";
import { z } from "zod";

export const filterServicesSchema = z.object({
    name: z.string().optional(),
    status: z.enum([...STATUS_SIMPLE_ARRAY, 'all']),
    services: z.string(),
    orderByCreatedAt: z.enum(['asc', 'desc']),
    orderByServices: z.enum(['asc', 'desc']),
});
export type FilterServicesData = z.infer<typeof filterServicesSchema>;

export const filtersServicesDefault: FilterServicesData = {
    name: '',
    status: 'all',
    services: 'all',
    orderByCreatedAt: 'asc',
    orderByServices: 'asc',
}

