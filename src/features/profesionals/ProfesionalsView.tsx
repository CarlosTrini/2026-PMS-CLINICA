'use client'
import { Table, TableBody, TableCell, TableHeader, TableRow } from "@/components/ui/table";
import Tooltip from "@/components/ui/tooltip/Tooltip";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import { STATUS_COLOR_LIGHT } from "@/utils/statusColors";
import Image from "next/image";
import { useEffect, useState } from "react";
import Badge from "@/components/ui/badge/Badge";
import { simpleDate } from "@/utils/dates";
import Metrics from "./components/Metrics";
import { Eye, Mail, Phone, Trash2 } from 'lucide-react';
import Fallback from "@/components/fallbackQuery/Fallback";
import { ProfesionalService } from "./services/service";
import useSystemTraslations from "@/hooks/useSysteTranslations";
import { Professional } from "@/types/dataTypes";
import FiltersProfesionals from "./components/Filters";
import { useModal } from "@/hooks/useModal";



// QUERY
import { useQuery } from "@tanstack/react-query";
import ViewEditProf from "./components/ViewEditProf";


const columns = ['id', 'name', 'speciality', 'department', 'contact', 'status', 'createdAt', 'actions'];



export default function Profesionals() {

    const { profT, commonT, statusT, tableColumnsT, specialityT, departmentT } = useSystemTraslations();

    // HOOKS
    const [dataTable, setDataTable] = useState<Professional[]>([]);
    const [userSelected, setUserSelected] = useState<Professional | null>(null);
    const { isOpen, openModal, closeModal } = useModal(false);



    // QUERY
    const { data: dataQuery, isLoading, error } = useQuery({
        queryKey: ['profesionals'],
        queryFn: () => ProfesionalService.getProfesionales()
    });


    const [copyTxt, setCopyTxt] = useState(commonT("copyToClipboard"));
    const copyData = async <T,>(value: T): Promise<void> => {
        try {
            const textToCopy = typeof value === 'object' && value !== null
                ? JSON.stringify(value, null, 2)
                : String(value);

            setCopyTxt(commonT("copiedToClipboard"));
            await navigator.clipboard.writeText(textToCopy);
            setTimeout(() => {
                setCopyTxt(commonT("copyToClipboard"));
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
                        {copyTxt} {commonT("phone")}
                    </button>
                    <a
                        className="flex items-center gap-2 justify-center p-2 rounded-md  bg-primary text-light"
                        href={`tel:${phone}`}
                        aria-label="Llamar al teléfono de atención"
                    >
                        <p className="text-theme-xs"> {commonT("call")}</p>
                    </a>
                </div>
            </>
        );
    };


    useEffect(() => {
        if (!dataQuery) return;
        setDataTable(dataQuery);
    }, [dataQuery]);


    // agre el modal con la info cunaod está listo el state
    useEffect(() => {
        if (userSelected) {
            openModal();
        }
    }, [userSelected]);

    return (
        <>
            <PageBreadcrumb pageTitle={profT('tittle')} />



            {/* CARDS SECTION */}
            <Metrics />

            {/* FILTROS */}
            <FiltersProfesionals dataQuery={dataQuery as Professional[]} updateDataFn={setDataTable} />


            {/* TABLA */}
            <Fallback
                id='profesionals-table'
                isLoading={isLoading}
                isError={error}
                data={dataTable}
                errorClassName="min-h-[40vh]"
                loadingClassName="min-h-[40vh]"
                noDataPlaceholder={<>
                    <div className="h-[30vh] flex flex-col items-center justify-center gap-2">
                        <figure className="w-15 h-15 overflow-hidden rounded-full">
                            <Image src="/images/no-results.jpg" alt="Empty" width={100} height={100} className="object-cover" />
                        </figure>
                        <p className="font-bold text-lg">No se han encontrado coincidencias</p>
                    </div>
                </>}
            >
                <section className="mt-10 w-full min-w-0 ">
                    <div className="hidden lg:block w-full h-full max-h-[65vh]  min-w-0 overflow-auto rounded-lg generic-border-shadow bg-theme-light-dark">
                        <Table className="w-400 md:w-450 lg:w-310" id={'personal-table'}>
                            <TableHeader className="sticky top-0 border-b z-50 bg-brand dark:bg-brand-dark border-gray/20 dark:border-gray/40">
                                <TableRow>
                                    {columns.map(col => (
                                        <TableCell key={col} isHeader><p className="generic-header-table">{col == 'id' ? commonT(col) : tableColumnsT(`${col}`)}</p></TableCell>
                                    ))}
                                </TableRow>
                            </TableHeader>
                            <TableBody className="divide-y divide-gray/10 dark:divide-gray/30 text-theme-light-gray">
                                {
                                    dataTable.map(p => (
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
                                                                        <Tooltip content={`${p.profesionalInfo.length} ${commonT('specialities')}`}>
                                                                            <button className="p-1 rounded-md text-xs flex gap-1 items-center bg-brand-light/60 dark:bg-gray" onClick={() => { }}>
                                                                                <Eye className="w-3 h-3 text-brand-dark dark:text-light" />
                                                                            </button>
                                                                        </Tooltip>

                                                                    )
                                                                }
                                                                <p className="text-xs font-bold uppercase text-gray dark:text-gray-light">{specialityT(p.profesionalInfo[0].speciality)}</p>

                                                            </div>
                                                            <p className="text-xs italic text-gray/50 dark:text-gray-light/50">Ced: {p.profesionalInfo[0].cedula}</p>
                                                            <p className="text-xs italic text-gray/50 dark:text-gray-light/50">Lic: {p.profesionalInfo[0].license}</p>
                                                        </>
                                                    )

                                                }



                                            </TableCell>
                                            <TableCell className="p-3">
                                                <p className="text-xs font-bold uppercase text-gray dark:text-gray-light">
                                                    {p.department ? (
                                                        departmentT(p.department)
                                                    ) : (
                                                        <span className="text-error dark:text-error-dark"> {departmentT('no_department')}</span>
                                                    )}
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
                                                    {statusT(`${p.status}`)}
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="p-3">
                                                <p className="text-sm text-gray dark:text-gray-light">{simpleDate(p.createdAt)}</p>
                                            </TableCell>
                                            <TableCell className="p-3 ">
                                                <div className="flex gap-2 items-center">

                                                    <button className="p-1 rounded-md bg-brand dark:bg-brand-dark hover:bg-brand/60 dark:hover:bg-brand-dark/70 text-light" onClick={() => { setUserSelected(p); }}><Eye className="w-4 h-4 " /></button>

                                                    <Tooltip content={<>
                                                        <div className="p-2.5  bg-error-dark/60 ">
                                                            <p className="text-xs  text-theme-light">¿{commonT("deleteUser")} <span className="font-bold italic">{p.personalInfo.name + " " + p.personalInfo.lastName}</span> ?</p>
                                                            <p className="text-xs mt-1  text-theme-light italic">({commonT("thisActionCannotBeUndone")})</p>
                                                            <button className="p-1 mt-2 text-xs rounded-md bg-error dark:bg-error-dark hover:bg-error/60 dark:hover:bg-error-dark/70 text-gray-light">{commonT('delete')}</button>
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

                    {/* FROM 0 TO LG BREAKPOINT - TABLE WITH MOBILE VERSION */}
                    <div className="block lg:hidden w-full h-full max-h-[65vh] min-w-0 overflow-auto rounded-lg generic-border-shadow bg-theme-light-dark">
                        <Table className="w-full block divide-y divide-gray/10 dark:divide-gray/30" id={'personal-table-mobile'}>
                            <TableBody className="block divide-y divide-gray/10 dark:divide-gray/30 text-theme-light-gray">
                                {
                                    dataTable.map(p => (
                                        <TableRow key={`mobile-${p.id}`} className="block p-4 border-b-2 border-gray/40 dark:border-gray-light/30 transition-colors hover:bg-gray/5 dark:hover:bg-gray-light/5">
                                            <TableCell className="block p-0 border-none">
                                                {/* ENCABEZADO DE LA CARD: AVATAR, NOMBRE, STATUS Y ACCIONES */}
                                                <div className="flex items-start justify-between gap-3">
                                                    <div className="flex items-center gap-3 min-w-0">
                                                        <figure className="shrink-0">
                                                            <Image
                                                                src={p.image}
                                                                alt={p.personalInfo.name}
                                                                width={36}
                                                                height={36}
                                                                className="rounded-full object-cover"
                                                            />
                                                        </figure>
                                                        <div className="flex flex-col min-w-0">
                                                            <p className="text-gray dark:text-gray-light text-sm font-bold truncate">
                                                                {p.personalInfo.name} {p.personalInfo.lastName}
                                                            </p>
                                                            <span className="text-xs text-gray/60 dark:text-gray-light/60">
                                                                {p.contactInfo.city} - {p.contactInfo.state} &bull; <span className="italic">Role: {p.role}</span>
                                                            </span>
                                                        </div>
                                                    </div>

                                                    <div className="flex items-center gap-2 shrink-0">
                                                        <Badge variantColor={`${STATUS_COLOR_LIGHT[p.status]}`} size="sm">
                                                            {statusT(`${p.status}`)}
                                                        </Badge>
                                                        <button
                                                            type="button"
                                                            className="p-1.5 rounded-md bg-brand dark:bg-brand-dark hover:bg-brand/60 dark:hover:bg-brand-dark/70 text-light transition-colors"
                                                            onClick={() => { setUserSelected(p); }}
                                                            title={commonT("viewMore")}
                                                        >
                                                            <Eye className="w-3.5 h-3.5" />
                                                        </button>
                                                        <Tooltip
                                                            content={
                                                                <div className="p-2.5 bg-error-dark/60">
                                                                    <p className="text-xs text-theme-light">
                                                                        ¿{commonT("deleteUser")}: <span className="font-bold italic">{p.personalInfo.name} {p.personalInfo.lastName}</span>?
                                                                    </p>
                                                                    <p className="text-xs mt-1 text-theme-light italic">({commonT("thisActionCannotBeUndone")})</p>
                                                                    <button type="button" className="p-1 mt-2 text-xs rounded-md bg-error dark:bg-error-dark hover:bg-error/60 dark:hover:bg-error-dark/70 text-gray-light">
                                                                        {commonT("delete")}
                                                                    </button>
                                                                </div>
                                                            }
                                                            position="left"
                                                            trigger="click"
                                                        >
                                                            <button
                                                                type="button"
                                                                className="p-1.5 rounded-md bg-error dark:bg-error-dark hover:bg-error/60 dark:hover:bg-error-dark/70 text-gray-light transition-colors"
                                                                title={commonT("delete")}
                                                            >
                                                                <Trash2 className="w-3.5 h-3.5" />
                                                            </button>
                                                        </Tooltip>
                                                    </div>
                                                </div>

                                                {/* CUERPO: ESPECIALIDAD Y DEPARTAMENTO */}
                                                <div className="grid grid-cols-2 gap-3 mt-3 pt-3 border-t border-gray/10 dark:border-gray/30 text-xs">
                                                    <div>
                                                        <span className="text-[11px] text-gray/50 dark:text-gray-light/50 font-medium block mb-0.5">
                                                            {tableColumnsT("speciality")}
                                                        </span>
                                                        {p.profesionalInfo[0] ? (
                                                            <div>
                                                                <div className="flex items-center gap-1.5">
                                                                    <p className="font-semibold uppercase text-gray dark:text-gray-light truncate">
                                                                        {specialityT(p.profesionalInfo[0].speciality)}
                                                                    </p>
                                                                    {p.profesionalInfo.length > 1 && (
                                                                        <Tooltip content={`${p.profesionalInfo.length} especialidades más`}>
                                                                            <button type="button" className="p-0.5 rounded text-xs bg-brand-light/60 dark:bg-gray">
                                                                                <Eye className="w-3 h-3 text-brand-dark dark:text-light" />
                                                                            </button>
                                                                        </Tooltip>
                                                                    )}
                                                                </div>
                                                                <p className="text-[10px] italic text-gray/50 dark:text-gray-light/50 mt-0.5">
                                                                    Ced: {p.profesionalInfo[0].cedula} &bull; Lic: {p.profesionalInfo[0].license}
                                                                </p>
                                                            </div>
                                                        ) : (
                                                            <span className="text-gray/40 italic">Sin especialidad</span>
                                                        )}
                                                    </div>

                                                    <div>
                                                        <span className="text-[11px] text-gray/50 dark:text-gray-light/50 font-medium block mb-0.5">
                                                            {tableColumnsT("department")}
                                                        </span>
                                                        <p className="font-semibold uppercase text-gray dark:text-gray-light truncate">
                                                            {p.department ? (
                                                                departmentT(p.department)
                                                            ) : (
                                                                <span className="text-error dark:text-error-dark normal-case">{departmentT("no_department")}</span>
                                                            )}
                                                        </p>
                                                    </div>
                                                </div>

                                                {/* FOOTER: CONTACTO, FECHA E ID */}
                                                <div className="flex flex-wrap items-center justify-between gap-2 mt-3 pt-2 border-t border-dashed border-gray/10 dark:border-gray/30 text-xs">
                                                    {/* Contacto: Email y Teléfono */}
                                                    <div className="flex items-center gap-3">
                                                        <div className="flex items-center gap-1">
                                                            <Tooltip
                                                                content={
                                                                    <button type="button" className="p-2 rounded-md text-xs text-light" onClick={() => { copyData(p.contactInfo.email); }}>
                                                                        {copyTxt} correo
                                                                    </button>
                                                                }
                                                                position="top-right"
                                                                trigger="hover"
                                                            >
                                                                <Mail className="cursor-pointer w-3.5 h-3.5 text-brand-dark dark:text-brand" />
                                                            </Tooltip>
                                                            <span className="text-[11px] text-gray dark:text-gray-light max-w-30 sm:max-w-45 truncate">
                                                                {p.contactInfo.email}
                                                            </span>
                                                        </div>

                                                        <div className="flex items-center gap-1">
                                                            <Tooltip
                                                                content={<PhoneAction phone={p?.contactInfo?.phone ? p.contactInfo.phone : ""} />}
                                                                position="top-right"
                                                                trigger="hover"
                                                            >
                                                                <Phone className="cursor-pointer w-3.5 h-3.5 text-success" />
                                                            </Tooltip>
                                                            <span className="text-[11px] text-gray dark:text-gray-light">
                                                                {p.contactInfo.phone}
                                                            </span>
                                                        </div>
                                                    </div>

                                                    {/* Meta: Ingreso e ID */}
                                                    <div className="flex items-center gap-2 text-[11px] text-gray/60 dark:text-gray-light/60">
                                                        <span>{simpleDate(p.createdAt)}</span>
                                                        <span>&bull;</span>
                                                        <Tooltip
                                                            content={
                                                                <button type="button" className="p-2 rounded-md text-xs text-light" onClick={() => { copyData(p.id); }}>
                                                                    {copyTxt}
                                                                </button>
                                                            }
                                                            position="top-right"
                                                            trigger="click"
                                                        >
                                                            <span className="cursor-pointer font-mono underline hover:text-brand">
                                                                {p.id.slice(0, 6)}...
                                                            </span>
                                                        </Tooltip>
                                                    </div>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                }
                            </TableBody>
                        </Table>

                    </div>

                </section>

            </Fallback>


            {/* MODAL EDIT AND VIEW DATA */}
            {
                userSelected && isOpen && (
                    <ViewEditProf
                        profesional={userSelected}
                        isOpen={isOpen}
                        closeModal={closeModal}
                        resetValues={() => setUserSelected(null)}
                    />
                )
            }

        </>
    );
}
