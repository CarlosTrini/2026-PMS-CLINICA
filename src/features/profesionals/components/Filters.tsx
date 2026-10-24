'use client'
import { DEPARTMENT_ARRAY, SPECIALITY_ARRAY, STATUS_PROFESSIONAL_ARRAY } from "@/utils/datadummy";
import Collapse from "@/components/ui/collapse/Collapse";
import Form from "@/components/form/Form";
import Label from "@/components/form/Label";
import Input from "@/components/form/input/InputField";
import Select from "@/components/form/select/Select";
import { FilterData, filterProfesionalsSchema, filtersProfesionalsDefault } from "../schemas/formFilters";
import { Activity, Building, Delete, Filter, ListOrdered, Search, Stethoscope } from 'lucide-react';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSelect } from "@/hooks/useSelelct";
import { useState, useMemo } from "react";
import type { Professional } from "@/types/dataTypes";
import useSystemTraslations from "@/hooks/useSysteTranslations";



interface Props {
    dataQuery: Professional[];
    updateDataFn: (data: Professional[]) => void;

}

export default function FiltersProfesionals({ dataQuery, updateDataFn }: Props) {

    const { commonT, specialityT, statusT, departmentT, profFiltersT } = useSystemTraslations();

    const orderOptions = useMemo(() => [
        { value: 'asc', label: commonT('asc') },
        { value: 'desc', label: commonT('desc') },
    ], [commonT]);

    // HOOKS
    const { resetSelectValue, resetSelectFn } = useSelect();
    const [filtersSelected, setFiltersSelected] = useState<FilterData>(filtersProfesionalsDefault);

    // HOOK FORM -ZOD
    const { register, handleSubmit, reset, getValues } = useForm<FilterData>({
        resolver: zodResolver(filterProfesionalsSchema),
        defaultValues: filtersProfesionalsDefault
    });

    // FILTERS & SORTING
    const onHandleFilters = async (filterValues: FilterData) => {
        // actualiza badge de filtros (cabecera de collapse)
        setFiltersSelected(filterValues);

        if (!dataQuery) return;
        // HACK: REGLA => SI SE FILTRA POR NOMBRE, LOS DEMÁS FILTROS SE IGNORAN
        if (filterValues.name?.trim()) {
            const filtered = dataQuery.filter(p => {
                const search = filterValues.name?.trim().toLowerCase();
                const fullName = `${p.personalInfo.name} ${p.personalInfo.lastName}`.toLowerCase();
                if (search && !fullName.includes(search)) return;

                return search && fullName.includes(search);
            });
            updateDataFn(filtered);
            return;
        }

        // FASE 1: FILTRAR (¿Quién se queda y quién se va?)
        const filtered = dataQuery.filter(p => {
            // 1. Filtro por Nombre o Apellido (insensible a mayúsculas/minúsculas)
            // if (filterValues.name?.trim()) {
            //     const search = filterValues.name.trim().toLowerCase();
            //     const fullName = `${p.personalInfo.name} ${p.personalInfo.lastName}`.toLowerCase();
            //     if (!fullName.includes(search)) return false;
            // }

            // 2. Filtro por Especialidad
            if (filterValues.speciality !== 'all') {
                const hasSpeciality = p.profesionalInfo.some(i => i.speciality === filterValues.speciality);
                if (!hasSpeciality) return false;
            }

            // 3. Filtro por Estatus
            if (filterValues.status !== 'all') {
                if (p.status !== filterValues.status) return false;
            }

            // 4. Filtro por Departamento
            if (filterValues.department !== 'all') {
                if (filterValues.department === 'noDepartment') {
                    if (p.department !== '') return false;
                } else {
                    if (p.department !== filterValues.department) return false;
                }
            }

            return true;
        });

        // FASE 2: ORDENAR (Organizar los elementos que pasaron los filtros)
        const sorted = [...filtered].sort((a, b) => {
            // Criterio 1: Orden por Fecha de ingreso
            if (filterValues.orderByCreatedAt) {
                const timeA = new Date(a.createdAt).getTime();
                const timeB = new Date(b.createdAt).getTime();
                const diff = filterValues.orderByCreatedAt === 'asc' ? timeA - timeB : timeB - timeA;
                if (diff !== 0) return diff;
            }

            // Criterio 2: Orden por Especialidad (desempate o secundario)
            if (filterValues.orderBySpeciality) {
                const specA = a.profesionalInfo[0]?.speciality || '';
                const specB = b.profesionalInfo[0]?.speciality || '';
                const diff = filterValues.orderBySpeciality === 'asc'
                    ? specA.localeCompare(specB)
                    : specB.localeCompare(specA);
                if (diff !== 0) return diff;
            }

            // Criterio 3: Orden por Estatus
            if (filterValues.orderByStatus) {
                return filterValues.orderByStatus === 'asc'
                    ? a.status.localeCompare(b.status)
                    : b.status.localeCompare(a.status);
            }

            return 0;
        });

        updateDataFn(sorted);
    };

    // RESET DATA TABLE
    const resetDataTable = () => updateDataFn(dataQuery || []);

    // LISTAS DE SELECTS
    const [specialitySelect, statusSelect, departmentSelect] = useMemo(() => {
        const specialitySelect = [...SPECIALITY_ARRAY.map((item) => ({
            value: item,
            label: specialityT(item),
        })), { value: 'all', label: commonT('all') }];
        const statusSelect = [...STATUS_PROFESSIONAL_ARRAY.map((item) => ({
            value: item,
            label: statusT(item),
        })), { value: 'all', label: commonT('all') }];
        const departmentSelect = [...DEPARTMENT_ARRAY.map((item) => ({
            value: item,
            label: item === 'noDepartment' ? departmentT('no_department') : departmentT(item),
        })), { value: 'all', label: commonT('all') }];
        return [specialitySelect, statusSelect, departmentSelect];
    }, [specialityT, statusT, departmentT, commonT]);


    const InfoCurrentFilters = () => (
        <>
            <div className="flex flex-wrap gap-5 text-[10px]! justify-center">
                {
                    filtersSelected.name !== '' && (
                        <div className="flex gap-1.5 items-center">
                            <p className="text-brand-dark dark:text-light font-bold">{profFiltersT('name')}:</p>
                            <p className="bg-brand/10 text-brand-dark dark:bg-brand-dark/25 dark:text-brand-light border border-brand/20 dark:border-brand-dark/40 font-medium px-1 py-0.5 rounded-lg h-fit w-fit">{filtersSelected.name}</p>
                        </div>
                    )
                }
                <div className="flex gap-2 items-center">
                    <p className="text-brand-dark dark:text-light font-bold" >{profFiltersT('speciality')}:</p>
                    <p className="bg-brand/10 text-brand-dark dark:bg-brand-dark/25 dark:text-brand-light border border-brand/20 dark:border-brand-dark/40 font-medium px-1 py-0.5 rounded-lg h-fit w-fit">{specialityT(filtersSelected.speciality)}</p>
                </div>
                <div className="flex gap-2 items-center">
                    <p className="text-brand-dark dark:text-light font-bold">{profFiltersT('status')}:</p>
                    <p className="bg-brand/10 text-brand-dark dark:bg-brand-dark/25 dark:text-brand-light border border-brand/20 dark:border-brand-dark/40 font-medium px-1 py-0.5 rounded-lg h-fit w-fit">{statusT(filtersSelected.status)}</p>
                </div>
                <div className="flex gap-2 items-center">
                    <p className="text-brand-dark dark:text-light font-bold">{profFiltersT('department')}:</p>
                    <p className="bg-brand/10 text-brand-dark dark:bg-brand-dark/25 dark:text-brand-light border border-brand/20 dark:border-brand-dark/40 font-medium px-1 py-0.5 rounded-lg h-fit w-fit">
                        {filtersSelected.department === 'noDepartment'
                            ? departmentT('no_department')
                            : departmentT(filtersSelected.department)}
                    </p>
                </div>
                <div className="flex gap-2 items-center">
                    <p className="text-brand-dark dark:text-light font-bold">{profFiltersT('orderByCreatedAt')}:</p>
                    <p className="bg-brand/10 text-brand-dark dark:bg-brand-dark/25 dark:text-brand-light border border-brand/20 dark:border-brand-dark/40 font-medium px-1 py-0.5 rounded-lg h-fit w-fit">{commonT(filtersSelected.orderByCreatedAt)}</p>
                </div>
                <div className="flex gap-2 items-center">
                    <p className="text-brand-dark dark:text-light font-bold">{profFiltersT('orderBySpeciality')}:</p>
                    <p className="bg-brand/10 text-brand-dark dark:bg-brand-dark/25 dark:text-brand-light border border-brand/20 dark:border-brand-dark/40 font-medium px-1 py-0.5 rounded-lg h-fit w-fit">{commonT(filtersSelected.orderBySpeciality)}</p>
                </div>
                <div className="flex gap-2 items-center">
                    <p className="text-brand-dark dark:text-light font-bold">{profFiltersT('orderByStatus')}:</p>
                    <p className="bg-brand/10 text-brand-dark dark:bg-brand-dark/25 dark:text-brand-light border border-brand/20 dark:border-brand-dark/40 font-medium px-1 py-0.5 rounded-lg h-fit w-fit">{commonT(filtersSelected.orderByStatus)}</p>
                </div>
            </div>

        </>
    );


    return (
        <>
            <section className="my-10 ">
                <Collapse title={commonT('filters')} positionOpenBtn="left" defaultOpen={false} contentHeader={<InfoCurrentFilters />} >
                    <Form onSubmit={handleSubmit(onHandleFilters)} key={'professional-filters'} className="mt-5">

                        <div className=" pb-5 border-b border-gray-light dark:border-gray-light/30">

                            <Label key={'name-profesionals'} htmlFor='name' className="flex gap-2" > <Search className="w-4 h-4 text-theme-light-gray" /> {profFiltersT('searchByName')}</Label>
                            <Input type="text" {...register('name')} className="max-w-55" id={`name-profesionals`} placeholder={profFiltersT('searchByName')} />
                        </div>

                        {/* OTROS FILTROS */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mt-10 mb-5">
                            <div>
                                <Label key={'speciality-profesionals'} htmlFor='speciality' className="flex gap-2" > <Stethoscope className="w-4 h-4 text-theme-light-gray" /> {profFiltersT('speciality')}</Label>
                                <Select canClear defaultValue={getValues('speciality')} {...register('speciality')} reset={resetSelectValue} options={specialitySelect} placeholder='Selecciona una especialidad' />
                            </div>

                            <div>
                                <Label key={'status-profesionals'} htmlFor='status' className="flex gap-2" > <Activity className="w-4 h-4 text-theme-light-gray" /> {profFiltersT('status')}</Label>
                                <Select canClear defaultValue={getValues('status')} {...register('status')} reset={resetSelectValue} options={statusSelect} placeholder='Selecciona un estatus' />
                            </div>

                            <div>
                                <Label key={'department-profesionals'} htmlFor='department' className="flex gap-2" > <Building className="w-4 h-4 text-theme-light-gray" /> {profFiltersT('department')}</Label>
                                <Select canClear defaultValue={getValues('department')} {...register('department')} reset={resetSelectValue} options={departmentSelect} placeholder='Selecciona un departamento' />
                            </div>

                            <div>
                                <Label key={'order-by-createdat-profesionals'} htmlFor='orderBy' className="flex items-center gap-2" > <ListOrdered className="w-4 h-4 text-theme-light-gray" />  {profFiltersT('orderByCreatedAt')}</Label>
                                <Select canClear defaultValue={getValues('orderByCreatedAt')} {...register('orderByCreatedAt')} reset={resetSelectValue} options={orderOptions} placeholder='Selecciona un orden' />
                            </div>
                            <div>
                                <Label key={'order-by-speciality-profesionals'} htmlFor='orderBySpeciality' className="flex items-center gap-2" > <ListOrdered className="w-4 h-4 text-theme-light-gray" />  {profFiltersT('orderBySpeciality')}</Label>
                                <Select canClear defaultValue={getValues('orderBySpeciality')} {...register('orderBySpeciality')} reset={resetSelectValue} options={orderOptions} placeholder='Selecciona un orden' />
                            </div>
                            <div>
                                <Label key={'order-by-status-profesionals'} htmlFor='orderByStatus' className="flex items-center gap-2" > <ListOrdered className="w-4 h-4 text-theme-light-gray" />  {profFiltersT('orderByStatus')}</Label>
                                <Select canClear defaultValue={getValues('orderByStatus')} {...register('orderByStatus')} reset={resetSelectValue} options={orderOptions} placeholder='Selecciona un orden' />
                            </div>


                        </div>


                        {/* BOTÓN SUBMIT */}
                        <div className="flex gap-2 justify-end mt-5">
                            <button type="button" onClick={() => { resetSelectFn(); reset(); resetDataTable(); }} className="flex items-center gap-1 py-2 px-3 rounded-lg text-theme-light font-semibold bg-error dark:bg-error-dark"> <Delete className="w-4 h-4" /> {commonT('removeFilters')}</button>
                            <button type="submit" className="flex items-center gap-1 py-2 px-3 rounded-lg text-theme-light font-semibold bg-brand dark:bg-brand-dark"> <Filter className="w-4 h-4" /> {commonT('filter')}</button>
                        </div>
                    </Form>

                </Collapse>
            </section>
        </>
    )
}