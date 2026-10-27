import { z } from 'zod';


const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>_\-]).{8,}$/;

export const auhtRegisterSchema = z.object({
    name: z.string().min(3, { message: 'El nombre debe tener al menos 3 caracteres' }),
    lastName: z.string().min(3, { message: 'El apellido debe tener al menos 3 caracteres' }),
    email: z.email('Correo inválido'),
    password: z.string().refine(val => passwordRegex.test(val), {
        message: 'La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula y un número',
    }),
    termsAndConditions: z.boolean().refine((val) => val, {
        message: 'Debes aceptar los términos y condiciones',
    }),
});

export type authRegisterData = z.infer<typeof auhtRegisterSchema>;

export const authRegisterDefaultValues: authRegisterData = {
    name: '',
    lastName: '',
    email: '',
    password: '',
    termsAndConditions: false,
};