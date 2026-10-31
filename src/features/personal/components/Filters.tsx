'use client'
import { HEADQUARTERS_DATA, STATUS_PERSONAL_ARRAY } from "@/utils/constants";
import Collapse from "@/components/ui/collapse/Collapse";
import Form from "@/components/form/Form";
import Label from "@/components/form/Label";
import Input from "@/components/form/input/InputField";
import Select from "@/components/form/select/Select";
import { FilterData, FilterInput, filterPersonalSchema, filtersPersonalDefault } from "../schemas/formFiltersSchema";
import { Activity, Briefcase, Building, Delete, Filter, ListOrdered, Search, Stethoscope } from 'lucide-react';
import { FormState, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSelect } from "@/hooks/useSelelct";
import { useState, useMemo, useEffect } from "react";
import type { Personal, Speciality } from "@/types/dataTypes";
import useSystemTraslations from "@/hooks/useSysteTranslations";
import { useHeadquarterStore } from "@/store/useHeadquarterStore";



interface Props {
    dataQuery: Personal[];
    updateDataFn: (data: Personal[]) => void;

}

export default function FiltersPersonal({ dataQuery, updateDataFn }: Props) {

    const { commonT, specialityT, statusT, departmentT, formInputsT, servicesT } = useSystemTraslations();
    const { currentHeadquarter } = useHeadquarterStore();

    const orderOptions = useMemo(() => [
        { value: 'asc', label: commonT('asc') },
        { value: 'desc', label: commonT('desc') },
    ], [commonT]);

    // HOOKS
    const { resetSelectValue, resetSelectFn } = useSelect();
    const initialFilters = { ...filtersPersonalDefault, headquarters: currentHeadquarter?.id };
    const [filtersSelected, setFiltersSelected] = useState<FilterData>(initialFilters as FilterData);
    const [departmentSpecialitiesSelect, setDepartmentSpecialitiesSelect] = useState<Speciality[]>([]);

    // HOOK FORM -ZOD
    const { register, handleSubmit, reset, getValues, watch, subscribe, setValue } = useForm<FilterInput, any, FilterData>({
        resolver: zodResolver(filterPersonalSchema),
        defaultValues: initialFilters
    });
    const selectedHeadquartersId = watch('headquarters') || currentHeadquarter?.id;
    const selectedHeadquarters = HEADQUARTERS_DATA.find((item) => item.id === selectedHeadquartersId) ?? currentHeadquarter;

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
            const locationAssignments = p.locationAssignments.filter((assignment) => assignment.headquartersId === filterValues.headquarters);
            if (locationAssignments.length === 0) return false;

            // La especialidad y el departamento se filtran desde la sede seleccionada.
            const matchingAssignment = locationAssignments.some((assignment) => {
                const matchesSpeciality = filterValues.speciality === 'all' || assignment.speciality === filterValues.speciality;
                const matchesDepartment = filterValues.department === 'all'
                    || (filterValues.department === 'no_department' ? !assignment.departmentId : assignment.departmentId === filterValues.department);
                return matchesSpeciality && matchesDepartment;
            });
            if (!matchingAssignment) return false;

            // 3. Filtro por Estatus
            if (filterValues.status !== 'all') {
                if (p.status !== filterValues.status) return false;
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
                const specA = a.locationAssignments.find((assignment) => assignment.headquartersId === filterValues.headquarters)?.speciality || '';
                const specB = b.locationAssignments.find((assignment) => assignment.headquartersId === filterValues.headquarters)?.speciality || '';
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
    const [specialitySelect, statusSelect, headquartersSelect, departmentSelect, servicesSelect] = useMemo(() => {

        let specialitiesHead = currentHeadquarter && currentHeadquarter?.specialities.length > 0 ? currentHeadquarter.specialities : []; // revisa si la se actual tiene especialidades
        let deptosHead = currentHeadquarter && currentHeadquarter?.departments.length > 0 ? currentHeadquarter.departments : []; // revisa si la se actual tiene especialidades
        let servicesHead = currentHeadquarter && currentHeadquarter?.services.length > 0 ? currentHeadquarter.services : []; // revisa si la se actual tiene especialidades


        const specialitySelect = specialitiesHead.length > 0
            ? [
                specialitiesHead.map(s => ({ value: s, label: specialityT(s) })),
                { value: 'all', label: commonT('all') }
            ] : [];

        const statusSelect = [...STATUS_PERSONAL_ARRAY.map((item) => ({
            value: item,
            label: statusT(item),
        })), { value: 'all', label: commonT('all') }];

        const headquartersSelect = HEADQUARTERS_DATA.map((item) => ({
            value: item.id,
            label: item.name,
        }));

        const departmentSelect = deptosHead.length > 0
            ? [
                deptosHead.map(s => ({ value: s.value, label: departmentT(s.value) })),
                { value: 'no_department', label: departmentT('no_department') },
                { value: 'all', label: commonT('all') },
            ] : [];

        const servicesSelect = servicesHead.length > 0
            ? [
                ...servicesHead.map(s => ({ value: s, label: servicesT(s) })),
                { value: 'all', label: commonT('all') },
            ] : [];

        return [specialitySelect, statusSelect, headquartersSelect, departmentSelect, servicesSelect];

    }, [selectedHeadquarters, currentHeadquarter]);


    const getSpecialitiesDepto = (deptoName: string) => {
        if (deptoName == 'all') return [];

        const depto = currentHeadquarter?.departments.find((depto) => depto.value == deptoName);
        if (!depto) return [];

        return setDepartmentSpecialitiesSelect(depto.specialities);
    }

    useEffect(() => {
        const unsubscribe = subscribe({
            formState: {
                values: true,  // ← SIN ESTO NO REACCIONA A CAMBIOS DE VALOR
            },
            callback: ({ values, name }) => {
                console.log(values, name) // ✅ ahora sí funciona
            },
        })
        return unsubscribe
    }, [subscribe])



    const InfoCurrentFilters = () => (
        <>
            <div className="flex flex-wrap gap-5 text-[10px]! justify-center">
                {
                    filtersSelected.name !== '' && (
                        <div className="flex gap-1.5 items-center">
                            <p className="text-brand-dark dark:text-light font-bold">{formInputsT('name')}:</p>
                            <p className="bg-brand/10 text-brand-dark dark:bg-brand-dark/25 dark:text-brand-light border border-brand/20 dark:border-brand-dark/40 font-medium px-1 py-0.5 rounded-lg h-fit w-fit">{filtersSelected.name}</p>
                        </div>
                    )
                }
                <div className="flex gap-2 items-center">
                    <p className="text-brand-dark dark:text-light font-bold" >{formInputsT('speciality')}:</p>
                    <p className="bg-brand/10 text-brand-dark dark:bg-brand-dark/25 dark:text-brand-light border border-brand/20 dark:border-brand-dark/40 font-medium px-1 py-0.5 rounded-lg h-fit w-fit">{specialityT(filtersSelected.speciality)}</p>
                </div>
                <div className="flex gap-2 items-center">
                    <p className="text-brand-dark dark:text-light font-bold">{formInputsT('department')}:</p>
                    <p className="bg-brand/10 text-brand-dark dark:bg-brand-dark/25 dark:text-brand-light border border-brand/20 dark:border-brand-dark/40 font-medium px-1 py-0.5 rounded-lg h-fit w-fit">{filtersSelected.department === 'all' ? commonT('all') : filtersSelected.department === 'no_department' ? departmentT('no_department') : selectedHeadquarters?.departments.find(({ id }) => id === filtersSelected.department)?.value ? departmentT(selectedHeadquarters.departments.find(({ id }) => id === filtersSelected.department)!.value) : filtersSelected.department}</p>
                </div>
                <div className="flex gap-2 items-center">
                    <p className="text-brand-dark dark:text-light font-bold">{formInputsT('status')}:</p>
                    <p className="bg-brand/10 text-brand-dark dark:bg-brand-dark/25 dark:text-brand-light border border-brand/20 dark:border-brand-dark/40 font-medium px-1 py-0.5 rounded-lg h-fit w-fit">{statusT(filtersSelected.status)}</p>
                </div>
                <div className="flex gap-2 items-center">
                    <p className="text-brand-dark dark:text-light font-bold">{formInputsT('headquarters')}:</p>
                    <p className="bg-brand/10 text-brand-dark dark:bg-brand-dark/25 dark:text-brand-light border border-brand/20 dark:border-brand-dark/40 font-medium px-1 py-0.5 rounded-lg h-fit w-fit">
                        {HEADQUARTERS_DATA.find((item) => item.id === filtersSelected.headquarters)?.name ?? currentHeadquarter?.name}
                    </p>
                </div>
                <div className="flex gap-2 items-center">
                    <p className="text-brand-dark dark:text-light font-bold">{formInputsT('orderByCreatedAt')}:</p>
                    <p className="bg-brand/10 text-brand-dark dark:bg-brand-dark/25 dark:text-brand-light border border-brand/20 dark:border-brand-dark/40 font-medium px-1 py-0.5 rounded-lg h-fit w-fit">{commonT(filtersSelected.orderByCreatedAt)}</p>
                </div>
                <div className="flex gap-2 items-center">
                    <p className="text-brand-dark dark:text-light font-bold">{formInputsT('orderBySpeciality')}:</p>
                    <p className="bg-brand/10 text-brand-dark dark:bg-brand-dark/25 dark:text-brand-light border border-brand/20 dark:border-brand-dark/40 font-medium px-1 py-0.5 rounded-lg h-fit w-fit">{commonT(filtersSelected.orderBySpeciality)}</p>
                </div>
                <div className="flex gap-2 items-center">
                    <p className="text-brand-dark dark:text-light font-bold">{formInputsT('orderByStatus')}:</p>
                    <p className="bg-brand/10 text-brand-dark dark:bg-brand-dark/25 dark:text-brand-light border border-brand/20 dark:border-brand-dark/40 font-medium px-1 py-0.5 rounded-lg h-fit w-fit">{commonT(filtersSelected.orderByStatus)}</p>
                </div>
            </div>

        </>
    );


    return (
        <>
            <section className="mt-10 mb-6 ">
                <Collapse title={commonT('filters')} positionOpenBtn="left" defaultOpen={false} contentHeader={<InfoCurrentFilters />} >
                    <Form onSubmit={handleSubmit(onHandleFilters)} key={'personal-filters'} className="mt-5">

                        <div className=" pb-5 border-b border-gray-light dark:border-gray-light/30">

                            <Label key={'name-personal'} htmlFor='name' className="flex gap-2" > <Search className="w-4 h-4 text-theme-light-gray" /> {formInputsT('searchByName')}</Label>
                            <Input type="text" {...register('name')} className="max-w-55" id={`name-personal`} placeholder={formInputsT('searchByName')} />
                        </div>

                        {/* OTROS FILTROS */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mt-10 mb-5">

                            <div>
                                <Label key={'headquarters-personal'} htmlFor='headquarters' className="flex gap-2" > <Building className="w-4 h-4 text-theme-light-gray" /> {formInputsT('headquarters')}</Label>
                                <Select canClear defaultValue={getValues('headquarters')} {...register('headquarters')} onChange={(event) => { register('headquarters').onChange(event); setValue('speciality', 'all'); setValue('department', 'all'); }} reset={resetSelectValue} options={headquartersSelect} placeholder='Selecciona una sede' />
                            </div>

                            <div>
                                <Label key={'services-personal'} htmlFor='services' className="flex gap-2" > <Briefcase className="w-4 h-4 text-theme-light-gray" /> {commonT('services')}</Label>
                                <Select canClear defaultValue={getValues('services')} {...register('services')} reset={resetSelectValue} options={servicesSelect as { value: string; label: string }[]} placeholder='Selecciona un servicio' />
                            </div>
                            <div>
                                <Label key={'speciality-personal'} htmlFor='speciality' className="flex gap-2" > <Stethoscope className="w-4 h-4 text-theme-light-gray" /> {formInputsT('specialityHeadquarter')}</Label>
                                {
                                    specialitySelect.length > 0
                                        ? <Select canClear defaultValue={getValues('speciality')} {...register('speciality')} reset={resetSelectValue} options={specialitySelect as { value: string; label: string }[]} placeholder='Selecciona una especialidad' />
                                        : <p className="font-light text-xs text-brand-dark dark:text-brand-light">No hay especialidades disponibles para esta sede</p>
                                }
                            </div>

                            {
                                departmentSpecialitiesSelect.length > 0 &&
                                < div >
                                    <Label key={'speciality-personal-depto'} htmlFor='specialityForDepto' className="flex gap-2" > <Stethoscope className="w-4 h-4 text-theme-light-gray" /> {formInputsT('specialitiesForDepto')}</Label>
                                    {
                                        specialitySelect.length > 0
                                            ? <Select canClear defaultValue={getValues('speciality')} {...register('speciality')} reset={resetSelectValue} options={specialitySelect as { value: string; label: string }[]} placeholder='Selecciona una especialidad' />
                                            : <p className="font-light text-xs text-brand-dark dark:text-brand-light">No hay especialidades disponibles para esta sede</p>
                                    }
                                </div>
                            }



                            <div>
                                <Label key={'status-personal'} htmlFor='status' className="flex gap-2" > <Activity className="w-4 h-4 text-theme-light-gray" /> {formInputsT('status')}</Label>
                                <Select canClear defaultValue={getValues('status')} {...register('status')} reset={resetSelectValue} options={statusSelect} placeholder='Selecciona un estatus' />
                            </div>



                            <div>
                                <Label key={'department-personal'} htmlFor='department' className="flex gap-2" > <Building className="w-4 h-4 text-theme-light-gray" /> {formInputsT('department')}</Label>
                                {
                                    departmentSelect.length > 0
                                        ? <Select canClear defaultValue={getValues('department')} {...register('department')} reset={resetSelectValue} options={departmentSelect as { value: string; label: string }[]} placeholder='Selecciona un departamento' />
                                        : <p className="font-light text-xs text-brand-dark dark:text-brand-light">No hay departamentos disponibles para esta sede</p>
                                }

                            </div>

                            <div>
                                <Label key={'order-by-createdat-personal'} htmlFor='orderBy' className="flex items-center gap-2" > <ListOrdered className="w-4 h-4 text-theme-light-gray" />  {formInputsT('orderByCreatedAt')}</Label>
                                <Select canClear defaultValue={getValues('orderByCreatedAt')} {...register('orderByCreatedAt')} reset={resetSelectValue} options={orderOptions} placeholder='Selecciona un orden' />
                            </div>
                            <div>
                                <Label key={'order-by-speciality-personal'} htmlFor='orderBySpeciality' className="flex items-center gap-2" > <ListOrdered className="w-4 h-4 text-theme-light-gray" />  {formInputsT('orderBySpeciality')}</Label>
                                <Select canClear defaultValue={getValues('orderBySpeciality')} {...register('orderBySpeciality')} reset={resetSelectValue} options={orderOptions} placeholder='Selecciona un orden' />
                            </div>
                            <div>
                                <Label key={'order-by-status-personal'} htmlFor='orderByStatus' className="flex items-center gap-2" > <ListOrdered className="w-4 h-4 text-theme-light-gray" />  {formInputsT('orderByStatus')}</Label>
                                <Select canClear defaultValue={getValues('orderByStatus')} {...register('orderByStatus')} reset={resetSelectValue} options={orderOptions} placeholder='Selecciona un orden' />
                            </div>


                        </div>


                        {/* BOTÓN SUBMIT */}
                        <div className="flex gap-2 justify-end mt-5">
                            <button type="button" onClick={() => { resetSelectFn(); reset(); resetDataTable(); }} className="flex items-center gap-1 py-2 px-3 rounded-lg text-theme-light font-semibold bg-error dark:bg-error-dark"> <Delete className="w-4 h-4" /> {commonT('removeFilters')}</button>
                            <button type="submit" className="flex items-center gap-1 py-2 px-3 rounded-lg text-theme-light font-semibold bg-brand dark:bg-brand-dark"> <Filter className="w-4 h-4" /> {commonT('filter')}</button>
                        </div>
                    </Form>

                </Collapse >
            </section >
        </>
    )
}

