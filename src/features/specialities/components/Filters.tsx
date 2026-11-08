'use client';
import { STATUS_SIMPLE_ARRAY } from "@/utils/constants";
import Collapse from "@/components/ui/collapse/Collapse";
import Form from "@/components/form/Form";
import Label from "@/components/form/Label";
import Input from "@/components/form/input/InputField";
import Select from "@/components/form/select/Select";
import { FilterSpecialityData, filterSpecialitySchema, filtersSpecialityDefault } from "../schemas/formFiltersSchema";
import { Activity, Building, Delete, Filter, ListOrdered, Search, Stethoscope } from 'lucide-react';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSelect } from "@/hooks/useSelelct";
import { useState, useMemo, useEffect } from "react";
import type { Speciality } from "@/types/dataTypes";
import { useHeadquarterStore } from "@/store/useHeadquarterStore";



interface Props {
    dataQuery: Speciality[];
    updateDataFn: (data: Speciality[]) => void;
    checkPermissionCb: (colFilterName: string) => boolean;

}

export default function FiltersSpecialities({ dataQuery, updateDataFn, checkPermissionCb }: Props) {

    const { currentHeadquarter } = useHeadquarterStore();

    const orderOptions = useMemo(() => [
        { value: 'asc', label: 'Ascendente' },
        { value: 'desc', label: 'Descendente' },
    ], []);

    // HOOKS
    const { resetSelectValue, resetSelectFn } = useSelect();
    const [filtersSelected, setFiltersSelected] = useState<FilterSpecialityData>(filtersSpecialityDefault);
    const [backupData, setBackupData] = useState(dataQuery);

    // HOOK FORM -ZOD
    const { register, handleSubmit, reset, getValues, subscribe } = useForm<FilterSpecialityData, any, FilterSpecialityData>({
        resolver: zodResolver(filterSpecialitySchema),
        defaultValues: filtersSpecialityDefault
    });


    // ------- FUNCIONES

    // DA UN RESET A FILTER EN DATA Y SELECTS
    const resetAllFilters = () => {
        resetSelectFn();
        reset();
        resetDataTable();
        setFiltersSelected(filtersSpecialityDefault);
    };

    // FILTERS & SORTING
    const onHandleFilters = async (filterValues: FilterSpecialityData) => {
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
        const filtered = sourceData.filter((s: Speciality) => {
            // Filtro por servicio específico del select
            if (filterValues.specialities !== 'all') {
                if (s.name !== filterValues.specialities) return false;
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
            if (filterValues.orderBySpecialities) {
                const diff = filterValues.orderBySpecialities === 'asc'
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
            label: item,
        })), { value: 'all', label: 'Todos' }];

        const servicesSelect = backupData?.length > 0
            ? [
                ...backupData.map(s => ({ value: s.name, label: s.name })),
                { value: 'all', label: 'Todos' },
            ] : [];

        return [statusSelect, servicesSelect];
    }, [currentHeadquarter, backupData]);


    // EFFECTS

    // regresa la data a su estado original al quitar filtros
    useEffect(() => {
        if (backupData?.length > 0) return; // ya guardó el bakcup para cuando se quiten los filtros 'Quitar filtros'
        setBackupData(dataQuery);
    }, [dataQuery]);

    // resetea todos los filtros cada que cambia la sede
    useEffect(() => {
        setBackupData([]); // para que cuando cambié de sede, el backup se vacíe y los filtros muestren que no tienen data...
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

                {/* ESPECIALIDADES DE LA SEDE */}
                {
                    filtersSelected.specialities !== 'all' && (
                        <div className="flex gap-2 items-center">
                            <p className="text-brand-dark dark:text-light font-bold" >{'Especialidad'}:</p>
                            <p className="bg-brand/10 text-brand-dark dark:bg-brand-dark/25 dark:text-brand-light border border-brand/20 dark:border-brand-dark/40 font-medium px-1 py-0.5 rounded-lg h-fit w-fit">{filtersSelected.specialities}</p>
                        </div>
                    )
                }






                {/* STATUS */}
                {
                    filtersSelected.status !== 'all' && (
                        <div className="flex gap-2 items-center">
                            <p className="text-brand-dark dark:text-light font-bold">{'Estatus del servicio'}:</p>
                            <p className="bg-brand/10 text-brand-dark dark:bg-brand-dark/25 dark:text-brand-light border border-brand/20 dark:border-brand-dark/40 font-medium px-1 py-0.5 rounded-lg h-fit w-fit">{filtersSelected.status}</p>
                        </div>

                    )
                }

                {/* ORDER BY CRATED AT */}
                {
                    filtersSelected.orderByCreatedAt !== 'asc' && (

                        <div className="flex gap-2 items-center">
                            <p className="text-brand-dark dark:text-light font-bold">{'Ordenar por fecha de creación'}:</p>
                            <p className="bg-brand/10 text-brand-dark dark:bg-brand-dark/25 dark:text-brand-light border border-brand/20 dark:border-brand-dark/40 font-medium px-1 py-0.5 rounded-lg h-fit w-fit">{filtersSelected.orderByCreatedAt}</p>
                        </div>

                    )}


                {/* ORDER BY SERVICE */}
                {

                    filtersSelected.orderBySpecialities !== 'asc' && (
                        <div className="flex gap-2 items-center">
                            <p className="text-brand-dark dark:text-light font-bold">{'Ordenar servicios'}:</p>
                            <p className="bg-brand/10 text-brand-dark dark:bg-brand-dark/25 dark:text-brand-light border border-brand/20 dark:border-brand-dark/40 font-medium px-1 py-0.5 rounded-lg h-fit w-fit">{filtersSelected.orderBySpecialities}</p>
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
                            <Form onSubmit={handleSubmit(onHandleFilters)} key={'speciality-filters'} className="mt-5">

                                <div className=" pb-5 border-b border-gray-light dark:border-gray-light/30">

                                    <Label key={'name-speciality'} htmlFor='name' className="flex gap-2" > <Search className="w-4 h-4 text-theme-light-gray" /> {'Buscar por nombre'}</Label>
                                    <Input type="text" {...register('name')} className="max-w-55" id={`name-speciality`} placeholder={'Servicio'} />
                                </div>

                                {/* FILTROS DE SEDE */}
                                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-10 mb-5">
                                    {/* SEDE */}
                                    <div>
                                        <Label key={'headquarters-speciality'} htmlFor='headquarters' className="flex gap-2" > <Building className="w-4 h-4 text-theme-light-gray" /> {'Sede actual'}</Label>
                                        <p className="text-sm ml-2 text-brand-dark dark:text-brand-light">{currentHeadquarter?.name}</p>

                                    </div>
                                    {/* ESPECIALIDAD */}
                                    <div>
                                        <Label key={'specialities'} htmlFor='specialities' className="flex gap-2" > <Stethoscope className="w-4 h-4 text-theme-light-gray" /> {'Especialidades'}</Label>
                                        <Select canClear defaultValue={getValues('specialities')} {...register('specialities')} reset={resetSelectValue} options={servicesSelect} placeholder='Seleccionar especialidad' />
                                    </div>

                                </div>

                                {/* OTROS FILTROS */}
                                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5 pt-5  border-t border-gray-light  dark:border-gray-light/30">

                                    <div>
                                        <Label key={'status-speciality'} htmlFor='status' className="flex gap-2" > <Activity className="w-4 h-4 text-theme-light-gray" /> {'Estatus de especialidad'}</Label>
                                        <Select canClear defaultValue={getValues('status')} {...register('status')} reset={resetSelectValue} options={statusSelect} placeholder='Selecciona un estatus' />
                                    </div>



                                    {/* ORDERNAR POR INGRESO CREATED_AT */}

                                    <div>
                                        <Label key={'order-by-createdat-speciality'} htmlFor='orderBy' className="flex items-center gap-2" > <ListOrdered className="w-4 h-4 text-theme-light-gray" />  {'Ordenar por fecha de creación'}</Label>
                                        <Select canClear defaultValue={getValues('orderByCreatedAt')} {...register('orderByCreatedAt')} reset={resetSelectValue} options={orderOptions} placeholder='Selecciona un orden' />
                                    </div>
                                    {/* ORDENAR POR ESPECIALIDAD */}
                                    <div>
                                        <Label key={'order-by-speciality'} htmlFor='orderBySpeciality' className="flex items-center gap-2" > <ListOrdered className="w-4 h-4 text-theme-light-gray" />  {'Ordenar por nombre'}</Label>
                                        <Select canClear defaultValue={getValues('orderBySpecialities')} {...register('orderBySpecialities')} reset={resetSelectValue} options={orderOptions} placeholder='Selecciona un orden' />
                                    </div>


                                </div>



                                {/* BOTÓN SUBMIT */}
                                <div className="flex gap-2 justify-end mt-5">
                                    <button type="button" onClick={resetAllFilters} className=" flex items-center gap-1 py-2 px-3 rounded-lg text-theme-light font-semibold bg-error dark:bg-error-dark"> <Delete className="w-4 h-4" /> {'Quitar filtros'}</button>
                                    <button type="submit" className="flex items-center gap-1 py-2 px-3 rounded-lg text-theme-light font-semibold bg-brand dark:bg-brand-dark"> <Filter className="w-4 h-4" /> {'Filtrar'}</button>
                                </div>
                            </Form>

                        )
                    }
                </Collapse >
            </section >
        </>
    );
}

