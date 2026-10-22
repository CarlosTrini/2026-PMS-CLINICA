'use client'
import { useTranslations } from "next-intl";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "@/components/ui/table";
import Tooltip from "@/components/ui/tooltip/Tooltip";
import { DEPARTMENT_ARRAY, PROFESIONALS_DATA, SPECIALTY_ARRAY, STATUS_PROFESSIONAL_ARRAY } from "@/utils/datadummy";
import { Activity, Building, Delete, Eye, Filter, ListOrdered, Mail, Phone, Search, Stethoscope, Trash2 } from 'lucide-react';
import Image from "next/image";
import { useMemo, useState } from "react";
import Badge from "@/components/ui/badge/Badge";
import { STATUS_COLOR_LIGHT } from "@/utils/statusColors";
import { simpleDate } from "@/utils/dates";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import Collapse from "@/components/ui/collapse/Collapse";
import Form from "@/components/form/Form";
import Label from "@/components/form/Label";
import Input from "@/components/form/input/InputField";
import Select from "@/components/form/select/Select";
import { Modal } from "@/components/ui/modal";
import Button from "@/components/ui/button/Button";
import { useModal } from "@/hooks/useModal";
import { useSelect } from "@/hooks/useSelelct";
import Metrics from "./components/Metrics";
//SCHEMAS
import { FilterData, filterProfesionalsSchema } from "./schemas/formFilters";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";


const orderOptions = [
    { value: 'asc', label: 'Ascendente' },
    { value: 'desc', label: 'Descendente' },
]



export default function Profesionals() {

    // TRADUCCIONES
    const ct = useTranslations("common");
    const t = useTranslations("pages.profesionals");
    const st = useTranslations("specialty");
    const statust = useTranslations("all_status");
    const dt = useTranslations("deparments");

    // HOOKS
    const { isOpen, openModal, closeModal } = useModal();
    const { resetSelectValue, resetSelectFn } = useSelect();

    // HOOK FORM -ZOD
    const { register, handleSubmit, reset, formState: { errors }, } = useForm<FilterData>({
        resolver: zodResolver(filterProfesionalsSchema),
        defaultValues: {
            name: '',
            specialty: 'all',
            status: 'all',
            department: 'all',
            orderByCreatedAt: 'asc',
            orderBySpecialty: 'asc',
            orderByStatus: 'asc',
        }
    });

    const onSubmit = async (data: FilterData) => {

        console.log(data);
    };

    // LISTAS DE SELECTS
    const [specialtySelect, statusSelect, departmentSelect] = useMemo(() => {
        const specialtySelect = [...SPECIALTY_ARRAY.map((item) => ({
            value: item,
            label: st(item),
        })), { value: 'all', label: ct('all') }];
        const statusSelect = [...STATUS_PROFESSIONAL_ARRAY.map((item) => ({
            value: item,
            label: statust(item),
        })), { value: 'all', label: ct('all') }];
        const departmentSelect = [...DEPARTMENT_ARRAY.map((item) => ({
            value: item,
            label: dt(item),
        })), { value: 'all', label: ct('all') }];
        return [specialtySelect, statusSelect, departmentSelect];
    }, [SPECIALTY_ARRAY, STATUS_PROFESSIONAL_ARRAY, DEPARTMENT_ARRAY]);



    const handleSave = () => {
        closeModal();
    };

    const [copyTxt, setCopyTxt] = useState('Copiar');
    const copyData = async <T,>(value: T): Promise<void> => {
        try {
            const textToCopy = typeof value === 'object' && value !== null
                ? JSON.stringify(value, null, 2)
                : String(value);

            setCopyTxt('¡Copíado!');
            await navigator.clipboard.writeText(textToCopy);
            setTimeout(() => {
                setCopyTxt('Copiar');
            }, 500);
        } catch (error) {
            console.error('Error al copiar al portapapeles:', error);
        }
    };
    const PhoneAction = ({ phone }: { phone: string }) => {
        if (!phone) return <></>
        return (
            <>
                <div className="grid grid-cols-1 w-full gap-1 ">
                    <button className="flex items-center text-xs gap-2 justify-center p-2 rounded-md  text-light" onClick={() => { copyData(phone); }}>
                        {copyTxt} Teléfono
                    </button>
                    <a
                        className="flex items-center gap-2 justify-center p-2 rounded-md  bg-primary text-light"
                        href={`tel:${phone}`}
                        aria-label="Llamar al teléfono de atención"
                    >
                        <p className="text-theme-xs"> Llamar</p>
                    </a>
                </div>
            </>
        );
    };

    return (
        <>
            <PageBreadcrumb pageTitle="Administración de Personal" />


            {/* CARDS SECTION */}
            <Metrics />

            {/* FILTROS */}
            <section className="my-10 ">
                <Collapse title="Filtros" positionOpenBtn="left" defaultOpen={true}>
                    <Form onSubmit={handleSubmit(onSubmit)} key={'professional-filters'} className="mt-5">

                        <div className=" pb-5 border-b border-gray-light dark:border-gray-light/30">

                            <Label key={'name-profesionals'} htmlFor='name' className="flex gap-2" > <Search className="w-4 h-4 text-theme-light-gray" /> Buscar por Nombre</Label>
                            <Input type="text" {...register('name')} className="max-w-55" id={`name-profesionals`} placeholder="Buscar por Nombre" />
                        </div>

                        {/* OTROS FILTROS */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mt-10 mb-5">
                            <div>
                                <Label key={'specialty-profesionals'} htmlFor='specialty' className="flex gap-2" > <Stethoscope className="w-4 h-4 text-theme-light-gray" /> Especialidad</Label>
                                <Select canClear defaultValue="all" {...register('specialty')} reset={resetSelectValue} options={specialtySelect} placeholder='Selecciona una especialidad' />
                            </div>

                            <div>
                                <Label key={'status-profesionals'} htmlFor='status' className="flex gap-2" > <Activity className="w-4 h-4 text-theme-light-gray" /> Estatus</Label>
                                <Select canClear defaultValue="all" {...register('status')} reset={resetSelectValue} options={statusSelect} placeholder='Selecciona un estatus' />
                            </div>

                            <div>
                                <Label key={'department-profesionals'} htmlFor='department' className="flex gap-2" > <Building className="w-4 h-4 text-theme-light-gray" /> Departamento</Label>
                                <Select canClear defaultValue="all" {...register('department')} reset={resetSelectValue} options={departmentSelect} placeholder='Selecciona un departamento' />
                            </div>

                            <div>
                                <Label key={'order-by-createdat-profesionals'} htmlFor='orderBy' className="flex items-center gap-2" > <ListOrdered className="w-4 h-4 text-theme-light-gray" />  Ordenar por Fecha <span className="text-[10px]">(A-Z, Z-A)</span></Label>
                                <Select canClear defaultValue="asc" {...register('orderByCreatedAt')} reset={resetSelectValue} options={orderOptions} placeholder='Selecciona un orden' />
                            </div>
                            <div>
                                <Label key={'order-by-specialty-profesionals'} htmlFor='orderBySpecialty' className="flex items-center gap-2" > <ListOrdered className="w-4 h-4 text-theme-light-gray" />  Ordenar por Especialidad <span className="text-[10px]">(A-Z, Z-A)</span></Label>
                                <Select canClear defaultValue="asc" {...register('orderBySpecialty')} reset={resetSelectValue} options={orderOptions} placeholder='Selecciona un orden' />
                            </div>
                            <div>
                                <Label key={'order-by-status-profesionals'} htmlFor='orderByStatus' className="flex items-center gap-2" > <ListOrdered className="w-4 h-4 text-theme-light-gray" />  Ordenar por Estatus <span className="text-[10px]">(A-Z, Z-A)</span></Label>
                                <Select canClear defaultValue="asc" {...register('orderByStatus')} reset={resetSelectValue} options={orderOptions} placeholder='Selecciona un orden' />
                            </div>


                        </div>


                        {/* BOTÓN SUBMIT */}
                        <div className="flex gap-2 justify-end mt-5">
                            <button type="button" onClick={() => { resetSelectFn(); reset(); }} className="flex items-center gap-1 py-2 px-3 rounded-lg text-theme-light font-semibold bg-error dark:bg-error-dark"> <Delete className="w-4 h-4" /> Quitar Filtros</button>
                            <button type="submit" className="flex items-center gap-1 py-2 px-3 rounded-lg text-theme-light font-semibold bg-brand dark:bg-brand-dark"> <Filter className="w-4 h-4" /> Filtrar</button>
                        </div>
                    </Form>

                </Collapse>
            </section>

            {/* TABLA */}
            <section className="mt-10 w-full min-w-0 ">
                <div className="w-full h-full max-h-[65vh]  min-w-0 overflow-auto rounded-lg generic-border-shadow bg-theme-light-dark">
                    <Table className="w-400 md:w-450 lg:w-310" key={'personal-table'}>
                        <TableHeader className="sticky top-0 border-b z-50 bg-brand dark:bg-brand-dark border-gray/20 dark:border-gray/40">
                            <TableRow>
                                <TableCell isHeader><p className="generic-header-table">ID</p></TableCell>
                                <TableCell isHeader><p className="generic-header-table">{t("table.name")}</p></TableCell>
                                <TableCell isHeader><p className="generic-header-table">{t("table.especiality")}</p></TableCell>
                                <TableCell isHeader><p className="generic-header-table">{t("table.department")}</p></TableCell>
                                <TableCell isHeader><p className="generic-header-table">{t("table.contact")}</p></TableCell>
                                <TableCell isHeader><p className="generic-header-table">{t("table.status")}</p></TableCell>
                                <TableCell isHeader><p className="generic-header-table">{t("table.createdAt")}</p></TableCell>
                                <TableCell isHeader><p className="generic-header-table">{t("table.actions")}</p></TableCell>
                            </TableRow>
                        </TableHeader>
                        <TableBody className="divide-y divide-gray/10 dark:divide-gray/30 text-theme-light-gray">
                            {
                                PROFESIONALS_DATA.map(p => (
                                    <TableRow key={p.id} className="transition-colors hover:bg-gray/5 dark:hover:bg-gray-light/5">
                                        <TableCell className="p-3 whitespace-nowrap">

                                            <Tooltip content={
                                                <>
                                                    <button className="p-2 rounded-md text-xs text-light" onClick={() => { copyData(p.id); }}>
                                                        {copyTxt}
                                                    </button>
                                                </>}
                                                position="top-right" trigger="click">
                                                <p className="text-sm  cursor-pointer">{p.id.slice(0, 6) + '...'}</p>
                                            </Tooltip>

                                        </TableCell>
                                        <TableCell className="p-3 whitespace-nowrap ">
                                            <div className="flex items-center gap-2">
                                                <figure>
                                                    <Image src={p.image} alt={p.personalInfo.name} width={25} height={25} className="rounded-full" />
                                                </figure>
                                                <div className="flex flex-col">
                                                    <p className="text-gray dark:text-gray-light text-sm font-bold">{p.personalInfo.name} {p.personalInfo.lastName}</p>
                                                    <p className="text-sm italic text-gray/50 dark:text-gray-light/50">{p.contactInfo.city} - {p.contactInfo.state}</p>
                                                    <p className="text-sm italic text-gray/50 dark:text-gray-light/50">Role: {p.role}</p>
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell className="p-3">
                                            {
                                                p.profesionalInfo[0] && (
                                                    <>
                                                        <div className="flex items-center gap-2">
                                                            {
                                                                p?.profesionalInfo.length > 1 && (
                                                                    <Tooltip content={`${p.profesionalInfo.length} especialidades más`}>
                                                                        <button className="p-1 rounded-md text-xs flex gap-1 items-center bg-brand-light/60 dark:bg-gray" onClick={() => { }}>
                                                                            <Eye className="w-3 h-3 text-brand-dark dark:text-light" />
                                                                        </button>
                                                                    </Tooltip>

                                                                )
                                                            }
                                                            <p className="text-xs font-bold uppercase text-gray dark:text-gray-light">{st(p.profesionalInfo[0].specialty)}</p>

                                                        </div>
                                                        <p className="text-xs italic text-gray/50 dark:text-gray-light/50">Ced: {p.profesionalInfo[0].cedula}</p>
                                                        <p className="text-xs italic text-gray/50 dark:text-gray-light/50">Lic: {p.profesionalInfo[0].license}</p>
                                                    </>
                                                )

                                            }



                                        </TableCell>
                                        <TableCell className="p-3">
                                            <p className="text-xs font-bold uppercase text-gray dark:text-gray-light">
                                                {p.department ? dt(p.department) : <span className="text-error dark:text-error-dark"> Sin departamento</span>}
                                            </p>
                                        </TableCell>
                                        <TableCell className="p-3">
                                            <div className="flex items-center gap-1">

                                                <Tooltip content={
                                                    <>
                                                        <button className="p-2 rounded-md text-xs text-light" onClick={() => { copyData(p.contactInfo.email); }}>
                                                            {copyTxt} correo
                                                        </button>
                                                    </>}
                                                    position="top-right" trigger="hover">
                                                    <Mail className=" cursor-pointer w-3.5 h-3.5 text-brand-dark dark:text-brand" />
                                                </Tooltip>
                                                <p className="flex items-baseline gap-2 w-fit pt-1 text-sm text-gray dark:text-gray-light">
                                                    {p.contactInfo.email}
                                                </p>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <Tooltip content={<PhoneAction phone={p?.contactInfo?.phone ? p.contactInfo.phone : ""} />}
                                                    position="top-right" trigger="hover">
                                                    <Phone className=" cursor-pointer w-3.5 h-3.5 text-success" />
                                                </Tooltip>
                                                <p className=" flex items-baseline gap-2 w-fit pt-1 text-sm text-gray dark:text-gray-light">
                                                    {p.contactInfo.phone}
                                                </p>
                                            </div>

                                        </TableCell>
                                        <TableCell className="p-3">
                                            <Badge variantColor={`${STATUS_COLOR_LIGHT[p.status]}`} size="md" >
                                                {statust(`${p.status}`)}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="p-3">
                                            <p className="text-sm text-gray dark:text-gray-light">{simpleDate(p.createdAt)}</p>
                                        </TableCell>
                                        <TableCell className="p-3 ">
                                            <div className="flex gap-2 items-center">

                                                <button className="p-1 rounded-md bg-brand dark:bg-brand-dark hover:bg-brand/60 dark:hover:bg-brand-dark/70 text-light" onClick={() => { openModal() }}><Eye className="w-4 h-4 " /></button>

                                                <Tooltip content={<>
                                                    <div className="p-2.5  bg-error-dark/60 ">
                                                        <p className="text-xs  text-theme-light">¿Estas seguro que deseas dar de baja a: <span className="font-bold italic">{p.personalInfo.name + " " + p.personalInfo.lastName}</span> ?</p>
                                                        <p className="text-xs mt-1  text-theme-light italic">(Esta acción no se puede deshacer)</p>
                                                        <button className="p-1 mt-2 text-xs rounded-md bg-error dark:bg-error-dark hover:bg-error/60 dark:hover:bg-error-dark/70 text-gray-light">Eliminar</button>
                                                    </div>
                                                </>}
                                                    position="left"
                                                    trigger="click"
                                                >

                                                    <button className="p-1 rounded-md bg-error dark:bg-error-dark hover:bg-error/60 dark:hover:bg-error-dark/70 text-gray-light"><Trash2 className="w-4 h-4 " /></button>
                                                </Tooltip>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                )

                                )
                            }
                        </TableBody>

                    </Table>

                </div>

            </section>



            <Modal
                isOpen={isOpen}
                onClose={closeModal}
                isFullscreen={false}
                className="w-[80%]! md:w-[60%]! lg:max-w-150 p-5"
            >
                <h4 className="mb-7 text-title-sm font-semibold text-gray-800 dark:text-light-accent/90">
                    Modal Heading
                </h4>
                <p className="text-sm leading-6 text-gray-500 dark:text-gray-400">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Pellentesque euismod est quis mauris lacinia pharetra. Sed a ligula
                    ac odio condimentum aliquet a nec nulla. Aliquam bibendum ex sit
                    amet ipsum rutrum feugiat ultrices enim quam.
                </p>
                <p className="mt-5 text-sm leading-6 text-gray-500 dark:text-gray-400">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Pellentesque euismod est quis mauris lacinia pharetra. Sed a ligula
                    ac odio.
                </p>
                <div className="mt-8 flex w-full items-center justify-end gap-3">
                    <Button size="sm" variant="outline" onClick={() => {
                        closeModal();
                    }}>
                        Close
                    </Button>
                    <Button size="sm" onClick={() => {
                        handleSave();
                    }}>
                        Save Changes
                    </Button>
                </div>
            </Modal>

        </>
    );
}
