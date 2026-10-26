"use client";

import Checkbox from "@/components/form/input/Checkbox";
import Input from "@/components/form/input/InputField";
import Label from "@/components/form/Label";
import Button from "@/components/ui/button/Button";
import { Link } from "@/i18n/navigation";
import { EyeCloseIcon, EyeIcon } from "@/icons";
import { useState } from "react";
import TopAuth from "./components/TopAuth";
import { authLoginSchema, authLoginData, authLoginDefaultValues } from './schemas/authLoginSchema';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod'

export default function SignInView() {

    //HOOKS
    const [showPassword, setShowPassword] = useState(false);



    // HOOK-FORM
    const { register, formState: { errors }, handleSubmit } = useForm<authLoginData>({
        resolver: zodResolver(authLoginSchema),
        defaultValues: authLoginDefaultValues
    })

    // QUERY



    const handleLoginSubmit = (data: authLoginData) => {
        console.log(data)
    }

    return (
        <div className="mx-auto flex w-full max-w-md flex-col justify-center">

            <TopAuth
                breadcrumbText='Portal Profesional'
                pageTitle='Iniciar Sesión'
                subtitle='Ingresa tus credenciales para acceder a la plataforma clínica.'
            />

            {/* Formulario */}
            <form onSubmit={handleSubmit(handleLoginSubmit)} className="space-y-5">
                <div>
                    <Label htmlFor="email">
                        Correo Electrónico <span className="text-error">*</span>
                    </Label>
                    <Input
                        id="email"
                        type="email"
                        placeholder="doctor@clinicapms.com"
                        size="md"
                        {...register('email')}
                        error={!!errors.email}
                    />
                </div>

                <div>
                    <Label htmlFor="password">
                        Contraseña <span className="text-error">*</span>
                    </Label>
                    <div className="relative">
                        <Input
                            id="password"
                            type={showPassword ? "text" : "password"}
                            placeholder="••••••••"
                            size="md"
                            {...register('password')}
                            error={!!errors.password}
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray transition-colors hover:text-gray-dark dark:text-gray-light dark:hover:text-light"
                            tabIndex={-1}
                            aria-label={showPassword ? "Ocultar contraseña" : "Ver contraseña"}
                        >
                            {showPassword ? (
                                <EyeIcon className="h-5 w-5 fill-current" />
                            ) : (
                                <EyeCloseIcon className="h-5 w-5 fill-current" />
                            )}
                        </button>
                    </div>
                </div>

                <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                        <Checkbox
                            id="remember"
                            {...register('rememberMe')}
                            error={!!errors.rememberMe}
                        />
                        <label
                            htmlFor="remember"
                            className="cursor-pointer text-sm text-theme-light-gray select-none hover:text-gray-dark dark:hover:text-light"
                        >
                            Recordar sesión
                        </label>
                    </div>
                    <Link
                        href="/reset-password"
                        className="text-sm font-medium text-brand transition-colors hover:text-brand-dark dark:text-brand-light dark:hover:text-brand"
                    >
                        ¿Olvidaste tu contraseña?
                    </Link>
                </div>

                <div>
                    <Button type="submit" size="md" className="w-full justify-center">
                        Iniciar Sesión
                    </Button>
                </div>
            </form>

            {/* Redirección a Registro */}
            <div className="mt-8 text-center sm:text-start">
                <p className="text-sm text-theme-light-gray">
                    ¿No tienes una cuenta médica?{" "}
                    <Link
                        href="/signup"
                        className="font-semibold text-brand transition-colors hover:text-brand-dark dark:text-brand-light dark:hover:text-brand"
                    >
                        Registrarse
                    </Link>
                </p>
            </div>
        </div>
    );
}
