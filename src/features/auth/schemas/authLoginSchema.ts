import z from 'zod';

export const authLoginSchema = z.object({
    email: z.email({ message: 'Correo electrónico inválido' }),
    password: z.string().min(8, 'Contraseña es requerida'),
    rememberMe: z.boolean().optional()
});

export type authLoginData = z.infer<typeof authLoginSchema>;

export const authLoginDefaultValues: authLoginData = {
    email: "",
    password: "",
    rememberMe: false
};