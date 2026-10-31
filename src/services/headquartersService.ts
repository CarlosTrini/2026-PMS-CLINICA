import { apiClient } from "@/lib/axios";
import { Headquarters } from "@/types/dataTypes";

export const HeadquartersService = {
    async getHearquarterById(id: string): Promise<Headquarters> {
        try {
            const { data } = await apiClient.get<Headquarters>(`/headquarters/${id}`);
            return data;
        } catch (err: any) {
            throw new Error(err.response?.data?.message || "Error al obtener la sede");
        }
    }

}