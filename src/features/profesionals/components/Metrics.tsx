'use client'
import Badge from "@/components/ui/badge/Badge";
import { useQuery } from "@tanstack/react-query";
import { ProfesionalActionsService } from "../services/service";
import { Activity, ChartBar, Stethoscope, User2Icon } from 'lucide-react';
import Fallback from "@/components/fallbackQuery/Fallback"; // mas que nada usar cuando se use query
import type { Metrics } from "@/types/dataTypes";
import useSystemTraslations from "@/hooks/useSysteTranslations";

export default function Metrics() {

    const { statusT, profMetricsT } = useSystemTraslations();

    const { data: metrics, isLoading: isLoadingMetrics, error: errorMetrics } = useQuery({
        queryKey: ['metrics-query'],
        queryFn: () => ProfesionalActionsService.getProfesionalsMetrics(),
    });

    return (
        <>

            <Fallback
                id='metrics-fallback'
                data={metrics}
                isError={errorMetrics}
                isLoading={isLoadingMetrics}
                loadingClassName='min-h-30'
                errorClassName='min-h-30'
            >
                <section className="w-full mx-auto grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-3 md:gap-6 lg:grid-cols-4">
                    {/* CARD 1: TOTAL DE PERSONAL */}
                    <div className="relative overflow-hidden rounded-2xl p-5 generic-border-shadow transition-all hover:shadow-theme-md sm:p-6 bg-theme-light-dark">
                        {/* Barra de acento */}
                        <div className="absolute top-0 inset-x-0 h-2 bg-brand" />
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-theme-sm font-medium text-theme-light-gray">
                                    {profMetricsT('total_employees')}
                                </p>
                                <h3 className="mt-1 text-title-md font-bold text-gray-dark dark:text-light-accent">
                                    {metrics?.total}
                                </h3>
                            </div>
                            <div className="flex size-15 items-center justify-center rounded-2xl bg-brand/10 text-brand dark:bg-brand-dark/25 dark:text-brand-light">
                                <User2Icon className="size-8 stroke-2" />
                            </div>
                        </div>

                        <div className="mt-3 flex items-center justify-end">
                            <span className="text-theme-xs text-gray dark:text-gray-light">
                                {profMetricsT('registered_staff')}
                            </span>
                        </div>
                    </div>

                    {/* CARD 2: EN CONSULTA Y OPERATIVIDAD */}
                    <div className="relative overflow-hidden rounded-2xl p-5 generic-border-shadow transition-all hover:shadow-theme-md sm:p-6 bg-theme-light-dark">
                        {/* Barra de acento */}
                        <div className="absolute top-0 inset-x-0 h-2 bg-blue-light" />
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-theme-sm font-medium text-theme-light-gray">
                                    {profMetricsT('in_consultation')}
                                </p>
                                <h3 className="mt-1 text-title-md font-bold text-gray-dark dark:text-light-accent">
                                    {metrics?.status.in_consultation}
                                </h3>
                            </div>
                            <div className="flex size-15 items-center justify-center rounded-2xl bg-blue-light/10 text-blue-light dark:bg-blue-light-dark/25 dark:text-blue-light-light">
                                <Activity className="size-8 stroke-2" />
                            </div>
                        </div>

                        <div className="mt-3 flex items-center justify-between">
                            <span className="inline-flex items-center gap-1.5 text-theme-xs text-success font-medium">
                                <span className="size-2 rounded-full bg-success animate-pulse" />
                                {profMetricsT('active_staff')}
                            </span>
                            <span className="text-theme-xs font-semibold text-gray dark:text-gray-light">
                                {metrics?.operatives.percentaje}% {profMetricsT('operative')}
                            </span>
                        </div>
                    </div>

                    {/* CARD 3: ESPECIALIDADES MÉDICAS */}
                    <div className="relative overflow-hidden rounded-2xl p-5 generic-border-shadow transition-all hover:shadow-theme-md sm:p-6 bg-theme-light-dark">
                        {/* Barra de acento */}
                        <div className="absolute top-0 inset-x-0 h-2 bg-success" />
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-theme-sm font-medium text-theme-light-gray">
                                    {profMetricsT('specialities')}
                                </p>
                                <h3 className="mt-1 text-title-md font-bold text-gray-dark dark:text-light-accent">
                                    {metrics?.specialities}
                                </h3>
                            </div>
                            <div className="flex size-15 items-center justify-center rounded-2xl bg-success/10 text-success dark:bg-success-dark/25 dark:text-success-light">
                                <Stethoscope className="size-8 stroke-2" />
                            </div>
                        </div>

                        {/* <div className="mt-3 flex items-center justify-between">
                            <span className="text-theme-xs text-gray dark:text-gray-light">
                                Ramas clínicas cubiertas
                            </span>
                        </div> */}
                    </div>

                    {/* CARD 4: ESTATUS */}
                    <div className="relative overflow-hidden rounded-2xl p-5 generic-border-shadow transition-all hover:shadow-theme-md sm:p-6 bg-theme-light-dark">
                        {/* Barra de acento */}
                        <div className="absolute top-0 inset-x-0 h-2 bg-warning" />
                        <div className="flex items-center justify-between">
                            <div className="w-full">
                                <p className="text-theme-sm font-medium text-theme-light-gray">
                                    {profMetricsT('status')}
                                </p>
                                <div className="flex flex-wrap gap-1 mt-2">
                                    <Badge color="success" size="sm">
                                        <span>{statusT('active')}: {metrics?.status.active}</span>
                                    </Badge>
                                    <Badge color="error" size="sm">
                                        <span>{statusT('inactive')}: {metrics?.status.inactive}</span>
                                    </Badge>
                                    <Badge color="warning" size="sm">
                                        <span>{statusT('on_break')}: {metrics?.status.on_break}</span>
                                    </Badge>
                                    <Badge color="primary" size="sm">
                                        <span>{statusT('in_consultation')}: {metrics?.status.in_consultation}</span>
                                    </Badge>
                                    {/* <Badge color="info" size="sm">
                                        <span>Vacaciones: {metrics?.status.on_vacation}</span>
                                    </Badge>
                                    <Badge color="error" size="sm">
                                        <span>Incapacitados: {metrics?.status.incapacitated}</span>
                                    </Badge>
                                    <Badge color="error" size="sm">
                                        <span>En descanso: {metrics?.status.on_leave}</span>
                                    </Badge> */}
                                </div>
                            </div>
                            <div className="flex size-15 shrink-0 items-center justify-center rounded-2xl bg-warning/10 text-warning dark:bg-warning-dark/25 dark:text-warning-light">
                                <ChartBar className="size-8 stroke-2" />
                            </div>
                        </div>
                    </div>


                </section>
            </Fallback>
        </>
    )
}