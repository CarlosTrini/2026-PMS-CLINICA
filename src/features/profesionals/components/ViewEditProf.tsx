import Switch from "@/components/form/switch/Switch";
import Label from "@/components/form/Label";
import Input from "@/components/form/input/InputField";
import TabsPanel from "@/components/tabsPanel/TabsPanel";
import { useMemo, useState } from "react";
import { Professional } from "@/types/dataTypes";
import { Modal } from "@/components/ui/modal";
import Badge from "@/components/ui/badge/Badge";
import { STATUS_COLOR_LIGHT } from "@/utils/statusColors";
import Button from "@/components/ui/button/Button";
import useSystemTraslations from "@/hooks/useSysteTranslations";
import { FormProvider, useForm } from "react-hook-form";
import { CreateProfesionalData, createProfesionalDefault, createProfesionalFormSchema } from "../schemas/formProfesional";
import { zodResolver } from "@hookform/resolvers/zod";
import { simpleDate } from "@/utils/dates";
import { Pencil, Trash2 } from "lucide-react";
import Select from "@/components/form/select/Select";

// CONSTANTES
import { DEPARTMENT_ARRAY, ROLE_SYSTEM_ARRAY, STATUS_PROFESSIONAL_ARRAY } from "@/utils/datadummy";
import Tooltip from "@/components/ui/tooltip/Tooltip";

interface Props {
    profesional: Professional;
    resetValues?: () => void;
    closeModal: () => void;
    isOpen: boolean;

}

export default function ViewEditProf({ profesional, resetValues, closeModal, isOpen = false }: Props) {

    const { statusT, specialityT, commonT, formInputsT, departmentT, rolesSystemT } = useSystemTraslations();

    const [rolesSelect, statusSelect, departmentSelect] = useMemo(() => {
        const rolesSelect = ROLE_SYSTEM_ARRAY.map((role) => ({
            value: role,
            label: rolesSystemT(role), // o rolesT(role)
        }));
        const statusSelect = STATUS_PROFESSIONAL_ARRAY.map((status) => ({
            value: status,
            label: statusT(status),
        }));
        const departmentSelect = DEPARTMENT_ARRAY.map((department) => ({
            value: department,
            label: departmentT(department),
        }));

        return [rolesSelect, statusSelect, departmentSelect]
    }, []);


    // HOOKS
    const [isEditMode, setIsEditMode] = useState(false);



    //FORM HOOK
    const methods = useForm<CreateProfesionalData>({
        resolver: zodResolver(createProfesionalFormSchema),
        // defaultValues: createProfesionalDefault
        defaultValues: profesional as CreateProfesionalData
    });
    const { register, handleSubmit, reset, getValues, formState: { errors } } = methods;



    const handleUpdate = (data: CreateProfesionalData) => {
        console.log('editando', data);

    }



    // const handleSave = () => {
    //     closeModal();
    // };




    return (
        <>

            <Modal
                isOpen={isOpen}
                onClose={() => {
                    if (resetValues) {
                        resetValues()
                    }
                    closeModal();
                }}
                isFullscreen={false}
                className="w-[80%]! md:w-[60%]! lg:max-w-150 p-5"
            >
                <header className=" pb-4 border-b border-gray/70t">
                    <h4 className=" italic text-lg md:text-title-sm font-semibold text-gray-800 dark:text-light-accent/90">
                        {profesional?.personalInfo?.name + ' ' + profesional?.personalInfo?.lastName}
                    </h4>
                    <div className="flex gap-2">
                        {profesional?.profesionalInfo?.map((info, index) => (
                            <p className="text-sm text-theme-light-gray italic">{specialityT(info.speciality)}</p>
                        ))}
                    </div>
                    <div className="flex justify-end">
                        <Badge variantColor={profesional?.status ? STATUS_COLOR_LIGHT[profesional?.status] : ""} size="sm" >
                            {profesional?.status ? statusT(profesional?.status) : ""}
                        </Badge>
                    </div>
                </header>
                <section>
                    {/* SWITCH EDIT MODE */}
                    <div className='flex  items-center justify-between mb-5 mt-2'>
                        <div className="">
                            <label className="block text-xs text-theme-light-gray" htmlFor="editMode">Editar datos</label>
                            <Switch id='editMode' size="md" onChange={() => setIsEditMode(!isEditMode)} />
                        </div>
                        <Tooltip
                            content={
                                <div className="p-2.5 bg-error-dark/60">
                                    <p className="text-xs text-theme-light">
                                        {`${commonT("deleteUser")} este personal`}
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





                    {/* FORMULARIO PARA EDICIÓN Y SECCIÓN DE LECTURA */}
                    <FormProvider {...methods} >
                        <form id='editProfForm' onSubmit={handleSubmit(handleUpdate)}>

                            <TabsPanel tabsData={[
                                {
                                    id: 'profesionalInfo',
                                    label: 'Información personal',
                                    content: <div className="flex flex-col gap-3">
                                        <div className="flex items-center">
                                            <Label htmlFor="name" className="block text-sm mr-1" >Nombre</Label>
                                            <p className="pl-2  text-gray dark:text-gray-light/60">{profesional?.personalInfo?.name}</p>


                                        </div>
                                        <div className="flex items-center">
                                            <Label htmlFor="lastName" className="block text-sm mr-1 mb-0 pb-0" >Apellido</Label>
                                            <p className="pl-2 text-gray dark:text-gray-light/60">{profesional?.personalInfo?.lastName}</p>
                                        </div>
                                        <div className="flex items-baseline">
                                            <Label htmlFor="dateOfBirth" className="block text-sm mr-1" >Fecha de Nacimiento</Label>
                                            <p className="pl-2  text-gray dark:text-gray-light/60">{simpleDate(profesional?.personalInfo?.dateOfBirth)}</p>
                                        </div>
                                        <div className="flex items-baseline">
                                            <Label htmlFor="gender" className="block text-sm mr-1" >Género</Label>
                                            <p className="pl-2  text-gray dark:text-gray-light/60">{profesional?.personalInfo?.gender}</p>
                                        </div>

                                    </div>
                                },
                                {
                                    id: 'profesionalContact',
                                    label: <p className="flex items-center gap-1.5"> {isEditMode && <Pencil className="text-brand dark:text-brand-light" size={12} />} Datos de contacto</p>,
                                    content: <div className="flex flex-col gap-3">
                                        <div className="flex flex-col justify-start items-center">
                                            <div className="flex  items-baseline">

                                                <Label htmlFor="email" className="block text-sm mr-1" >Correo</Label>
                                                <Input
                                                    disabled={!isEditMode}
                                                    size="sm"
                                                    id="email"
                                                    // value={getValues("contactInfo.email")}
                                                    className={`${!isEditMode ? 'border-none! outline-none!' : 'block'}`}
                                                    {...register("contactInfo.email")}
                                                    error={!!errors.contactInfo?.email}
                                                />
                                            </div>
                                            <p className="mt-1 text-error-light text-xs italic">{errors?.contactInfo?.email?.message}</p>
                                        </div>
                                        <div className="flex items-center">
                                            <Label htmlFor="phone" className="block text-sm mr-1 mb-0 pb-0" >Teléfono</Label>
                                            <Input
                                                disabled={!isEditMode}
                                                size="sm"
                                                id="phone"
                                                className={`${!isEditMode ? 'border-none! outline-none!' : 'block'}`}
                                                {...register("contactInfo.phone")}
                                            />
                                        </div>
                                        <div className="flex items-center">
                                            <Label htmlFor="address" className="block text-sm mr-1" >Dirección</Label>
                                            <Input
                                                disabled={!isEditMode}
                                                size="sm"
                                                id="address"
                                                className={`${!isEditMode ? 'border-none! outline-none!' : 'block'}`}
                                                {...register("contactInfo.address")}
                                            />
                                        </div>
                                        <div className="flex items-center">
                                            <Label htmlFor="city" className="block text-sm mr-1" >Ciudad</Label>
                                            <Input
                                                disabled={!isEditMode}
                                                size="sm"
                                                id="city"
                                                className={`${!isEditMode && 'border-none! outline-none! '}`}
                                                {...register("contactInfo.city")}
                                            />
                                        </div>
                                        <div className="flex items-center">
                                            <Label htmlFor="state" className="block text-sm mr-1" >Estado</Label>
                                            <Input
                                                disabled={!isEditMode}
                                                size="sm"
                                                id="state"
                                                className={`${!isEditMode && 'border-none! outline-none! '}`}
                                                {...register("contactInfo.state")}
                                            />
                                        </div>
                                        <div className="flex items-center">
                                            <Label htmlFor="zip" className="block text-sm mr-1" >Código Postal</Label>
                                            <Input
                                                disabled={!isEditMode}
                                                size="sm"
                                                id="zip"
                                                {...register("contactInfo.zip")}
                                                className={`${!isEditMode && 'border-none! outline-none! '}`}
                                            />
                                        </div>
                                        <div className="flex items-center">
                                            <Label htmlFor="country" className="block text-sm mr-1" >País</Label>
                                            <Input
                                                disabled={!isEditMode}
                                                size="sm"
                                                id="country"
                                                className={`${!isEditMode && 'border-none! outline-none! '}`}
                                                {...register("contactInfo.country")}
                                            />
                                        </div>

                                    </div>
                                },
                                {
                                    id: 'generalInfo',
                                    label: <p className="flex items-center gap-1.5"> {isEditMode && <Pencil className="text-brand dark:text-brand-light " size={12} />} General</p>,
                                    content: <div className="flex flex-col gap-3">
                                        <div className="flex items-baseline max-w-50">
                                            <Label htmlFor="role" className="block text-sm mr-1" >Rol</Label>
                                            <Select
                                                placeholder="Selecciona un rol"
                                                options={rolesSelect}
                                                defaultValue={getValues('role')}
                                                {...register('role')}
                                                disabled={!isEditMode}
                                                size="sm"
                                                className={`${!isEditMode && 'border-none! outline-none!'}`}
                                            />
                                        </div>
                                        <div className="flex items-baseline max-w-50">
                                            <Label htmlFor="status" className="block text-sm mr-1 mb-0 pb-0" >Estado</Label>
                                            <Select
                                                placeholder="Selecciona un estado"
                                                options={statusSelect}
                                                defaultValue={getValues('status')}
                                                {...register('status')}
                                                disabled={!isEditMode}
                                                size="sm"
                                                className={`${!isEditMode && 'border-none! outline-none!'}`}
                                            />
                                        </div>
                                        <div className="flex items-baseline max-w-70">
                                            <Label htmlFor="department" className="block text-sm mr-1" >Departamento</Label>
                                            <Select
                                                placeholder="Selecciona un departamento"
                                                options={departmentSelect}
                                                defaultValue={getValues('department')}
                                                {...register('department')}
                                                disabled={!isEditMode}
                                                size="sm"
                                                className={`${!isEditMode && 'border-none! outline-none!'}`}
                                            />
                                        </div>
                                        <div className="border border-gray my-2" />
                                        <div className="">
                                            <p>Espcecialidades </p>
                                            <div className="flex gap-3 flex-wrap mt-3">
                                                {profesional?.profesionalInfo?.map((speciality, idx) => (
                                                    <div key={idx} className="flex flex-col gap-y-0 border border-gray/30 rounded-lg p-2 italic">

                                                        <p className="font-semibold">{speciality.speciality}</p>
                                                        <p className="text-xs text-gray/70" >{speciality.cedula}</p>
                                                        <p className="text-xs text-gray/70" >{speciality.license}</p>

                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                    </div>
                                }
                            ]} />
                        </form>
                    </FormProvider>



                </section>
                <footer className="mt-4 flex w-full items-center justify-end gap-3">
                    <Button size="sm" variant="outline" onClick={() => {
                        closeModal();
                    }}>
                        {commonT('close')}
                    </Button>
                    {
                        isEditMode && (
                            <Button form="editProfForm" type="submit" size="sm">
                                {commonT('saveChanges')}
                            </Button>
                        )
                    }
                </footer>
            </Modal >

        </>
    )
}





//   <TabsPanel tabsData={[
//                             {
//                                 id: 'profesionalInfo',
//                                 label: 'Información personal',
//                                 content: <div className="flex flex-col gap-3">
//                                     <div className="flex items-center">
//                                         <Label htmlFor="name" className="block text-sm mr-1" >Nombre</Label>
//                                         <Input
//                                             disabled={!isEditMode}
//                                             size="sm"
//                                             id="name"
//                                             value={profesional?.personalInfo?.name}
//                                             className={`${!isEditMode ? 'border-none! outline-none!' : 'block'}`}
//                                         // onChange={(e) => setprofesional({ ...profesional, personalInfo: { ...profesional?.personalInfo, name: e.target.value } })}
//                                         />
//                                     </div>
//                                     <div className="flex items-center">
//                                         <Label htmlFor="lastName" className="block text-sm mr-1 mb-0 pb-0" >Apellido</Label>
//                                         <Input
//                                             disabled={!isEditMode}
//                                             size="sm"
//                                             id="lastName"
//                                             value={profesional?.personalInfo?.lastName}
//                                             className={`${!isEditMode ? 'border-none! outline-none!' : 'block'}`}
//                                         // onChange={(e) => setprofesional({ ...profesional, personalInfo: { ...profesional?.personalInfo, lastName: e.target.value } })}
//                                         />
//                                     </div>
//                                     <div className="flex items-baseline">
//                                         <Label htmlFor="dateOfBirth" className="block text-sm mr-1" >Fecha de Nacimiento</Label>
//                                         <p className="pl-2 text-gray-light/60">{simpleDate(profesional?.personalInfo?.dateOfBirth)}</p>
//                                     </div>
//                                     <div className="flex items-center">
//                                         <Label htmlFor="gender" className="block text-sm mr-1" >Género</Label>
//                                         <Input
//                                             disabled={!isEditMode}
//                                             size="sm"
//                                             id="gender"
//                                             value={profesional?.personalInfo?.gender}
//                                             className={`${!isEditMode && 'border-none! outline-none! '}`}
//                                         // onChange={(e) => setprofesional({ ...profesional, personalInfo: { ...profesional?.personalInfo, gender: e.target.value } })}
//                                         />
//                                     </div>

//                                 </div>
//                             },
//                             {
//                                 id: 'profesionalContact',
//                                 label: 'Datos de contacto',
//                                 content: <div className="flex flex-col gap-3">
//                                     <div className="flex items-center">
//                                         <Label htmlFor="email" className="block text-sm mr-1" >Correo</Label>
//                                         <Input
//                                             disabled={!isEditMode}
//                                             size="sm"
//                                             id="email"
//                                             value={profesional?.contactInfo?.email}
//                                             className={`${!isEditMode ? 'border-none! outline-none!' : 'block'}`}
//                                         // onChange={(e) => setprofesional({ ...profesional, personalInfo: { ...profesional?.personalInfo, name: e.target.value } })}
//                                         />
//                                     </div>
//                                     <div className="flex items-center">
//                                         <Label htmlFor="phone" className="block text-sm mr-1 mb-0 pb-0" >Teléfono</Label>
//                                         <Input
//                                             disabled={!isEditMode}
//                                             size="sm"
//                                             id="phone"
//                                             value={profesional?.contactInfo?.phone}
//                                             className={`${!isEditMode ? 'border-none! outline-none!' : 'block'}`}
//                                         // onChange={(e) => setprofesional({ ...profesional, personalInfo: { ...profesional?.personalInfo, lastName: e.target.value } })}
//                                         />
//                                     </div>
//                                     <div className="flex items-center">
//                                         <Label htmlFor="address" className="block text-sm mr-1" >Dirección</Label>
//                                         <Input
//                                             disabled={!isEditMode}
//                                             size="sm"
//                                             id="address"
//                                             value={profesional?.contactInfo?.address}
//                                             className={`${!isEditMode ? 'border-none! outline-none!' : 'block'}`}
//                                         // onChange={(e) => setprofesional({ ...profesional, personalInfo: { ...profesional?.personalInfo, dateOfBirth: e.target.value } })}
//                                         />
//                                     </div>
//                                     <div className="flex items-center">
//                                         <Label htmlFor="city" className="block text-sm mr-1" >Ciudad</Label>
//                                         <Input
//                                             disabled={!isEditMode}
//                                             size="sm"
//                                             id="city"
//                                             value={profesional?.contactInfo?.city}
//                                             className={`${!isEditMode && 'border-none! outline-none! '}`}
//                                         // onChange={(e) => setprofesional({ ...profesional, personalInfo: { ...profesional?.personalInfo, gender: e.target.value } })}
//                                         />
//                                     </div>
//                                     <div className="flex items-center">
//                                         <Label htmlFor="state" className="block text-sm mr-1" >Estado</Label>
//                                         <Input
//                                             disabled={!isEditMode}
//                                             size="sm"
//                                             id="state"
//                                             value={profesional?.contactInfo?.state}
//                                             className={`${!isEditMode && 'border-none! outline-none! '}`}
//                                         // onChange={(e) => setprofesional({ ...profesional, personalInfo: { ...profesional?.personalInfo, gender: e.target.value } })}
//                                         />
//                                     </div>
//                                     <div className="flex items-center">
//                                         <Label htmlFor="zip" className="block text-sm mr-1" >Código Postal</Label>
//                                         <Input
//                                             disabled={!isEditMode}
//                                             size="sm"
//                                             id="zip"
//                                             value={profesional?.contactInfo?.zip}
//                                             className={`${!isEditMode && 'border-none! outline-none! '}`}
//                                         // onChange={(e) => setprofesional({ ...profesional, personalInfo: { ...profesional?.personalInfo, gender: e.target.value } })}
//                                         />
//                                     </div>
//                                     <div className="flex items-center">
//                                         <Label htmlFor="country" className="block text-sm mr-1" >País</Label>
//                                         <Input
//                                             disabled={!isEditMode}
//                                             size="sm"
//                                             id="country"
//                                             value={profesional?.contactInfo?.country}
//                                             className={`${!isEditMode && 'border-none! outline-none! '}`}
//                                         // onChange={(e) => setprofesional({ ...profesional, personalInfo: { ...profesional?.personalInfo, gender: e.target.value } })}
//                                         />
//                                     </div>

//                                 </div>
//                             },
//                             {
//                                 id: 'generalInfo',
//                                 label: 'General',
//                                 content: <div className="flex flex-col gap-3">
//                                     <div className="flex items-center">
//                                         <Label htmlFor="role" className="block text-sm mr-1" >Rol</Label>
//                                         <Input
//                                             disabled={!isEditMode}
//                                             size="sm"
//                                             id="role"
//                                             value={profesional?.role}
//                                             className={`${!isEditMode ? 'border-none! outline-none!' : 'block'}`}
//                                         // onChange={(e) => setprofesional({ ...profesional, personalInfo: { ...profesional?.personalInfo, name: e.target.value } })}
//                                         />
//                                     </div>
//                                     <div className="flex items-center">
//                                         <Label htmlFor="status" className="block text-sm mr-1 mb-0 pb-0" >Estado</Label>
//                                         <Input
//                                             disabled={!isEditMode}
//                                             size="sm"
//                                             id="status"
//                                             value={profesional?.status}
//                                             className={`${!isEditMode ? 'border-none! outline-none!' : 'block'}`}
//                                         // onChange={(e) => setprofesional({ ...profesional, personalInfo: { ...profesional?.personalInfo, lastName: e.target.value } })}
//                                         />
//                                     </div>
//                                     <div className="flex items-center">
//                                         <Label htmlFor="department" className="block text-sm mr-1" >Departamento</Label>
//                                         <Input
//                                             disabled={!isEditMode}
//                                             size="sm"
//                                             id="department"
//                                             value={profesional?.department}
//                                             className={`${!isEditMode ? 'border-none! outline-none!' : 'block'}`}
//                                         // onChange={(e) => setprofesional({ ...profesional, personalInfo: { ...profesional?.personalInfo, dateOfBirth: e.target.value } })}
//                                         />
//                                     </div>
//                                     <div className="border border-gray my-2" />
//                                     <div className="">
//                                         <p>Espcecialidades </p>
//                                         <div className="flex gap-3 flex-wrap mt-3">
//                                             {profesional?.profesionalInfo?.map((speciality, idx) => (
//                                                 <div key={idx} className="flex flex-col gap-y-0 border border-gray/30 rounded-lg p-2 italic">

//                                                     <p >{speciality.speciality}</p>
//                                                     <p className="text-gray/70 ml-2" >{speciality.cedula}</p>
//                                                     <p className="text-gray/70 ml-2" >{speciality.license}</p>

//                                                 </div>
//                                             ))}
//                                         </div>
//                                     </div>

//                                 </div>
//                             }
//                         ]} />