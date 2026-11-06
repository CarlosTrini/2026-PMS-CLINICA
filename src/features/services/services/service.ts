import { apiClient } from "@/lib/axios";
import type { Services } from "@/types/dataTypes";

export const ServicesActionService = {
    async getAllServices(idHq: string): Promise<Services[]> {
        try {
            const { data } = await apiClient.get<Services[]>(`/services`, {
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