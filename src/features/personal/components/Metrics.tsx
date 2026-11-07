'use client';
import { Activity, ChartBar, Stethoscope, User2Icon } from 'lucide-react';
import type { Personal } from "@/types/dataTypes";
import useSystemTraslations from "@/hooks/useSysteTranslations";
import { useHeadquarterStore } from "@/store/useHeadquarterStore";
import { memo, useMemo } from "react";

interface Props {
    dataPersonal: Personal[];
}

function Metrics({ dataPersonal }: Props) {

    // TRADUCCIONES
    const { statusT, personalMetricsT } = useSystemTraslations();

    // STORE
    const { currentHeadquarter } = useHeadquarterStore();

    // USE MEMO
    const metrics = useMemo(() => {
        const totalStaff = dataPersonal?.length || 0;
        const active = dataPersonal?.filter((p) => p.status === "active").length || 0;
        // const inactive = dataPersonal?.filter((p) => p.status === "inactive").length || 0;
        // const on_leave = dataPersonal?.filter((p) => p.status === "on_leave").length || 0;
        // const on_vacation = dataPersonal?.filter((p) => p.status === "on_vacation").length || 0;
        const in_consultation = dataPersonal?.filter((p) => p.status === "in_consultation").length || 0;
        // const on_break = dataPersonal?.filter((p) => p.status === "on_break").length || 0;
        // const incapacitated = dataPersonal?.filter((p) => p.status === "incapacitated").length || 0;

        const pct = (val: number) => (totalStaff > 0 ? Math.round((val / totalStaff) * 100) : 0);

        const uniqueSpecialities = new Set(
            (dataPersonal ?? []).flatMap((p) => (p.profesionalInfo ?? []).map((info) => info.speciality))
        ).size;

        return {
            total: totalStaff,
            specialitiesCount: currentHeadquarter?.specialities?.length ?? uniqueSpecialities,
            status: {
                active,
                // inactive,
                // on_leave,
                // on_vacation,
                in_consultation,
                // on_break,
                // incapacitated,
            },
            percentages: {
                // active: pct(active),
                // inactive: pct(inactive),
                // on_break: pct(on_break),
                in_consultation: pct(in_consultation),
            },
            operatives: {
                percentaje: pct(in_consultation),
            },
        };
    }, [dataPersonal, currentHeadquarter?.specialities?.length]);

    return (
        <section className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
            {/* CARD 1: TOTAL DE PERSONAL */}
            <article className="relative flex items-center justify-between gap-4 p-4 sm:p-5 rounded-2xl generic-border-shadow bg-theme-light-dark overflow-hidden transition-all hover:shadow-theme-md">
                <div className="flex items-center gap-4 min-w-0">
                    <div className="relative flex size-13 shrink-0 items-center justify-center rounded-xl bg-brand/10 dark:bg-brand-dark/30 text-brand dark:text-brand-light border border-brand/20">
                        <User2Icon className="size-6 stroke-2" />
                        <span className="absolute -top-1 -right-1 size-3 rounded-full bg-brand border-2 border-light-accent dark:border-gray-dark" />
                    </div>

                    <div className="flex flex-col min-w-0">
                        <span className="text-theme-xs font-semibold uppercase tracking-wider text-brand dark:text-brand-light truncate">
                            {personalMetricsT('registered_staff')}
                        </span>
                        <h3 className="text-theme-sm font-medium text-theme-light-gray truncate">
                            {personalMetricsT('total_employees')}
                        </h3>
                        <p className="text-theme-xs text-gray/60 dark:text-gray-light/50 truncate mt-0.5">
                            {currentHeadquarter?.name || "Sede actual"}
                        </p>
                    </div>
                </div>

                <div className="flex flex-col items-end shrink-0 pl-4 border-l border-gray/15 dark:border-gray/30">
                    <span className="text-title-sm font-bold text-gray-dark dark:text-light-accent">
                        {metrics.total}
                    </span>
                    <span className="text-theme-xs font-medium text-gray/70 dark:text-gray-light/60">
                        {statusT('active')}: {metrics.status.active}
                    </span>
                </div>
            </article>

            {/* CARD 2: EN CONSULTA Y OPERATIVIDAD (%) */}
            <article className="flex flex-col justify-between gap-3 p-4 sm:p-5 rounded-2xl generic-border-shadow bg-theme-light-dark transition-all hover:shadow-theme-md">
                <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3 min-w-0">
                        <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-blue-light/10 dark:bg-blue-light-dark/25 text-blue-light dark:text-blue-light-light border border-blue-light/20">
                            <Activity className="size-5 stroke-2" />
                        </div>
                        <div className="min-w-0">
                            <h3 className="text-theme-sm font-semibold text-gray-dark dark:text-light-accent truncate">
                                {personalMetricsT('in_consultation')}
                            </h3>
                            <span className="inline-flex items-center gap-1.5 text-theme-xs text-success font-medium">
                                <span className="size-2 rounded-full bg-success animate-pulse" />
                                {personalMetricsT('active_staff')}
                            </span>
                        </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-blue-light/10 dark:bg-blue-light-dark/20 border border-blue-light/30 text-blue-light-dark dark:text-blue-light-light">
                            <span className="text-theme-sm font-bold">{metrics.operatives.percentaje}%</span>
                            <span className="text-theme-xs font-medium">
                                ({metrics.status.in_consultation}/{metrics.total})
                            </span>
                        </div>
                    </div>
                </div>

                {/* Barra de progreso de operatividad */}
                <div className="w-full h-2.5 rounded-full bg-gray-light dark:bg-gray-dark overflow-hidden flex">
                    <div
                        style={{ width: `${metrics.operatives.percentaje}%` }}
                        className="h-full bg-blue-light transition-all duration-500 rounded-full"
                    />
                </div>
            </article>
        </section>
    );
}

export default memo(Metrics);