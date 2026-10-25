import { STATUS_PROFESSIONAL_ARRAY, ROLE_SYSTEM_ARRAY, GENDER_ARRAY, DEPARTMENT_ARRAY } from '@/utils/datadummy';
import z from 'zod';


export const createProfesionalFormSchema = z.object({
    role: z.enum(ROLE_SYSTEM_ARRAY),
    status: z.enum(STATUS_PROFESSIONAL_ARRAY),
    personalInfo: z.object({
        name: z.string(),
        lastName: z.string(),
        dateOfBirth: z.string(),
        gender: z.enum(GENDER_ARRAY)
    }),
    department: z.enum(DEPARTMENT_ARRAY),
    contactInfo: z.object({
        email: z.email({ message: 'Correo inválido' }),
        phone: z.string(),
        address: z.string(),
        city: z.string(),
        state: z.string(),
        zip: z.string(),
        country: z.string()
    }),
    profesionalInfo: z.array(
        z.object({
            speciality: z.string(),
            cedula: z.string(),
            license: z.string()
        })
    ),
    createdAt: z.string(),
    updatedAt: z.string()
});

export type CreateProfesionalData = z.infer<typeof createProfesionalFormSchema>;

export const createProfesionalDefault: CreateProfesionalData = {
    role: "professional",
    status: "inactive",
    personalInfo: {
        name: "",
        lastName: "",
        dateOfBirth: "",
        gender: "other"
    },
    department: 'no_department',
    contactInfo: {
        email: "",
        phone: "",
        address: "",
        city: "",
        state: "",
        zip: "",
        country: ""
    },
    profesionalInfo: [
        {
            speciality: "",
            cedula: "",
            license: ""
        }
    ],
    createdAt: "",
    updatedAt: ""
}