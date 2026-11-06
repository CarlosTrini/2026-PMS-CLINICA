import { apiClient } from "@/lib/axios";
import type { HeadquartersDepartment } from "@/types/dataTypes";

export const DepartmentsActionService = {
    async getAllDepartments(idHq: string): Promise<HeadquartersDepartment[]> {
        try {
            const { data } = await apiClient.get<HeadquartersDepartment[]>(`/departments`, {
                params: {
                    headquarterId: idHq
                }
            });
            return data;
        } catch (err: any) {
            throw new Error(err.response?.data?.message || "Error al obtener la sede");
        }
    }
}