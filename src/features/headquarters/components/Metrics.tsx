'use client'
import { BriefcaseMedical, Building2, MapPin, Stethoscope } from 'lucide-react';
import { useEffect, useState } from 'react';
import Badge from '@/components/ui/badge/Badge';

import { HeadquartersService } from '../services/headquartersService';
import { useQuery } from '@tanstack/react-query';
import type { Headquarters } from "@/types/dataTypes";

interface Props {
    data?: Headquarters[];
}

export default function Metrics({ data = [] }: Props) {

    // QUERY
    const { data: headquartersData, isError, error, isLoading } = useQuery<Headquarters[]>({
        queryKey: ['headquarters-view'],
        queryFn: () => HeadquartersService.getAllHeadquarters()
    });

    const [metricsData, setMetricsData] = useState({
        services: {
            total: 0,
        },
        departments: {
            total: 0,
            actives: 0
        },
        specialities: {
            total: 0,
        },
        headquarters: {
            total: 0
        }
    });


    const getMetrics = (data: Headquarters[]) => {

        // 1. Cantidad de servicios únicos y asignaciones totales
        const totalServicesAssigned = data.reduce((acc, hq) => acc + (hq.services?.length || 0), 0);
        // const uniqueServices = new Set(data.flatMap((hq) => hq.services || [])).size;

        // 2. Cantidad de departamentos y cuántos están activos
        const allDepartments = data.flatMap((hq) => hq.departments || []);
        const totalDepartments = allDepartments.length;
        const activeDepartments = allDepartments.filter((dept) => dept.isActive).length;

        // 3. Cantidad de especialidades (directas + departamentos)
        const directSpecialities = data.flatMap((hq) => hq.specialities || []);
        const deptSpecialities = allDepartments.flatMap((dept) => dept.specialities || []);
        const uniqueSpecialities = new Set([...directSpecialities, ...deptSpecialities]).size;

        // 4. Total de sedes y ciudades con cobertura
        const totalHeadquarters = data.length;
        // const uniqueCities = new Set(data.map((hq) => hq.city).filter(Boolean)).size;

        setMetricsData((prev) => ({
            ...prev,
            services: {
                total: totalServicesAssigned,
            },
            departments: {
                total: totalDepartments,
                actives: activeDepartments
            },
            specialities: {
                total: uniqueSpecialities,
            },
            headquarters: {
                total: totalHeadquarters
            }
        }))

    }



    useEffect(() => {
        if (!headquartersData) return;
        getMetrics(headquartersData);
    }, [headquartersData]);


    return (
        <section className="w-full mx-auto grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6 xl:grid-cols-4">
            {/* CARD 1: CANTIDAD DE SERVICIOS */}
            <div className="relative overflow-hidden rounded-2xl p-5 generic-border-shadow transition-all hover:shadow-theme-md sm:p-6 bg-theme-light-dark">
                <div className="absolute top-0 inset-x-0 h-2 bg-brand" />
                <div className="flex items-center justify-between gap-4">
                    <div>
                        <p className="text-theme-sm font-medium text-theme-light-gray">
                            Servicios Clínicos
                        </p>
                        <h3 className="mt-1 text-title-md font-bold text-gray-dark dark:text-light-accent">
                            {metricsData.services.total}
                        </h3>
                    </div>
                    <div className="flex size-15 shrink-0 items-center justify-center rounded-2xl bg-brand/10 text-brand dark:bg-brand-dark/25 dark:text-brand-light">
                        <BriefcaseMedical className="size-8 stroke-2" />
                    </div>
                </div>

                <div className="mt-3 flex items-center justify-between">
                    <span className="text-theme-xs text-theme-light-gray">
                        Catálogo disponible
                    </span>
                    <Badge color="primary" size="sm">
                        <span>{metricsData.services.total} asignados</span>
                    </Badge>
                </div>
            </div>

            {/* CARD 2: CANTIDAD DE DEPARTAMENTOS */}
            <div className="relative overflow-hidden rounded-2xl p-5 generic-border-shadow transition-all hover:shadow-theme-md sm:p-6 bg-theme-light-dark">
                <div className="absolute top-0 inset-x-0 h-2 bg-blue-light" />
                <div className="flex items-center justify-between gap-4">
                    <div>
                        <p className="text-theme-sm font-medium text-theme-light-gray">
                            Departamentos
                        </p>
                        <h3 className="mt-1 text-title-md font-bold text-gray-dark dark:text-light-accent">
                            {metricsData.departments.total}
                        </h3>
                    </div>
                    <div className="flex size-15 shrink-0 items-center justify-center rounded-2xl bg-blue-light/10 text-blue-light dark:bg-blue-light-dark/25 dark:text-blue-light-light">
                        <Building2 className="size-8 stroke-2" />
                    </div>
                </div>

                <div className="mt-3 flex items-center justify-between">
                    <span className="inline-flex items-center gap-1.5 text-theme-xs font-medium text-success dark:text-success-light">
                        <span className="size-2 rounded-full bg-success animate-pulse" />
                        {metricsData.departments.actives} activos
                    </span>

                </div>
            </div>

            {/* CARD 3: CANTIDAD DE ESPECIALIDADES */}
            <div className="relative overflow-hidden rounded-2xl p-5 generic-border-shadow transition-all hover:shadow-theme-md sm:p-6 bg-theme-light-dark">
                <div className="absolute top-0 inset-x-0 h-2 bg-success" />
                <div className="flex items-center justify-between gap-4">
                    <div>
                        <p className="text-theme-sm font-medium text-theme-light-gray">
                            Especialidades Médicas
                        </p>
                        <h3 className="mt-1 text-title-md font-bold text-gray-dark dark:text-light-accent">
                            {metricsData.specialities.total}
                        </h3>
                    </div>
                    <div className="flex size-15 shrink-0 items-center justify-center rounded-2xl bg-success/10 text-success dark:bg-success-dark/25 dark:text-success-light">
                        <Stethoscope className="size-8 stroke-2" />
                    </div>
                </div>

                <div className="mt-3 flex items-center justify-between">
                    <span className="text-theme-xs text-theme-light-gray">
                        Directas y por depto.
                    </span>
                    <Badge color="success" size="sm">
                        <span>{metricsData.specialities.total} directas</span>
                    </Badge>
                </div>
            </div>

            {/* CARD 4: COBERTURA DE SEDES */}
            <div className="relative overflow-hidden rounded-2xl p-5 generic-border-shadow transition-all hover:shadow-theme-md sm:p-6 bg-theme-light-dark">
                <div className="absolute top-0 inset-x-0 h-2 bg-orange" />
                <div className="flex items-center justify-between gap-4">
                    <div>
                        <p className="text-theme-sm font-medium text-theme-light-gray">
                            Sedes Registradas
                        </p>
                        <h3 className="mt-1 text-title-md font-bold text-gray-dark dark:text-light-accent">
                            {metricsData.headquarters.total}
                        </h3>
                    </div>
                    <div className="flex size-15 shrink-0 items-center justify-center rounded-2xl bg-orange/10 text-orange dark:bg-orange-dark/25 dark:text-orange-light">
                        <MapPin className="size-8 stroke-2" />
                    </div>
                </div>

                <div className="mt-3 flex items-center justify-between">
                    <span className="text-theme-xs text-theme-light-gray">
                        Cobertura geográfica
                    </span>
                    <Badge color="warning" size="sm">
                        <span>{metricsData.headquarters.total} sedes</span>
                    </Badge>
                </div>
            </div>
        </section>
    );
}
