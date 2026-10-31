import { apiClient } from "@/lib/axios";
import { Metrics, Personal } from "@/types/dataTypes";

// DATA FAKE... SUSTITUIR EN EL SERVER
import { PERSONAL_DATA } from "@/utils/constants";

// Simular latencia de red
const mockDelay = await new Promise((resolve) => setTimeout(resolve, 1000));

export const PersonalActionsService = {

    getPersonalById: async (id: string) => {
        const response = await apiClient.get(`/personal/${id}`);
        return response;
    },


    getPersonalMetrics: async (): Promise<Metrics> => {
        await mockDelay;
        const totalInConsultation = PERSONAL_DATA.filter(
            (p) => p.status === "in_consultation"
        ).length;
        const totalStaff = PERSONAL_DATA.length;
        return {
            total: totalStaff,
            status: {
                active: PERSONAL_DATA.filter((p) => p.status === "active").length,
                inactive: PERSONAL_DATA.filter((p) => p.status === "inactive").length,
                on_leave: PERSONAL_DATA.filter((p) => p.status === "on_leave").length,
                on_vacation: PERSONAL_DATA.filter((p) => p.status === "on_vacation").length,
                in_consultation: totalInConsultation,
                on_break: PERSONAL_DATA.filter((p) => p.status === "on_break").length,
                incapacitated: PERSONAL_DATA.filter((p) => p.status === "incapacitated").length,
            },
            specialities: new Set(
                PERSONAL_DATA.flatMap((p) => (p.profesionalInfo ?? []).map((info) => info.speciality))
            ).size,
            operatives: {
                percentaje: totalStaff > 0 ? Math.round((totalInConsultation / totalStaff) * 100) : 0,
            },
        };

    },

    getPersonal: async (): Promise<Personal[]> => {
        try {
            const { data } = await apiClient.get<Personal[]>('/personal');
            return data;
        } catch (err: any) {
            throw new Error(err.response?.data?.message || "Error al obtener el personal");
        }
    },

    getPersonalByHeadquarter: async (headquarterId: string): Promise<Personal[]> => {
        try {
            const { data } = await apiClient.get<Personal[]>(`/personal/${headquarterId}`);
            return data;
        } catch (err: any) {
            throw new Error(err.response?.data?.message || "Error al obtener el personal");
        }
    },

    updatePersonal: async (personal: Personal): Promise<{ success: boolean, message: string }> => {
        // const response = await apiClient.put(`/personal/${id}`, personal);

        await mockDelay;
        return { success: true, message: 'Personal actualizado correctamente' };

    },


    createPersonal: async (personal: any) => {
        const response = await apiClient.post('/personal', personal);
        return response.data;
    },


    deletePersonal: async (id: string) => {
        const response = await apiClient.delete(`/personal/${id}`);
        return response.data;
    },
};

