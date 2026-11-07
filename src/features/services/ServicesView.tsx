'use client';
import { Table, TableBody, TableCell, TableHeader, TableRow } from "@/components/ui/table";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import useSystemTraslations from "@/hooks/useSysteTranslations";
import type { RoleSystem, Services } from "@/types/dataTypes";
import { ServicesActionService } from "./services/service";

import { useMutation, useQuery } from "@tanstack/react-query";
import { useHeadquarterStore } from "@/store/useHeadquarterStore";
import { useUserStore } from "@/store/userStore";
import { useEffect, useState } from "react";
import Fallback from "@/components/fallbackQuery/Fallback";
import Image from "next/image";
import { Calendar, Dot, FilePlus, Layers, List, LucideInfo, Pencil, Stethoscope, TableCellsMerge, Trash, Trash2, WalletCardsIcon } from "lucide-react";
import Badge from "@/components/ui/badge/Badge";
import { STATUS_COLOR_LIGHT } from "@/utils/statusColors";
import Tooltip from "@/components/ui/tooltip/Tooltip";
import Switch from "@/components/form/switch/Switch";
import Button from "@/components/ui/button/Button";
import { useIsMobile } from "@/hooks/useIsMobile";
import MetricsCatalogs from "@/components/common/MetricsCatalogs";
import FiltersServices from "./components/Filters";


const COLUMNS = ['serviceName', 'status', 'createdAt', 'actions'];
const permissionsTableServices: Record<typeof COLUMNS[number], RoleSystem[]> = { // no permitidos ver o accionar
    'serviceName': [],
    'status': [],
    'createdAt': ['assistant', 'receptionist', 'no_role', 'professional'],
    'actions': ['assistant', 'receptionist', 'no_role', 'professional']
};


export default function ServicesView() {

    // TRADUCCIONES
    const { servicesPageT, commonT, statusT, tableColumnsT } = useSystemTraslations();

    // HOOKS
    const [dataTable, setDataTable] = useState<Services[]>([]);
    const [toggleTable, setToggleTable] = useState<'table' | 'cards'>('table');
    const { isMobile } = useIsMobile();


    // ZUSTAND
    const { currentHeadquarter } = useHeadquarterStore();
    const { userRole } = useUserStore();


    // QUERY
    // const { mutate: handleGetServices, isSuccess, isError, error } = useMutation({
    //     mutationKey: ['services-page-table'],
    //     mutationFn: () => ServicesActionService.getAllServices(),
    //     onSuccess: (data) => {
    //         console.log('SERVICES DATA ==>', data)
    //         setDataTable(Array.isArray(data) ? data : [])
    //     }
    // });

    const { data: dataServices, isLoading, isError, error } = useQuery({
        queryKey: ['services-page-table', currentHeadquarter?.id],
        queryFn: () => ServicesActionService.getAllServices(currentHeadquarter?.id || ''),
        enabled: !!currentHeadquarter?.id // solo si hay sede
    });


    // REVISAR PERMISOS PARA TABLA Y FILTROS
    const checkPermissionsTable = (col: string): boolean => {
        return permissionsTableServices[col] && permissionsTableServices[col].some(ur => ur === userRole);
    };


    useEffect(() => {
        setToggleTable(isMobile ? 'cards' : 'table')
    }, [isMobile]);

    useEffect(() => {
        if (dataServices && Array.isArray(dataServices)) {
            setDataTable(dataServices)
        }
    }, [dataServices]);



    return (
        <>
            <PageBreadcrumb pageTitle={'Catálogo de servicios'} />

            <MetricsCatalogs catalogName="Servicios" iconCatalog={<List className="text-light" />} data={dataServices || []} />


            {/* FILTERS */}
            <FiltersServices
                dataQuery={dataTable as Services[]}
                updateDataFn={(filteredData) => setDataTable(filteredData)}
                checkPermissionCb={(colName) => checkPermissionsTable(colName)} // En caso de filtros relacoinados a columnas.,..  ejemplo: Filtro: Orden por ingreso, Col: createdAt
            />

            <div className="flex items-baseline justify-end">

                <Button type="button" size="xs" variant="primary" ><FilePlus />Agregar servicio</Button>
                <div>
                </div>
            </div>


            <Fallback
                id='services-table-fallback'
                isLoading={isLoading}
                isError={error}
                data={dataTable}
                errorMsg={error?.message}
                errorClassName="min-h-[40vh]"
                loadingClassName="min-h-[40vh]"
                noDataPlaceholder={<>
                    <div className="h-[50vh] flex flex-col items-center justify-center gap-2">
                        <figure className="w-15 h-15 overflow-hidden rounded-full">
                            <Image src="/images/no-results.jpg" alt="Empty" width={100} height={100} className="object-cover" />
                        </figure>
                        <p className="font-bold text-lg text-theme-light-gray">No se han encontrado coincidencias de servicios</p>

                    </div>
                </>}
            >
                <div className="flex items-baseline justify-between">
                    <div className={`${dataTable && dataTable.length > 0 ? 'visible' : 'opacity-0'}`}>
                        <p className="italic font-semibold text-sm items-baseline text-gray/70 dark:text-gray-light/70">Coincidencias: {dataTable && dataTable.length}</p>
                    </div>

                    <div className={`flex gap-2  ${isMobile ? 'invisible' : 'visible'}`}>
                        <Tooltip content='Vista Tabla' >

                            <button onClick={() => setToggleTable('table')}><TableCellsMerge className={`p-1 rounded-md   ${toggleTable == 'table' ? 'bg-brand/80 text-light' : 'bg-gray/20 text-gray/70'} `} /></button>
                        </Tooltip>
                        <Tooltip content='Vista Cards' >

                            <button onClick={() => setToggleTable('cards')}><WalletCardsIcon className={`p-1 rounded-md   ${toggleTable == 'cards' ? 'bg-brand/80 text-light' : 'bg-gray/20 text-gray/70'} `} /></button>
                        </Tooltip>
                    </div>

                    <div></div>


                </div>
                {
                    toggleTable == 'cards' && (
                        <section className="w-full min-w-0 mt-3">
                            <div className="grid grid-cols-1 lg:grid-cols-2  gap-3 max-h-[76vh] mx-auto overflow-y-auto custom-scrollbar p-1">
                                {dataTable?.map((s) => (
                                    <article
                                        key={s.id}
                                        className="group flex flex-col justify-between gap-4 p-4 rounded-xl generic-border-shadow bg-theme-light-dark hover:border-brand/50 dark:hover:border-brand-light/40 transition-colors"
                                    >
                                        {/* TOP: Ícono, Nombre y Badge */}
                                        <div className="flex items-start justify-between gap-3">
                                            <div className="flex items-center gap-3 min-w-0">
                                                <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-brand/10 dark:bg-brand-dark/30 text-brand dark:text-brand-light border border-brand/20">
                                                    <Layers className="size-5" />
                                                </div>
                                                <div className="min-w-0">
                                                    <h3 className="text-theme-sm font-bold text-gray-dark dark:text-gray-light truncate">
                                                        {s.name}
                                                    </h3>
                                                    <p className="text-theme-xs font-mono text-gray/60 dark:text-gray-light/50">
                                                        ID: {s.id.slice(0, 8)}
                                                    </p>
                                                </div>
                                            </div>

                                            <Badge
                                                size="sm"

                                                variantColor={
                                                    s.isActive
                                                        ? STATUS_COLOR_LIGHT.active
                                                        : STATUS_COLOR_LIGHT.inactive
                                                }
                                            >
                                                {s.isActive ? statusT('active') : statusT('inactive')}
                                            </Badge>
                                        </div>

                                        {/* FOOTER: Fecha y Acciones */}
                                        <div className="flex items-center justify-between pt-3 border-t border-gray/10 dark:border-gray/30">
                                            {!checkPermissionsTable('createdAt') ? (
                                                <span className="inline-flex items-center gap-1.5 text-theme-xs text-gray/70 dark:text-gray-light/60">
                                                    <Calendar className="size-3.5 text-brand dark:text-brand-light" />
                                                    {new Date().toLocaleDateString()}
                                                </span>
                                            ) : (
                                                <span />
                                            )}

                                            {!checkPermissionsTable('actions') && (
                                                <div className="flex items-center gap-1.5">
                                                    <button
                                                        type="button"
                                                        className="p-1.5 rounded-lg bg-brand/10 hover:bg-brand text-brand hover:text-light dark:bg-brand-dark/30 dark:text-brand-light dark:hover:bg-brand-dark transition-colors"
                                                    >
                                                        <Pencil className="size-3.5" />
                                                    </button>
                                                    <button
                                                        type="button"
                                                        className="p-1.5 rounded-lg bg-error/10 hover:bg-error text-error hover:text-light dark:bg-error-dark/30 dark:text-error-light dark:hover:bg-error-dark transition-colors"
                                                    >
                                                        <Trash2 className="size-3.5" />
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    </article>
                                ))}
                            </div>
                        </section>

                    )
                }

                {
                    toggleTable == 'table' && (
                        <section className="w-full min-w-0 mt-2">
                            <div className="w-full h-full max-h-[76vh] min-w-0 overflow-auto custom-scrollbar rounded-xl generic-border-shadow bg-theme-light-dark">
                                <Table className="w-full text-left border-collapse" id="services-table">
                                    <TableHeader className="sticky top-0 z-1 border-b bg-brand dark:bg-brand-dark border-gray/20 dark:border-gray/40">
                                        <TableRow>
                                            {COLUMNS.map((col) => {
                                                if (checkPermissionsTable(col)) return null;
                                                const alignClass =
                                                    col === 'serviceName'
                                                        ? 'text-left'
                                                        : col === 'actions'
                                                            ? 'text-right'
                                                            : 'text-center';
                                                return (
                                                    <TableCell key={col} isHeader className={alignClass}>
                                                        <p className="generic-header-table">
                                                            {tableColumnsT(col)}
                                                        </p>
                                                    </TableCell>
                                                );
                                            })}
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody className="divide-y divide-gray/10 dark:divide-gray/30 text-theme-light-gray">
                                        {dataTable?.map((s) => (
                                            <TableRow
                                                key={s.id}
                                                className="group transition-colors hover:bg-brand/5 dark:hover:bg-brand-light/5"
                                            >
                                                {/* NOMBRE DEL SERVICIO + ID */}
                                                <TableCell className="p-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-brand/10 dark:bg-brand-dark/30 text-brand dark:text-brand-light border border-brand/20">
                                                            <List className="size-4" />
                                                        </div>
                                                        <div className="flex flex-col min-w-0">
                                                            <p className="text-theme-sm font-semibold text-gray-dark dark:text-gray-light truncate">
                                                                {s.name}
                                                            </p>
                                                            <span className="text-theme-xs font-mono text-gray/60 dark:text-gray-light/50">
                                                                ID: {s.id.slice(0, 8)}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </TableCell>
                                                {/* ESTADO */}
                                                <TableCell className="p-4 text-center whitespace-nowrap">
                                                    <div className="inline-flex justify-center">
                                                        <Badge
                                                            size="sm"
                                                            variantColor={
                                                                s.isActive
                                                                    ? STATUS_COLOR_LIGHT.active
                                                                    : STATUS_COLOR_LIGHT.inactive
                                                            }
                                                        >
                                                            {s.isActive ? statusT('active') : statusT('inactive')}
                                                        </Badge>
                                                    </div>
                                                </TableCell>
                                                {/* FECHA DE CREACIÓN (Respeta permisos) */}
                                                {!checkPermissionsTable('createdAt') && (
                                                    <TableCell className="p-4 text-center whitespace-nowrap">
                                                        <div className="inline-flex items-center justify-center gap-1.5 text-theme-sm text-gray dark:text-gray-light/80">
                                                            <Calendar className="size-4 text-brand dark:text-brand-light" />
                                                            <span>{new Date().toLocaleDateString()}</span>
                                                        </div>
                                                    </TableCell>
                                                )}
                                                {/* ACCIONES (Respeta permisos) */}
                                                {!checkPermissionsTable('actions') && (
                                                    <TableCell className="p-4 text-right whitespace-nowrap">
                                                        <div className="inline-flex items-center justify-end gap-2">
                                                            <button
                                                                type="button"
                                                                className="p-1.5 rounded-lg bg-brand/10 hover:bg-brand text-brand hover:text-light dark:bg-brand-dark/30 dark:text-brand-light dark:hover:bg-brand-dark dark:hover:text-light transition-colors"
                                                                title={commonT('edit')}
                                                            >
                                                                <Pencil className="size-4" />
                                                            </button>
                                                            <Tooltip
                                                                position="left"
                                                                trigger="click"
                                                                content={
                                                                    <div className="p-2.5 bg-error-dark/60">
                                                                        <p className="text-theme-xs text-theme-light">
                                                                            ¿{commonT('delete')}{' '}
                                                                            <span className="font-bold italic">{s.name}</span>?
                                                                        </p>
                                                                        <p className="text-theme-xs mt-1 text-theme-light italic">
                                                                            ({commonT('thisActionCannotBeUndone')})
                                                                        </p>
                                                                        <button
                                                                            type="button"
                                                                            className="px-2.5 py-1 mt-2 text-theme-xs rounded-md bg-error dark:bg-error-dark hover:bg-error/80 text-light"
                                                                        >
                                                                            {commonT('delete')}
                                                                        </button>
                                                                    </div>
                                                                }
                                                            >
                                                                <button
                                                                    type="button"
                                                                    className="p-1.5 rounded-lg bg-error/10 hover:bg-error text-error hover:text-light dark:bg-error-dark/30 dark:text-error-light dark:hover:bg-error-dark dark:hover:text-light transition-colors"
                                                                    title={commonT('delete')}
                                                                >
                                                                    <Trash2 className="size-4" />
                                                                </button>
                                                            </Tooltip>
                                                        </div>
                                                    </TableCell>
                                                )}
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>
                        </section>
                    )
                }



            </Fallback>

        </>
    );
}

