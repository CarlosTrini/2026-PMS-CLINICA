"use client";

import Checkbox from "@/components/form/input/Checkbox";
import Input from "@/components/form/input/InputField";
import Label from "@/components/form/Label";
import Button from "@/components/ui/button/Button";
import { Link } from "@/i18n/navigation";
import { EyeCloseIcon, EyeIcon } from "@/icons";
import { useState } from "react";
import TopAuth from "./components/TopAuth";
import { useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import { AuthRegisterData, AuthRegisterDefaultValues, auhtRegisterSchema } from "./schemas/authRegisterSchema";


export default function SignupView() {

    // HOOKS
    const [showPassword, setShowPassword] = useState(false);

    // HOOK-FORM
    const { register, handleSubmit, formState: { errors } } = useForm<AuthRegisterData>({
        resolver: zodResolver(auhtRegisterSchema),
        defaultValues: AuthRegisterDefaultValues
    })

    // QUERY



    const handleRegisterSubmit = (data: AuthRegisterData) => {
        console.log(data)
    }

    return (
        <div className="mx-auto flex w-full max-w-md flex-col justify-center">
            <TopAuth
                breadcrumbText='Nuevo Registro'
                pageTitle='Crear Cuenta'
                subtitle='Ingresa tus datos para registrarte en el portal clínico.'
                showSocialLogin={false}
            />

            {/* Formulario */}
            <form onSubmit={handleSubmit(handleRegisterSubmit)} className="space-y-4">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    {/* Nombre */}
                    <div>
                        <Label htmlFor="name">
                            Nombre <span className="text-error">*</span>
                        </Label>
                        <Input
                            type="text"
                            id="name"
                            placeholder="Ej. Carlos"
                            size="md"
                            {...register('name')}
                            error={!!errors.name}
                        />
                    </div>

                    {/* Apellidos */}
                    <div>
                        <Label htmlFor="lname">
                            Apellidos <span className="text-error">*</span>
                        </Label>
                        <Input
                            type="text"
                            id="lname"
                            placeholder="Ej. Martínez"
                            size="md"
                            {...register('lastName')}
                            error={!!errors.lastName}
                        />
                    </div>
                </div>

                {/* Correo Electrónico */}
                <div>
                    <Label htmlFor="email">
                        Correo Electrónico <span className="text-error">*</span>
                    </Label>
                    <Input
                        type="email"
                        id="email"
                        placeholder="doctor@clinicapms.com"
                        size="md"
                        {...register('email')}
                        error={!!errors.email}
                    />
                </div>

                {/* Contraseña */}
                <div>
                    <Label htmlFor="password">
                        Contraseña <span className="text-error">*</span>
                    </Label>
                    <div className="relative">
                        <Input
                            id="password"
                            type={showPassword ? "text" : "password"}
                            placeholder="Crea tu contraseña"
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

                {/* Términos y Condiciones */}
                <div className="flex items-start gap-3 pt-1">
                    <Checkbox
                        id="terms"
                        {...register('termsAndConditions')}
                        error={!!errors.termsAndConditions}
                    />
                    <label
                        htmlFor="terms"
                        className="cursor-pointer text-xs sm:text-sm text-theme-light-gray leading-relaxed select-none hover:text-gray-dark dark:hover:text-light pt-0.5"
                    >
                        Acepto los{" "}
                        <span className="font-medium text-gray-dark dark:text-light hover:underline">
                            Términos y Condiciones
                        </span>{" "}
                        y la{" "}
                        <span className="font-medium text-gray-dark dark:text-light hover:underline">
                            Política de Privacidad
                        </span>.
                    </label>
                </div>

                {/* Botón de Envío */}
                <div className="pt-2">
                    <Button type="submit" size="md" className="w-full justify-center">
                        Crear Cuenta
                    </Button>
                </div>
            </form>

            {/* Redirección a Iniciar Sesión */}
            <div className="mt-8 text-center sm:text-start">
                <p className="text-sm text-theme-light-gray">
                    ¿Ya tienes una cuenta médica?{" "}
                    <Link
                        href="/signin"
                        className="font-semibold text-brand transition-colors hover:text-brand-dark dark:text-brand-light dark:hover:text-brand"
                    >
                        Iniciar Sesión
                    </Link>
                </p>
            </div>

        </div>
    );
}
