import { apiClient } from "@/lib/axios";
import type { Headquarters } from "@/types/dataTypes";

export const HeadquartersService = {
    async getHearquarterById(id: string): Promise<Headquarters> {
        try {
            const { data } = await apiClient.get<Headquarters>(`/headquarters/${id}`);
            return data;
        } catch (err: any) {
            throw new Error(err.response?.data?.message || "Error al obtener la sede");
        }
    },


    async getAllHeadquarters(): Promise<Headquarters[]> {
        try {
            const { data } = await apiClient.get<Headquarters[]>('/headquarters')
            return data;
        } catch (err: any) {
            throw new Error(err.response?.data?.message || "Error al obtener el personal");
        }
    }
}