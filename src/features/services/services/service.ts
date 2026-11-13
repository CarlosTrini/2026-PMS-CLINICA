import { apiClient } from "@/lib/axios";
import type { ResponseDataPaginated, Services } from "@/types/dataTypes";

export const ServicesActionService = {
    async getAllServices({ idHq, page = 1, limit = 10 }: { idHq: string, page: number; limit: number }): Promise<ResponseDataPaginated<Services>> {
        try {
            const { data } = await apiClient.get<ResponseDataPaginated<Services>>(`/services`, {
                params: {
                    headquarterId: idHq,
                    page,
                    limit
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