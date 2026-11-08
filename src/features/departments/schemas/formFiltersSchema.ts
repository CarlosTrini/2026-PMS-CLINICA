import { STATUS_SIMPLE_ARRAY } from "@/utils/constants";
import { z } from "zod";

export const filterDepartmentsSchema = z.object({
    name: z.string().optional(),
    status: z.enum([...STATUS_SIMPLE_ARRAY, 'all']),
    department: z.string(),
    deptoSpeciality: z.string(),
    orderByCreatedAt: z.enum(['asc', 'desc']),
    orderByDepartment: z.enum(['asc', 'desc']),
});
export type FilterDepartmentsData = z.infer<typeof filterDepartmentsSchema>;

export const filtersDepartmentsDefault: FilterDepartmentsData = {
    name: '',
    department: 'all',
    status: 'all',
    deptoSpeciality: 'all',
    orderByCreatedAt: 'asc',
    orderByDepartment: 'asc',
}

