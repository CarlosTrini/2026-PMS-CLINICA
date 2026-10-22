import { PROFESIONALS_DATA } from "@/utils/datadummy";
import { Activity, ChartBar, Stethoscope, User2Icon } from 'lucide-react';

import Badge from "@/components/ui/badge/Badge";


export default function Metrics() {



    // TODO: ESTA DATA VENDRÁ DE BASE DE DATOS, USAR CUANDO SE HAGA LA MIGRACIÓN
    // Métricas calculadas dinámicamente
    const totalStaff = PROFESIONALS_DATA.length;
    const activeCount = PROFESIONALS_DATA.filter(p => p.status === 'active').length;
    const inactiveCount = PROFESIONALS_DATA.filter(p => p.status === 'inactive').length;
    const onBreakCount = PROFESIONALS_DATA.filter(p => p.status === 'on_break').length;
    const inConsultationCount = PROFESIONALS_DATA.filter(p => p.status === 'in_consultation').length;
    const onVacationCount = PROFESIONALS_DATA.filter(p => p.status === 'on_vacation').length;

    // Total de especialidades únicas cubiertas en el equipo
    const totalSpecialties = new Set(
        PROFESIONALS_DATA.flatMap(p => p.profesionalInfo.map(info => info.specialty))
    ).size;

    // Porcentaje de personal operativo (activos + en consulta)
    const operationalPercent = totalStaff > 0
        ? Math.round(((inConsultationCount) / totalStaff) * 100)
        : 0;



    return (
        <>
            <section className="w-full mx-auto grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-3 md:gap-6 lg:grid-cols-4">
                {/* CARD 1: TOTAL DE PERSONAL */}
                <div className="relative overflow-hidden rounded-2xl p-5 generic-border-shadow transition-all hover:shadow-theme-md sm:p-6 bg-theme-light-dark">
                    {/* Barra de acento */}
                    <div className="absolute top-0 inset-x-0 h-2 bg-brand" />
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-theme-sm font-medium text-theme-light-gray">
                                Total de Personal
                            </p>
                            <h3 className="mt-1 text-title-md font-bold text-gray-dark dark:text-light-accent">
                                {totalStaff}
                            </h3>
                        </div>
                        <div className="flex size-15 items-center justify-center rounded-2xl bg-brand/10 text-brand dark:bg-brand-dark/25 dark:text-brand-light">
                            <User2Icon className="size-8 stroke-2" />
                        </div>
                    </div>

                    <div className="mt-3 flex items-center justify-end">
                        <span className="text-theme-xs text-gray dark:text-gray-light">
                            Registrados
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
                                En Consulta
                            </p>
                            <h3 className="mt-1 text-title-md font-bold text-gray-dark dark:text-light-accent">
                                {inConsultationCount}
                            </h3>
                        </div>
                        <div className="flex size-15 items-center justify-center rounded-2xl bg-blue-light/10 text-blue-light dark:bg-blue-light-dark/25 dark:text-blue-light-light">
                            <Activity className="size-8 stroke-2" />
                        </div>
                    </div>

                    <div className="mt-3 flex items-center justify-between">
                        <span className="inline-flex items-center gap-1.5 text-theme-xs text-success font-medium">
                            <span className="size-2 rounded-full bg-success animate-pulse" />
                            Turno activo
                        </span>
                        <span className="text-theme-xs font-semibold text-gray dark:text-gray-light">
                            {operationalPercent}% operativo
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
                                Especialidades
                            </p>
                            <h3 className="mt-1 text-title-md font-bold text-gray-dark dark:text-light-accent">
                                {totalSpecialties}
                            </h3>
                        </div>
                        <div className="flex size-15 items-center justify-center rounded-2xl bg-success/10 text-success dark:bg-success-dark/25 dark:text-success-light">
                            <Stethoscope className="size-8 stroke-2" />
                        </div>
                    </div>

                    <div className="mt-3 flex items-center justify-between">
                        <span className="text-theme-xs text-gray dark:text-gray-light">
                            Ramas clínicas cubiertas
                        </span>
                    </div>
                </div>

                {/* CARD 4: ESTATUS */}
                <div className="relative overflow-hidden rounded-2xl p-5 generic-border-shadow transition-all hover:shadow-theme-md sm:p-6 bg-theme-light-dark">
                    {/* Barra de acento */}
                    <div className="absolute top-0 inset-x-0 h-2 bg-warning" />
                    <div className="flex items-center justify-between">
                        <div className="w-full">
                            <p className="text-theme-sm font-medium text-theme-light-gray">
                                Estatus
                            </p>
                            <div className="flex flex-wrap gap-1 mt-2">
                                <Badge color="success" size="sm">
                                    <span>Activos: {activeCount}</span>
                                </Badge>
                                <Badge color="error" size="sm">
                                    <span>Inactivos: {inactiveCount}</span>
                                </Badge>
                                <Badge color="warning" size="sm">
                                    <span>En descanso: {onBreakCount}</span>
                                </Badge>
                                <Badge color="primary" size="sm">
                                    <span>En consulta: {inConsultationCount}</span>
                                </Badge>
                                <Badge color="info" size="sm">
                                    <span>Vacaciones: {onVacationCount}</span>
                                </Badge>
                            </div>
                        </div>
                        <div className="flex size-15 shrink-0 items-center justify-center rounded-2xl bg-warning/10 text-warning dark:bg-warning-dark/25 dark:text-warning-light">
                            <ChartBar className="size-8 stroke-2" />
                        </div>
                    </div>
                </div>


            </section>
        </>
    )
}