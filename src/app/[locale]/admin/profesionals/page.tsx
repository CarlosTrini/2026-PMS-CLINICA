'use client'
import { useTranslations } from "next-intl";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "@/components/ui/table";
import Tooltip from "@/components/ui/tooltip/Tooltip";
import { DEPARTMENT_ARRAY, PROFESIONALS_DATA, SPECIALTY_ARRAY, STATUS_PROFESSIONAL_ARRAY } from "@/utils/datadummy";
import { Activity, Building, ChartBar, Delete, Edit2, Edit3, Eye, Filter, ListOrdered, Mail, Phone, Search, Stethoscope, Trash2, User2Icon } from 'lucide-react';
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


const orderOptions = [
    { value: 'asc', label: 'Ascendente' },
    { value: 'desc', label: 'Descendente' },
]


export default function Profesionals() {

    const t = useTranslations("pages.profesionals");
    const st = useTranslations("specialty");
    const statust = useTranslations("all_status");
    const dt = useTranslations("deparments");


    const { isOpen, openModal, closeModal } = useModal();
    const { resetSelectValue, resetSelectFn } = useSelect();




    const [specialtySelect, statusSelect, departmentSelect] = useMemo(() => {
        const specialtySelect = SPECIALTY_ARRAY.map((item) => ({
            value: item,
            label: st(item),
        }));
        const statusSelect = STATUS_PROFESSIONAL_ARRAY.map((item) => ({
            value: item,
            label: statust(item),
        }));
        const departmentSelect = DEPARTMENT_ARRAY.map((item) => ({
            value: item,
            label: dt(item),
        }));
        return [specialtySelect, statusSelect, departmentSelect];
    }, [SPECIALTY_ARRAY, STATUS_PROFESSIONAL_ARRAY, DEPARTMENT_ARRAY]);



    const handleSave = () => {
        // Handle save logic here
        console.log("Saving changes...");
        closeModal();
    };


    // TODO: ESTA DATA VENDRÁ DE BASE DE DATOS, USAR CUANDO SE HAGA LA MIGRACIÓN
    // Métricas calculadas dinámicamente
    const totalStaff = PROFESIONALS_DATA.length;
    const activeCount = PROFESIONALS_DATA.filter(p => p.status === 'active').length;
    const inactiveCount = PROFESIONALS_DATA.filter(p => p.status === 'inactive').length;
    const onBreakCount = PROFESIONALS_DATA.filter(p => p.status === 'on_break').length;
    const inConsultationCount = PROFESIONALS_DATA.filter(p => p.status === 'in_consultation').length;
    const onVacationCount = PROFESIONALS_DATA.filter(p => p.status === 'on_vacation').length;

    // Total de especialidades únicas cubiertas en el equipo
    const totalSpecialties = new Set(
        PROFESIONALS_DATA.flatMap(p => p.profesionalInfo.map(info => info.specialty))
    ).size;

    // Porcentaje de personal operativo (activos + en consulta)
    const operationalPercent = totalStaff > 0
        ? Math.round(((inConsultationCount) / totalStaff) * 100)
        : 0;

    const [copyTxt, setCopyTxt] = useState('Copiar');
    const copyData = async <T,>(value: T): Promise<void> => {
        try {
            // Si es un objeto/array lo serializamos a JSON, si es primitivo lo convertimos a string
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
            <section className="w-full mx-auto grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-3 md:gap-6 lg:grid-cols-4">
                {/* CARD 1: TOTAL DE PERSONAL */}
                <div className="relative overflow-hidden rounded-2xl p-5 generic-border-shadow transition-all hover:shadow-theme-md sm:p-6 bg-theme-light-dark">
                    {/* Barra de acento */}
                    <div className="absolute top-0 inset-x-0 h-2 bg-brand" />
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-theme-sm font-medium text-theme-light-gray">
                                Total de Personal
                            </p>
                            <h3 className="mt-1 text-title-md font-bold text-gray-dark dark:text-light-accent">
                                {totalStaff}
                            </h3>
                        </div>
                        <div className="flex size-15 items-center justify-center rounded-2xl bg-brand/10 text-brand dark:bg-brand-dark/25 dark:text-brand-light">
                            <User2Icon className="size-8 stroke-2" />
                        </div>
                    </div>

                    <div className="mt-3 flex items-center justify-end">
                        <span className="text-theme-xs text-gray dark:text-gray-light">
                            Registrados
                        </span>
                    </div>
                </div>

                {/* CARD 2: EN CONSULTA Y OPERATIVIDAD */}
                <div className="relative overflow-hidden rounded-2xl p-5 generic-border-shadow transition-all hover:shadow-theme-md sm:p-6 bg-theme-light-dark">
                    {/* Barra de acento */}
                    <div className="absolute top-0 inset-x-0 h-2 bg-blue-light" />
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-theme-sm font-medium text-theme-light-gray">
                                En Consulta
                            </p>
                            <h3 className="mt-1 text-title-md font-bold text-gray-dark dark:text-light-accent">
                                {inConsultationCount}
                            </h3>
                        </div>
                        <div className="flex size-15 items-center justify-center rounded-2xl bg-blue-light/10 text-blue-light dark:bg-blue-light-dark/25 dark:text-blue-light-light">
                            <Activity className="size-8 stroke-2" />
                        </div>
                    </div>

                    <div className="mt-3 flex items-center justify-between">
                        <span className="inline-flex items-center gap-1.5 text-theme-xs text-success font-medium">
                            <span className="size-2 rounded-full bg-success animate-pulse" />
                            Turno activo
                        </span>
                        <span className="text-theme-xs font-semibold text-gray dark:text-gray-light">
                            {operationalPercent}% operativo
                        </span>
                    </div>
                </div>

                {/* CARD 3: ESPECIALIDADES MÉDICAS */}
                <div className="relative overflow-hidden rounded-2xl p-5 generic-border-shadow transition-all hover:shadow-theme-md sm:p-6 bg-theme-light-dark">
                    {/* Barra de acento */}
                    <div className="absolute top-0 inset-x-0 h-2 bg-success" />
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-theme-sm font-medium text-theme-light-gray">
                                Especialidades
                            </p>
                            <h3 className="mt-1 text-title-md font-bold text-gray-dark dark:text-light-accent">
                                {totalSpecialties}
                            </h3>
                        </div>
                        <div className="flex size-15 items-center justify-center rounded-2xl bg-success/10 text-success dark:bg-success-dark/25 dark:text-success-light">
                            <Stethoscope className="size-8 stroke-2" />
                        </div>
                    </div>

                    <div className="mt-3 flex items-center justify-between">
                        <span className="text-theme-xs text-gray dark:text-gray-light">
                            Ramas clínicas cubiertas
                        </span>
                    </div>
                </div>

                {/* CARD 4: ESTATUS */}
                <div className="relative overflow-hidden rounded-2xl p-5 generic-border-shadow transition-all hover:shadow-theme-md sm:p-6 bg-theme-light-dark">
                    {/* Barra de acento */}
                    <div className="absolute top-0 inset-x-0 h-2 bg-warning" />
                    <div className="flex items-center justify-between">
                        <div className="w-full">
                            <p className="text-theme-sm font-medium text-theme-light-gray">
                                Estatus
                            </p>
                            <div className="flex flex-wrap gap-1 mt-2">
                                <Badge color="success" size="sm">
                                    <span>Activos: {activeCount}</span>
                                </Badge>
                                <Badge color="error" size="sm">
                                    <span>Inactivos: {inactiveCount}</span>
                                </Badge>
                                <Badge color="warning" size="sm">
                                    <span>En descanso: {onBreakCount}</span>
                                </Badge>
                                <Badge color="primary" size="sm">
                                    <span>En consulta: {inConsultationCount}</span>
                                </Badge>
                                <Badge color="info" size="sm">
                                    <span>Vacaciones: {onVacationCount}</span>
                                </Badge>
                            </div>
                        </div>
                        <div className="flex size-15 shrink-0 items-center justify-center rounded-2xl bg-warning/10 text-warning dark:bg-warning-dark/25 dark:text-warning-light">
                            <ChartBar className="size-8 stroke-2" />
                        </div>
                    </div>
                </div>


            </section>

            {/* FILTROS */}
            <section className="my-10 ">
                <Collapse title="Filtros" positionOpenBtn="left" defaultOpen={true}>
                    <Form onSubmit={(e) => { console.log(e) }} key={'professional-filters'} className="mt-5">

                        <div className=" pb-5 border-b border-gray-light dark:border-gray-light/30">

                            <Label key={'name-profesionals'} htmlFor='name' className="flex gap-2" > <Search className="w-4 h-4 text-theme-light-gray" /> Buscar por Nombre</Label>
                            <Input type="text" className="max-w-55" id={`name-profesionals`} placeholder="Buscar por Nombre" />
                        </div>

                        {/* OTROS FILTROS */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mt-10 mb-5">
                            <div>
                                <Label key={'specialty-profesionals'} htmlFor='specialty' className="flex gap-2" > <Stethoscope className="w-4 h-4 text-theme-light-gray" /> Especialidad</Label>
                                <Select canClear reset={resetSelectValue} options={specialtySelect} name='specialty' placeholder='Selecciona una especialidad' />
                            </div>

                            <div>
                                <Label key={'status-profesionals'} htmlFor='status' className="flex gap-2" > <Activity className="w-4 h-4 text-theme-light-gray" /> Estatus</Label>
                                <Select canClear reset={resetSelectValue} options={statusSelect} name='status' placeholder='Selecciona un estatus' />
                            </div>

                            <div>
                                <Label key={'department-profesionals'} htmlFor='department' className="flex gap-2" > <Building className="w-4 h-4 text-theme-light-gray" /> Departamento</Label>
                                <Select canClear reset={resetSelectValue} options={departmentSelect} name='department' placeholder='Selecciona un departamento' />
                            </div>

                            <div>
                                <Label key={'order-by-createdat-profesionals'} htmlFor='orderBy' className="flex gap-2" > <ListOrdered className="w-4 h-4 text-theme-light-gray" /> Ordenar por Fecha</Label>
                                <Select canClear reset={resetSelectValue} options={orderOptions} name='orderBy' placeholder='Selecciona un orden' />
                            </div>
                            <div>
                                <Label key={'order-by-specialty-profesionals'} htmlFor='orderBySpecialty' className="flex gap-2" > <ListOrdered className="w-4 h-4 text-theme-light-gray" /> Ordenar por Especialidad</Label>
                                <Select canClear reset={resetSelectValue} options={orderOptions} name='orderBySpecialty' placeholder='Selecciona un orden' />
                            </div>
                            <div>
                                <Label key={'order-by-status-profesionals'} htmlFor='orderByStatus' className="flex gap-2" > <ListOrdered className="w-4 h-4 text-theme-light-gray" /> Ordenar por Estatus</Label>
                                <Select canClear reset={resetSelectValue} options={orderOptions} name='orderByStatus' placeholder='Selecciona un orden' />
                            </div>


                        </div>


                        {/* BOTÓN SUBMIT */}
                        <div className="flex gap-2 justify-end mt-5">
                            <button type="button" onClick={resetSelectFn} className="flex items-center gap-1 py-2 px-3 rounded-lg text-theme-light font-semibold bg-error dark:bg-error-dark"> <Delete className="w-4 h-4" /> Quitar Filtros</button>
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
                                                {p.department ? dt(p.department) : "—"}
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
