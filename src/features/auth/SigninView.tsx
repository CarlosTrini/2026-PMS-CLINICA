"use client";

//HOOKS
import { useEffect, useState } from "react";
import { useRouter } from '@/i18n/navigation';
//COMPONENTS
import Checkbox from "@/components/form/input/Checkbox";
import Input from "@/components/form/input/InputField";
import Label from "@/components/form/Label";
import Button from "@/components/ui/button/Button";
import TopAuth from "./components/TopAuth";
// SCHEMA
import { authLoginSchema, authLoginData, authLoginDefaultValues } from './schemas/authLoginSchema';
// NAVIGATION
import { Link } from "@/i18n/navigation";
// ICONS
import { EyeCloseIcon, EyeIcon } from "@/icons";
import { Loader } from "lucide-react";
// LIBRARIES
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient, useMutation } from "@tanstack/react-query";
// TYPES
import { AuthLogin } from "@/types/dataTypes";
// STORES
import { useUserStore } from "@/store/userStore";
import { useHeadquarterStore } from "@/store/useHeadquarterStore";
import { HEADQUARTERS_DATA } from "@/utils/constants";
//SERVICES
import { AuthActionsService } from "./services/authService";

export default function SignInView() {

    //HOOKS
    const [showPassword, setShowPassword] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');
    const Navigate = useRouter();

    const { setToken, setUserInfo, setIsAuthenticated, isAuthenticated } = useUserStore();
    const setHeadquarters = useHeadquarterStore((state) => state.setHeadquarters);


    // HOOK-FORM
    const { register, reset, formState: { errors }, handleSubmit } = useForm<authLoginData>({
        resolver: zodResolver(authLoginSchema),
        defaultValues: authLoginDefaultValues
    });

    // QUERY
    // const queryClient = useQueryClient();
    const { mutate: handleLogin, isPending, error } = useMutation({
        mutationKey: ['login'],
        mutationFn: (data: AuthLogin) => AuthActionsService.loginUserSystem(data),
        onSuccess: (res) => {
            const dataUser = res?.data;

            if (res.status !== 200) return;

            if (dataUser) {
                // Guardar cookie por 1 día
                document.cookie = `auth_token=${dataUser.token}; path=/; max-age=86400; SameSite=Lax`;

                setToken(dataUser.token);
                setUserInfo(dataUser.user);
                setIsAuthenticated(true);
                reset();
                setErrorMsg('');
                setHeadquarters(HEADQUARTERS_DATA[0]);


                Navigate.push('/admin');
            }
        },
        onError: (err: any) => {
            setErrorMsg(err?.response?.data?.message || 'Ha ocurrido un error');
        }
    });



    const handleLoginSubmit = (data: authLoginData) => {
        handleLogin(data);
    };


    // useEffect(() => {
    //     if (isAuthenticated) {
    //         Navigate.replace('/admin'); // Usamos 'replace' para que no vuelva al login con el botón 'Atrás'
    //     }
    // }, [isAuthenticated, Navigate]);


    // if (isAuthenticated) {
    //     return null;
    // }

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

                <div className="">
                    <Button type="submit" size="md" className="w-full justify-center mb-3">
                        {
                            isPending
                                ? (
                                    <span className="flex gap-2 items-center">
                                        <Loader size="sm" className="w-7 h-7 text-white animate-[spin_2s_linear_infinite]" /> Iniciando sesión
                                    </span>
                                )
                                : (
                                    <span>Iniciar sesión</span>
                                )
                        }
                    </Button>

                    {
                        errorMsg !== '' &&
                        (
                            <p className="bg-error-dark/50 text-light text-sm rounded-lg py-2 w-90 mx-auto text-center">{errorMsg}</p>
                        )
                    }
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
