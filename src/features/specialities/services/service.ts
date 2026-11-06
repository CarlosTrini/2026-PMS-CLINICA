import { apiClient } from "@/lib/axios";
import type { Speciality } from "@/types/dataTypes";

export const SpecialitiesActionService = {
    async getAllSpecialities(idHq: string): Promise<Speciality[]> {
        try {
            const { data } = await apiClient.get<Speciality[]>(`/specialities`, {
                params: {
                    headquarterId: idHq
                }
            });
            return data;
        } catch (err: any) {
            throw new Error(err.response?.data?.message || "Error al obtener especialidades de la sede");
        }
    }
}