import { STATUS_PROFESSIONAL_ARRAY, ROLE_SYSTEM_ARRAY, GENDER_ARRAY, SPECIALITY_ARRAY, HEADQUARTERS_DATA } from '@/utils/constants';
import z from 'zod';


// Validadores auxiliares
const phoneRegex = /^\+?[0-9\s\-()]{7,20}$/;
const dateStringSchema = z
    .string({ message: 'Fecha no válida' })
    .min(1, { message: 'Fecha requerida' })
    .refine((val) => !isNaN(Date.parse(val)), { message: 'Formato de fecha no válido' });
const birthDateSchema = dateStringSchema
    .refine((val) => new Date(val) < new Date(), {
        message: 'La fecha de nacimiento debe estar en el pasado'
    })
    .refine((val) => {
        const birthDate = new Date(val);
        const today = new Date();
        const minAgeDate = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());
        return birthDate <= minAgeDate;
    }, {
        message: 'El profesional debe ser mayor de 18 años'
    });




export const createProfesionalFormSchema = z.object({
    role: z.enum(ROLE_SYSTEM_ARRAY, { message: 'Rol no válido' }),
    status: z.enum(STATUS_PROFESSIONAL_ARRAY, { message: 'Estado no válido' }),
    personalInfo: z.object({
        name: z.string().min(3, { message: 'Nombre debe tener al menos 3 caracteres' }),
        lastName: z.string().min(3, { message: 'Apellido debe tener al menos 3 caracteres' }),
        dateOfBirth: birthDateSchema,
        gender: z.enum(GENDER_ARRAY, { message: 'Género no válido' })
    }),
    contactInfo: z.object({
        email: z.string().email({ message: 'Correo inválido' }),
        phone: z.string({ message: 'Teléfono no válido' })
            .regex(phoneRegex, { message: 'Formato de teléfono no válido' }),
        address: z.string().min(5, { message: 'Dirección no válida' }),
        city: z.string().min(3, { message: 'Ciudad no válida' }),
        state: z.string().min(3, { message: 'Estado no válido' }),
        zip: z.string().min(4, { message: 'Código postal no válido' }).max(10, { message: 'Código postal no válido' }),
        country: z.string().min(3, { message: 'País no válido' })
    }),
    profesionalInfo: z.array(
        z.object({
            speciality: z.string({ message: 'Especialidad no válida' }),
            cedula: z.string({ message: 'Cédula no válida' }),
            license: z.string({ message: 'Licencia no válida' })
        })
    ),
    locationAssignments: z.array(z.object({
        id: z.string(),
        headquartersId: z.string().min(1, { message: 'Sede requerida' }),
        speciality: z.enum(SPECIALITY_ARRAY, { message: 'Especialidad no válida' }),
        departmentId: z.string().optional(),
    })),
    createdAt: z.string(),
    updatedAt: z.string()
}).superRefine(({ profesionalInfo, locationAssignments }, context) => {
    locationAssignments.forEach((assignment, index) => {
        const headquarters = HEADQUARTERS_DATA.find((item) => item.id === assignment.headquartersId);
        if (!headquarters) {
            context.addIssue({ code: 'custom', path: ['locationAssignments', index, 'headquartersId'], message: 'La sede no existe' });
            return;
        }
        if (!headquarters.specialities.some((item) => item.value === assignment.speciality)) {
            context.addIssue({ code: 'custom', path: ['locationAssignments', index, 'speciality'], message: 'La sede no ofrece esta especialidad' });
        }
        if (!profesionalInfo.some((item) => item.speciality === assignment.speciality)) {
            context.addIssue({ code: 'custom', path: ['locationAssignments', index, 'speciality'], message: 'El profesional no tiene esta especialidad personal' });
        }
        if (assignment.departmentId && !headquarters.departments.some((item) => item.id === assignment.departmentId && item.specialities.includes(assignment.speciality))) {
            context.addIssue({ code: 'custom', path: ['locationAssignments', index, 'departmentId'], message: 'El departamento no pertenece a esta sede' });
        }
    });
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
    locationAssignments: [],
    createdAt: "",
    updatedAt: ""
}
