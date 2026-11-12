'use client';
import { STATUS_SIMPLE_ARRAY } from "@/utils/constants";
import Collapse from "@/components/ui/collapse/Collapse";
import Form from "@/components/form/Form";
import Label from "@/components/form/Label";
import Input from "@/components/form/input/InputField";
import Select from "@/components/form/select/Select";
import { FilterServicesData, filterServicesSchema, filtersServicesDefault } from "../schemas/formFiltersSchema";
import { Activity, Briefcase, Building, Delete, Filter, ListOrdered, Search } from 'lucide-react';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSelect } from "@/hooks/useSelelct";
import { useState, useMemo, useEffect } from "react";
import type { Services } from "@/types/dataTypes";
import { useHeadquarterStore } from "@/store/useHeadquarterStore";
import Button from "@/components/ui/button/Button";



interface Props {
    dataQuery: Services[];
    updateDataFn: (data: Services[]) => void;
    checkPermissionCb: (colFilterName: string) => boolean;
    backupData: Services[];
}

export default function FiltersServices({ dataQuery, updateDataFn, checkPermissionCb, backupData }: Props) {

    const { currentHeadquarter } = useHeadquarterStore();

    const orderOptions = useMemo(() => [
        { value: 'asc', label: 'Ascendente' },
        { value: 'desc', label: 'Descendente' },
    ], []);

    // HOOKS
    const { resetSelectValue, resetSelectFn } = useSelect();
    const [filtersSelected, setFiltersSelected] = useState<FilterServicesData>(filtersServicesDefault);// guarda value (id) de selects para filtrar
    const [filtersSelectedPills, setFiltersSelectedPills] = useState<FilterServicesData>(filtersServicesDefault); // guarda el label para mostrar en el header del filtro

    // HOOK FORM -ZOD
    const { register, handleSubmit, reset, getValues, subscribe } = useForm<FilterServicesData, any, FilterServicesData>({
        resolver: zodResolver(filterServicesSchema),
        defaultValues: filtersServicesDefault
    });


    // ------- FUNCIONES

    // DA UN RESET A FILTER EN DATA Y SELECTS
    const resetAllFilters = () => {
        resetDataTable();
        resetSelectFn();
        reset();
        setFiltersSelected(filtersServicesDefault);
    };

    // FILTERS & SORTING
    const onHandleFilters = async (filterValues: FilterServicesData) => {
        // actualiza badge de filtros (cabecera de collapse)
        setFiltersSelected(filterValues);

        const sourceData = backupData.length > 0 ? backupData : dataQuery;
        if (!sourceData) return;

        // REGLA => SI SE FILTRA POR NOMBRE, LOS DEMÁS FILTROS SE IGNORAN
        if (filterValues.name?.trim()) {
            const searchName = filterValues.name.trim().toLowerCase();
            const filtered = sourceData.filter((s) =>
                s.name.toLowerCase().includes(searchName)
            );
            updateDataFn(filtered);
            return;
        }

        // FASE 1: FILTRAR (¿Quién se queda y quién se va?)
        const filtered = sourceData.filter((s: Services) => {
            // Filtro por servicio específico del select
            if (filterValues.services !== 'all') {
                if (s.name !== filterValues.services) return false;
            }

            // Filtro por Estatus ('activo' -> true, 'inactivo' -> false)
            if (filterValues.status !== 'all') {
                const isSearchingActive = filterValues.status === 'active';
                if (s.isActive !== isSearchingActive) return false;
            }

            return true;
        });

        // FASE 2: ORDENAR (Organizar los elementos que pasaron los filtros)
        const sorted = [...filtered].sort((a, b) => {
            // Criterio 1: Orden por Fecha de creación
            if (filterValues.orderByCreatedAt) {
                const timeA = new Date(a.createdAt).getTime();
                const timeB = new Date(b.createdAt).getTime();
                const diff = filterValues.orderByCreatedAt === 'asc' ? timeA - timeB : timeB - timeA;
                if (diff !== 0) return diff;
            }

            // Criterio 2: Orden por Nombre del servicio
            if (filterValues.orderByServices) {
                const diff = filterValues.orderByServices === 'asc'
                    ? a.name.localeCompare(b.name)
                    : b.name.localeCompare(a.name);
                if (diff !== 0) return diff;
            }
            return 0;
        });

        updateDataFn(sorted);
    };

    // RESET DATA TABLE
    const resetDataTable = () => updateDataFn(backupData || []);

    // LISTAS DE SELECTS
    const [statusSelect, servicesSelect] = useMemo(() => {


        const statusSelect = [...STATUS_SIMPLE_ARRAY.map((item) => ({
            value: item,
            label: item == 'active' ? 'Activo' : 'Inactivo',
        })), { value: 'all', label: 'Todos' }];

        const servicesSelect = backupData?.length > 0
            ? [
                ...backupData.map(s => ({ value: s.name, label: s.name })),
                { value: 'all', label: 'Todos' },
            ] : [];

        return [statusSelect, servicesSelect];
    }, [currentHeadquarter, backupData]);


    // EFFECTS


    // resetea todos los filtros cada que cambia la sede
    useEffect(() => {
        resetAllFilters();
    }, [currentHeadquarter]);



    // EFFECTS
    // detecta cambios en los valores de los filtros
    useEffect(() => {
        const unsubscribe = subscribe({
            formState: {
                values: true,  // ← SIN ESTO NO REACCIONA A CAMBIOS DE VALOR
            },
            callback: ({ values, name }) => {
                // ACTUALIZA LOS PREVIEWS DE FILTROS 
                setFiltersSelected({ ...values });
            },
        });
        return unsubscribe;
    }, [subscribe, currentHeadquarter]);



    //  RENDERS

    const InfoCurrentFilters = () => (
        <>
            <div className="flex flex-wrap gap-5 text-[10px]! justify-center">
                {
                    filtersSelected.name !== '' && (
                        <div className="flex gap-1.5 items-center">
                            <p className="text-brand-dark dark:text-light font-bold">{'Nombre Servicio'}:</p>
                            <p className="bg-brand/10 text-brand-dark dark:bg-brand-dark/25 dark:text-brand-light border border-brand/20 dark:border-brand-dark/40 font-medium px-1 py-0.5 rounded-lg h-fit w-fit">{filtersSelected.name}</p>
                        </div>
                    )
                }

                {/* SEDE */}
                <div className="flex gap-2 items-center">
                    <p className="text-brand-dark dark:text-light font-bold">{'Sede'}:</p>
                    <p className="bg-brand/10 text-brand-dark dark:bg-brand-dark/25 dark:text-brand-light border border-brand/20 dark:border-brand-dark/40 font-medium px-1 py-0.5 rounded-lg h-fit w-fit">
                        {currentHeadquarter?.name}
                    </p>
                </div>

                {/* SERVICIOS DE LA SEDE */}
                {
                    filtersSelected.services !== 'all' && (
                        <div className="flex gap-2 items-center">
                            <p className="text-brand-dark dark:text-light font-bold" >{'Servicios'}:</p>
                            <p className="bg-brand/10 text-brand-dark dark:bg-brand-dark/25 dark:text-brand-light border border-brand/20 dark:border-brand-dark/40 font-medium px-1 py-0.5 rounded-lg h-fit w-fit">{filtersSelectedPills.services}</p>
                        </div>
                    )
                }






                {/* STATUS */}
                {
                    filtersSelected.status !== 'all' && (
                        <div className="flex gap-2 items-center">
                            <p className="text-brand-dark dark:text-light font-bold">{'Estatus del servicio'}:</p>
                            <p className="bg-brand/10 text-brand-dark dark:bg-brand-dark/25 dark:text-brand-light border border-brand/20 dark:border-brand-dark/40 font-medium px-1 py-0.5 rounded-lg h-fit w-fit">{filtersSelectedPills.status}</p>
                        </div>

                    )
                }

                {/* ORDER BY CRATED AT */}
                {
                    !checkPermissionCb('createdAt') && filtersSelected.orderByCreatedAt !== 'asc' && (
                        <div className="flex gap-2 items-center">
                            <p className="text-brand-dark dark:text-light font-bold">{'Ordenar por fecha de creación'}:</p>
                            <p className="bg-brand/10 text-brand-dark dark:bg-brand-dark/25 dark:text-brand-light border border-brand/20 dark:border-brand-dark/40 font-medium px-1 py-0.5 rounded-lg h-fit w-fit">{filtersSelectedPills.orderByCreatedAt}</p>
                        </div>


                    )
                }


                {/* ORDER BY SERVICE NAME */}
                {

                    filtersSelected.orderByServices !== 'asc' && (
                        <div className="flex gap-2 items-center">
                            <p className="text-brand-dark dark:text-light font-bold">{'Ordenar servicios'}:</p>
                            <p className="bg-brand/10 text-brand-dark dark:bg-brand-dark/25 dark:text-brand-light border border-brand/20 dark:border-brand-dark/40 font-medium px-1 py-0.5 rounded-lg h-fit w-fit">{filtersSelectedPills.orderByServices}</p>
                        </div>
                    )
                }


            </div>

        </>
    );



    return (
        <>
            <section className="mt-10 mb-6 ">
                <Collapse title={'Filtros'} positionOpenBtn="left" defaultOpen={false} contentHeader={<InfoCurrentFilters />} >
                    {
                        backupData && backupData.length < 1 && (
                            <div className="flex gap-2 items-center justify-center mt-4">
                                <p className="bg-brand/10 text-brand-dark dark:bg-brand-dark/25 dark:text-brand-light border border-brand/20 dark:border-brand-dark/40 font-medium px-1 py-0.5 rounded-lg h-fit w-fit">{'Sin datos disponibles'}</p>
                            </div>
                        )
                    }

                    {
                        backupData && backupData.length > 0 && (
                            <Form onSubmit={handleSubmit(onHandleFilters)} key={'services-filters'} className="mt-5">

                                <div className=" pb-5 border-b border-gray-light dark:border-gray-light/30">

                                    <Label key={'name-services'} htmlFor='name' className="flex gap-2" > <Search className="w-4 h-4 text-theme-light-gray" /> {'Buscar por nombre'}</Label>
                                    <Input type="text" {...register('name')} className="max-w-55" id={`name-services`} placeholder={'Servicio'} />
                                </div>

                                {/* FILTROS DE SEDE */}
                                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-10 mb-5">
                                    {/* SEDE */}
                                    <div>
                                        <Label key={'headquarters-services'} htmlFor='headquarters' className="flex gap-2" > <Building className="w-4 h-4 text-theme-light-gray" /> {'Sede actual'}</Label>
                                        <p className="text-sm ml-2 text-brand-dark dark:text-brand-light">{currentHeadquarter?.name}</p>

                                    </div>
                                    {/* SERVICIOS */}
                                    <div>
                                        <Label key={'services-services'} htmlFor='services' className="flex gap-2" > <Briefcase className="w-4 h-4 text-theme-light-gray" /> {'Servicios'}</Label>
                                        <Select
                                            canClear
                                            getLabel={(option) => { setFiltersSelectedPills(prev => ({ ...prev, 'services': option!.label })) }}
                                            defaultValue={getValues('services')} {...register('services')}
                                            reset={resetSelectValue}
                                            options={servicesSelect}
                                            placeholder='Selecciona un servicio' />
                                    </div>

                                </div>

                                {/* OTROS FILTROS */}
                                <div className="grid grid-cols-1 md:grid-cols-3  gap-5 pt-5  border-t border-gray-light  dark:border-gray-light/30">

                                    <div>
                                        <Label key={'status-services'} htmlFor='status' className="flex gap-2" > <Activity className="w-4 h-4 text-theme-light-gray" /> {'Estatus del servicio'}</Label>
                                        <Select
                                            canClear
                                            getLabel={(option) => { setFiltersSelectedPills(prev => ({ ...prev, 'status': option!.label as FilterServicesData['status'] })) }}
                                            defaultValue={getValues('status')} {...register('status')}
                                            reset={resetSelectValue}
                                            options={statusSelect}
                                            placeholder='Selecciona un estatus' />
                                    </div>



                                    {/* ORDERNAR POR INGRESO CREATED_AT */}
                                    {
                                        !checkPermissionCb('createdAt') && (
                                            <div>
                                                <Label key={'order-by-createdat-services'} htmlFor='orderByCreatedAt' className="flex items-center gap-2" > <ListOrdered className="w-4 h-4 text-theme-light-gray" />  {'Ordenar por fecha de creación'}</Label>
                                                <Select
                                                    canClear
                                                    getLabel={(option) => { setFiltersSelectedPills(prev => ({ ...prev, 'orderByCreatedAt': option!.label as FilterServicesData['orderByCreatedAt'] })) }}
                                                    defaultValue={getValues('orderByCreatedAt')} {...register('orderByCreatedAt')}
                                                    reset={resetSelectValue}
                                                    options={orderOptions}
                                                    placeholder='Selecciona un orden' />
                                            </div>
                                        )

                                    }
                                    {/* ORDENAR POR SERVICIO */}
                                    <div>
                                        <Label key={'order-by-speciality-services'} htmlFor='orderByService' className="flex items-center gap-2" > <ListOrdered className="w-4 h-4 text-theme-light-gray" />  {'Ordenar por nombre'}</Label>
                                        <Select
                                            canClear
                                            getLabel={(option) => { setFiltersSelectedPills(prev => ({ ...prev, 'orderByServices': option!.label as FilterServicesData['orderByServices'] })) }}
                                            defaultValue={getValues('orderByServices')} {...register('orderByServices')}
                                            reset={resetSelectValue}
                                            options={orderOptions}
                                            placeholder='Selecciona un orden' />

                                    </div>


                                </div>



                                {/* BOTÓN SUBMIT */}
                                <div className="flex gap-2 justify-end mt-5">
                                    <Button size="sm" type="button" onClick={resetAllFilters} className="flex items-center gap-1 py-2 px-3 rounded-lg text-theme-light font-semibold bg-error dark:bg-error-dark"> <Delete className="w-4 h-4" /> {'Quitar filtros'}</Button>
                                    <Button size="sm" type="submit" className="flex items-center gap-1 py-2 px-3 rounded-lg text-theme-light font-semibold bg-brand dark:bg-brand-dark"> <Filter className="w-4 h-4" /> {'Filtrar'}</Button>
                                </div>
                            </Form>
                        )

                    }

                </Collapse >
            </section >
        </>
    );
}

