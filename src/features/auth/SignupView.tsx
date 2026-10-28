"use client";

// HOOKS
import { useState, useEffect } from "react";
// NAVIGATION
import { useRouter } from "@/i18n/navigation";
// COMPONENTS
import TopAuth from "./components/TopAuth";
import Checkbox from "@/components/form/input/Checkbox";
import Input from "@/components/form/input/InputField";
import Label from "@/components/form/Label";
import Button from "@/components/ui/button/Button";
//ICONS
import { EyeCloseIcon, EyeIcon } from "@/icons";
import { Loader } from "lucide-react";
// TYPES
import { UserSystem } from "@/types/dataTypes";
// FORM
import { useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import { authRegisterData, authRegisterDefaultValues, auhtRegisterSchema } from "./schemas/authRegisterSchema";
// QUERY
import { useMutation, useQueryClient } from '@tanstack/react-query';
//SERVICE
import { AuthActionsService } from "./services/authService";
// LIBS Y OTROS
import { Link } from "@/i18n/navigation";
import { v4 as uuidv4 } from 'uuid';
import { getISODate } from "@/utils/dates";
import Alert from "@/components/ui/alert/Alert";
// STORE
import { useUserStore } from "@/store/userStore";
import Fallback from "@/components/fallbackQuery/Fallback";

export default function SignupView() {

    // HOOKS
    const { isAuthenticated } = useUserStore();
    const [showPassword, setShowPassword] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');
    const [showAlertSuccess, setShowAlertSuccess] = useState(false);
    const Navigate = useRouter();




    // HOOK-FORM
    const { register, handleSubmit, formState: { errors }, reset } = useForm<authRegisterData>({
        resolver: zodResolver(auhtRegisterSchema),
        defaultValues: authRegisterDefaultValues
    })

    // QUERY
    // const queryClient = useQueryClient();
    const { mutate: handleRegister, isPending, error } = useMutation({
        mutationKey: ['register-new-user'],
        retry: 0,
        mutationFn: (dataUser: UserSystem) => AuthActionsService.registerUserSystem(dataUser),
        onSuccess: (response) => {
            setErrorMsg('');
            setShowAlertSuccess(true);
            reset();
        },
        onError: (err: any) => {
            setErrorMsg(err?.response?.data?.message || 'Ha ocurrido un error')
        }

    });



    const handleRegisterSubmit = (data: authRegisterData) => {
        // HACK: LA DATA 'data' ES DE TIPO authRegisterData, PERO DEBE CONVERTIRSE A 
        //TIPO UserSystem para enviarla al servicio con ID, rol, fechas, etc...
        setErrorMsg('');

        const registerDate = getISODate();

        const userSystemData: UserSystem = {
            id: uuidv4(),
            name: data.name,
            lastName: data.lastName,
            email: data.email,
            password: data.password,
            role: 'no_role',
            termsAndConditions: data.termsAndConditions,
            picture: "",
            createdAt: registerDate,
            updatedAt: registerDate
        }

        handleRegister(userSystemData); // SE EJECUTA EL MUTATE

    }


    // useEffect(() => {
    //     if (isAuthenticated) {
    //         Navigate.replace('/admin'); // Usamos 'replace' para que no vuelva al login con el botón 'Atrás'
    //     }
    // }, [isAuthenticated, Navigate]);



    // if (isAuthenticated) {
    //     return <Fallback id="loader-login-fallback" children={'Redirigiendo al panel de control...'} data={null} isLoading={true} isError={false} />;
    // }


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
                    <Button disabled={isPending} type="submit" size="md" className="mb-2 w-full justify-center">
                        {
                            isPending
                                ? (
                                    <span className="flex gap-2 items-center">
                                        <Loader size="sm" className="w-7 h-7 text-white animate-[spin_2s_linear_infinite]" /> Creando cuenta
                                    </span>
                                )
                                : (
                                    <span>Crear Cuenta</span>
                                )
                        }
                    </Button>
                    {
                        errorMsg !== '' &&
                        (
                            <p className="bg-error-dark/50 text-light text-sm rounded-lg py-2 w-90 mx-auto text-center">{errorMsg}</p>
                        )
                    }
                    {
                        showAlertSuccess && (
                            <Alert timer={false} variant="success" title="Usuario creado" message="" showLink={true} linkHref="/signin" linkText="Iniciar Sesión" />
                        )
                    }
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
