import type { Headquarters } from "@/types/dataTypes";
import Badge from "@/components/ui/badge/Badge";
import { Building2, Clock, MapPin, Phone, ShieldAlert, Stethoscope } from "lucide-react";

interface Props {
    data: Headquarters;
}

export default function CardHeadquarter({ data }: Props) {
    const activeDepartments = data.departments?.filter((d) => d.isActive) || [];

    return (
        <article className="group relative overflow-hidden rounded-2xl bg-theme-light-dark generic-border-shadow transition-all duration-300 hover:shadow-theme-md">
            {/* Portada / Imagen */}
            <div className="relative h-44 w-full overflow-hidden bg-gray-light/30 dark:bg-gray-dark/50">
                {data.image ? (
                    <img
                        src={data.image}
                        alt={data.name}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                ) : (
                    <div className="flex h-full w-full items-center justify-center text-gray/40 dark:text-gray-light/30">
                        <Building2 className="size-12 stroke-1" />
                    </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between gap-2">
                    <span className="inline-flex items-center gap-1.5 rounded-lg bg-black/50 px-2.5 py-1 text-xs font-medium text-light backdrop-blur-xs">
                        <MapPin className="size-3.5 text-brand-light" />
                        {data.city}
                    </span>
                    <Badge color="success" size="sm">
                        <span>{activeDepartments.length} Deptos. Activos</span>
                    </Badge>
                </div>
            </div>

            {/* Contenido */}
            <div className="p-5 flex flex-col gap-4">
                {/* Nombre y Dirección */}
                <div>
                    <h3 className="text-theme-xl font-bold text-gray-dark dark:text-light-accent group-hover:text-brand transition-colors">
                        {data.name}
                    </h3>
                    <p className="mt-1 text-theme-xs text-theme-light-gray line-clamp-2">
                        {data.address}
                    </p>
                </div>

                {/* Contacto y Horarios */}
                <div className="grid grid-cols-1 gap-2 pt-3 border-t border-gray-light dark:border-gray/30 text-theme-xs text-theme-light-gray">
                    <div className="flex items-center gap-2">
                        <Clock className="size-4 shrink-0 text-brand" />
                        <span className="truncate">{data.hours}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Phone className="size-4 shrink-0 text-success" />
                        <span className="truncate">{data.phone}</span>
                    </div>
                    {data.emergency && (
                        <div className="flex items-center gap-2 text-error dark:text-error-light">
                            <ShieldAlert className="size-4 shrink-0" />
                            <span className="truncate font-medium">{data.emergency}</span>
                        </div>
                    )}
                </div>

                {/* Servicios */}
                {data.services && data.services.length > 0 && (
                    <div className="pt-3 border-t border-gray-light dark:border-gray/30">
                        <p className="text-theme-xs font-semibold text-gray-dark dark:text-light-accent mb-2">
                            Servicios ({data.services.length})
                        </p>
                        <div className="flex flex-wrap gap-1.5">
                            {data.services.slice(0, 4).map((service) => (
                                <span
                                    key={service}
                                    className="rounded-md bg-brand/10 dark:bg-brand-dark/25 px-2 py-0.5 text-[11px] font-medium text-brand dark:text-brand-light"
                                >
                                    {service}
                                </span>
                            ))}
                            {data.services.length > 4 && (
                                <span className="rounded-md bg-gray/10 dark:bg-gray/20 px-1.5 py-0.5 text-[11px] font-medium text-theme-light-gray">
                                    +{data.services.length - 4}
                                </span>
                            )}
                        </div>
                    </div>
                )}

                {/* Especialidades */}
                {data.specialities && data.specialities.length > 0 && (
                    <div className="pt-3 border-t border-gray-light dark:border-gray/30">
                        <div className="flex items-center gap-1.5 text-theme-xs font-semibold text-gray-dark dark:text-light-accent mb-2">
                            <Stethoscope className="size-3.5 text-success" />
                            <span>Especialidades directas</span>
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                            {data.specialities.slice(0, 3).map((spec) => (
                                <span
                                    key={spec}
                                    className="rounded-md bg-success/10 dark:bg-success-dark/25 px-2 py-0.5 text-[11px] font-medium text-success dark:text-success-light"
                                >
                                    {spec}
                                </span>
                            ))}
                            {data.specialities.length > 3 && (
                                <span className="rounded-md bg-gray/10 dark:bg-gray/20 px-1.5 py-0.5 text-[11px] font-medium text-theme-light-gray">
                                    +{data.specialities.length - 3}
                                </span>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </article>
    );
}
