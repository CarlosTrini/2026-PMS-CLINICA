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
    },

    async addNewService(idHq: string, newService: Services) {
        try {
            const { data } = await apiClient.post('/services',
                newService,
                {
                    params: { headquarterId: idHq },
                }
            );
            return data;


        } catch (err: any) {
            throw new Error(err.response?.data?.message || "Error al agregar el servicio");
        }
    },

    async updateNewService(idHq: string, service: Services) {
        try {
            const { data } = await apiClient.patch('/services',
                service,
                {
                    params: { headquarterId: idHq },
                }
            );
            return data;


        } catch (err: any) {
            throw new Error(err.response?.data?.message || "Error al agregar el servicio");
        }
    },

    async deleteNewService(idHq: string, serviceId: Services['id']) {
        try {
            const { data } = await apiClient.delete('/services',
                {
                    params: { headquarterId: idHq, serviceId: serviceId },
                }
            );
            return data;


        } catch (err: any) {
            throw new Error(err.response?.data?.message || "Error al agregar el servicio");
        }
    }


}