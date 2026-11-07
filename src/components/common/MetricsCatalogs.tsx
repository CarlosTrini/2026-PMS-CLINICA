'use client';
import { memo, useMemo } from "react";
import { CheckCircle2, Layers, Percent, Stethoscope, XCircle } from "lucide-react";
import type { HeadquartersDepartment, Services, Speciality } from "@/types/dataTypes";
import { useHeadquarterStore } from "@/store/useHeadquarterStore";
import useSystemTraslations from "@/hooks/useSysteTranslations";

interface Props {
    data: Speciality[] | Services[] | HeadquartersDepartment[];
    iconCatalog?: React.ReactNode;
    catalogName: string;
}

function MetricsCatalogs({ data, iconCatalog = <Layers />, catalogName = '' }: Props) {
    const { statusT } = useSystemTraslations();
    const { currentHeadquarter } = useHeadquarterStore();

    const stats = useMemo(() => {
        const total = data?.length || 0;
        const activeCount = data?.filter((item) => item.isActive).length || 0;
        const inactiveCount = total - activeCount;

        const activePct = total > 0 ? Math.round((activeCount / total) * 100) : 0;
        const inactivePct = total > 0 ? 100 - activePct : 0;

        return {
            total,
            activeCount,
            inactiveCount,
            activePct,
            inactivePct,
        };
    }, [data]);

    return (
        <section className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
            {/* CARD 1: TOTAL DEL CATÁLOGO */}
            <article className="relative flex items-center justify-between gap-4 p-5 rounded-2xl generic-border-shadow bg-theme-light-dark overflow-hidden transition-all hover:shadow-theme-md">
                {/* Decoración lateral tipo catálogo */}
                <div className="flex items-center gap-4 min-w-0">
                    <div className="relative flex size-14 shrink-0 items-center justify-center rounded-xl bg-brand/10 dark:bg-brand-dark/30 text-brand dark:text-brand-light border border-brand/20">
                        {iconCatalog}
                        <span className="absolute -top-1 -right-1 size-3 rounded-full bg-brand border-2 border-light-accent dark:border-gray-dark" />
                    </div>

                    <div className="flex flex-col min-w-0">
                        <span className="text-theme-xs font-semibold uppercase tracking-wider text-brand dark:text-brand-light">
                            Catálogo de {catalogName}
                        </span>
                        <p className="text-theme-xs text-gray/60 dark:text-gray-light/50 truncate mt-0.5">
                            {currentHeadquarter?.name || "Sede actual"}
                        </p>
                    </div>
                </div>

                {/* Valor numérico destacado en bloque */}
                <div className="flex flex-col items-end shrink-0 pl-4 border-l border-gray/15 dark:border-gray/30">
                    <span className="text-title-sm font-bold text-gray-dark dark:text-light-accent">
                        {stats.total}
                    </span>
                    <span className="text-theme-xs font-medium text-gray/70 dark:text-gray-light/60">
                        registradas
                    </span>
                </div>
            </article>

            {/* CARD 2: DISTRIBUCIÓN ACTIVAS VS INACTIVAS (%) */}
            <article className="flex flex-col justify-between gap-3 p-5 rounded-2xl generic-border-shadow bg-theme-light-dark transition-all hover:shadow-theme-md">
                <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                        <div className="flex size-8 items-center justify-center rounded-lg bg-blue-light/10 dark:bg-blue-light-dark/25 text-blue-light dark:text-blue-light-light">
                            <Percent className="size-4" />
                        </div>
                        <span className="text-theme-sm font-semibold text-gray-dark dark:text-light-accent">
                            Porcentaje operativo
                        </span>
                    </div>

                    {/* Pills de porcentaje Activas / Inactivas */}
                    <div className="flex items-center gap-2">
                        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-success/10 dark:bg-success-dark/20 border border-success/30 text-success-dark dark:text-success-light">
                            <CheckCircle2 className="size-3.5" />
                            <span className="text-theme-xs font-bold">{stats.activePct}%</span>
                            <span className="hidden sm:inline text-theme-xs font-medium">
                                ({stats.activeCount} {statusT("active")})
                            </span>
                        </div>

                        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-error/10 dark:bg-error-dark/20 border border-error/30 text-error-dark dark:text-error-light">
                            <XCircle className="size-3.5" />
                            <span className="text-theme-xs font-bold">{stats.inactivePct}%</span>
                            <span className="hidden sm:inline text-theme-xs font-medium">
                                ({stats.inactiveCount} {statusT("inactive")})
                            </span>
                        </div>
                    </div>
                </div>

                {/* Barra de progreso segmentada (Activas vs Inactivas) */}
                <div className="w-full h-2.5 rounded-full bg-gray-light dark:bg-gray-dark overflow-hidden flex">
                    {stats.total > 0 ? (
                        <>
                            <div
                                style={{ width: `${stats.activePct}%` }}
                                className="h-full bg-success transition-all duration-500"
                            />
                            <div
                                style={{ width: `${stats.inactivePct}%` }}
                                className="h-full bg-error transition-all duration-500"
                            />
                        </>
                    ) : (
                        <div className="w-full h-full bg-gray/20 dark:bg-gray/40" />
                    )}
                </div>
            </article>
        </section>
    );
}

export default memo(MetricsCatalogs);