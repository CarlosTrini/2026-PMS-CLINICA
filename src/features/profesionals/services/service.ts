import { apiClient } from "@/lib/axios";
import { Metrics, Professional } from "@/types/dataTypes";

// DATA FAKE... SUSTITUIR EN EL SERVER
import { PROFESIONALS_DATA } from "@/utils/datadummy";

// Simular 400ms de latencia de red
const mockDelay = await new Promise((resolve) => setTimeout(resolve, 1000));

export const ProfesionalActionsService = {

    getProfesional: async (id: string) => {
        const response = await apiClient.get(`/profesionales/${id}`);
        return response.data;
    },


    getProfesionalsMetrics: async (): Promise<Metrics> => {
        await mockDelay;
        const totalInConsultation = PROFESIONALS_DATA.filter(
            (p) => p.status === "in_consultation"
        ).length;
        const totalStaff = PROFESIONALS_DATA.length;
        return {
            total: totalStaff,
            status: {
                active: PROFESIONALS_DATA.filter((p) => p.status === "active").length,
                inactive: PROFESIONALS_DATA.filter((p) => p.status === "inactive").length,
                on_leave: PROFESIONALS_DATA.filter((p) => p.status === "on_leave").length,
                on_vacation: PROFESIONALS_DATA.filter((p) => p.status === "on_vacation").length,
                in_consultation: totalInConsultation,
                on_break: PROFESIONALS_DATA.filter((p) => p.status === "on_break").length,
                incapacitated: PROFESIONALS_DATA.filter((p) => p.status === "incapacitated").length,
            },
            specialities: new Set(
                PROFESIONALS_DATA.flatMap((p) => p.profesionalInfo.map((info) => info.speciality))
            ).size,
            operatives: {
                percentaje: totalStaff > 0 ? Math.round((totalInConsultation / totalStaff) * 100) : 0,
            },
        };

    },

    getProfesionales: async (): Promise<Professional[]> => {
        // const response = await apiClient.get('/profesionales');
        return PROFESIONALS_DATA;
    },

    updateProfesional: async (profesional: Professional): Promise<{ success: boolean, message: string }> => {
        // const response = await apiClient.put(`/profesionales/${id}`, profesional);

        await mockDelay;
        return { success: true, message: 'Profesional actualizado correctamente' };

    },


    createProfesional: async (profesional: any) => {
        const response = await apiClient.post('/profesionales', profesional);
        return response.data;
    },


    deleteProfesional: async (id: string) => {
        const response = await apiClient.delete(`/profesionales/${id}`);
        return response.data;
    },
};
