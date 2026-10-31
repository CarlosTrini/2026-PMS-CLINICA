import Switch from "@/components/form/switch/Switch";
import Label from "@/components/form/Label";
import Input from "@/components/form/input/InputField";
import TabsPanel from "@/components/tabsPanel/TabsPanel";
import { useMemo, useState } from "react";
import { Personal, RoleSystem } from "@/types/dataTypes";
import { Modal } from "@/components/ui/modal";
import Badge from "@/components/ui/badge/Badge";
import { STATUS_COLOR_LIGHT } from "@/utils/statusColors";
import Button from "@/components/ui/button/Button";
import useSystemTraslations from "@/hooks/useSysteTranslations";
import { FormProvider, useFieldArray, useForm, useWatch } from "react-hook-form";
import { CreatePersonalData, createPersonalFormSchema } from "../schemas/formPersonalSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { simpleDate } from "@/utils/dates";
import { Loader2, Pencil, Trash2 } from "lucide-react";
import Select from "@/components/form/select/Select";
import { useQueryClient, useMutation } from "@tanstack/react-query"
import { PersonalActionsService } from "../services/service"

// CONSTANTES
import { HEADQUARTERS_DATA, ROLE_SYSTEM_ARRAY, STATUS_PERSONAL_ARRAY } from "@/utils/constants";
import Tooltip from "@/components/ui/tooltip/Tooltip";

interface Props {
    personal: Personal;
    resetValues?: () => void;
    closeModal: () => void;
    isOpen: boolean;

}

export default function ViewEditPersonal({ personal, resetValues, closeModal, isOpen = false }: Props) {

    const { statusT, specialityT, commonT, departmentT, rolesSystemT } = useSystemTraslations();

    const [rolesSelect, statusSelect] = useMemo(() => {
        const rolesSelect = ROLE_SYSTEM_ARRAY.map((role) => ({
            value: role,
            label: rolesSystemT(role),
        }));
        const statusSelect = STATUS_PERSONAL_ARRAY.map((status) => ({
            value: status,
            label: statusT(status),
        }));
        return [rolesSelect, statusSelect]
    }, []);


    // HOOKS
    const [isEditMode, setIsEditMode] = useState(false);


    // QUERY
    const queryClient = useQueryClient();

    //MUTATION PARA UPDATES
    const { mutate: updatePersonalMutation, isPending } = useMutation({
        mutationFn: (updatedData: Personal) => PersonalActionsService.updatePersonal(updatedData),
        onSuccess: (response) => {
            console.log(response.message);
            // 1. Refresca la tabla principal de personal automáticamente
            queryClient.invalidateQueries({ queryKey: ['personalTable'] });

            // 2. Apaga el modo edición y/o cierra el modal
            setIsEditMode(false);
        },
        onError: (err) => {
            console.error('Error al actualizar personal:', err);
        }
    });



    //FORM HOOK
    const methods = useForm<CreatePersonalData>({
        resolver: zodResolver(createPersonalFormSchema),
        defaultValues: personal as CreatePersonalData
    });
    const { register, handleSubmit, getValues, formState: { errors } } = methods;
    const { fields: locationAssignmentFields, append: appendLocationAssignment, remove: removeLocationAssignment } = useFieldArray({ control: methods.control, name: 'locationAssignments', keyName: 'fieldKey' });
    const locationAssignmentValues = useWatch({ control: methods.control, name: 'locationAssignments' });
    const personalSpecialities = personal.profesionalInfo ?? [];
    const eligibleHeadquarters = personalSpecialities.length > 0
        ? HEADQUARTERS_DATA.filter((headquarters) => headquarters.specialities.some(({ value, isActive }) => isActive && personalSpecialities.some((item) => item.speciality === value)))
        : HEADQUARTERS_DATA;



    const handleUpdate = (data: CreatePersonalData) => {
        const updatedPersonal: Personal = {
            ...personal,
            ...data,
            updatedAt: new Date().toISOString()
        } as Personal;
        // Ejecutamos la mutación
        updatePersonalMutation(updatedPersonal);
    }







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
                        {personal?.personalInfo?.name + ' ' + personal?.personalInfo?.lastName}
                    </h4>
                    <div className="flex gap-2">
                        {personal?.profesionalInfo?.map((info, index) => (
                            <p key={index} className="text-sm text-theme-light-gray italic">{specialityT(info.speciality)}</p>
                        ))}
                    </div>
                    <div className="flex justify-end">
                        <Badge variantColor={personal?.status ? STATUS_COLOR_LIGHT[personal?.status] : ""} size="sm" >
                            {personal?.status ? statusT(personal?.status) : ""}
                        </Badge>
                    </div>
                </header>
                <section>
                    {/* SWITCH EDIT MODE */}
                    <div className='flex  items-center justify-between mb-5 mt-2'>
                        <div className="">
                            <label className="block text-xs text-theme-light-gray" htmlFor="editMode">Editar datos</label>
                            <Switch id='editMode' defaultChecked={isEditMode} size="md" onChange={() => setIsEditMode(!isEditMode)} />
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
                        <form id='editPersonalForm' onSubmit={handleSubmit(handleUpdate)}>

                            <TabsPanel tabsData={[
                                {
                                    id: 'personalInfo',
                                    label: 'Información personal',
                                    content: <div className="flex flex-col gap-3">
                                        <div className="flex items-center">
                                            <Label htmlFor="name" className="block text-sm mr-1" >Nombre</Label>
                                            <p className="pl-2  text-gray dark:text-gray-light/60">{personal?.personalInfo?.name}</p>


                                        </div>
                                        <div className="flex items-center">
                                            <Label htmlFor="lastName" className="block text-sm mr-1 mb-0 pb-0" >Apellido</Label>
                                            <p className="pl-2 text-gray dark:text-gray-light/60">{personal?.personalInfo?.lastName}</p>
                                        </div>
                                        <div className="flex items-baseline">
                                            <Label htmlFor="dateOfBirth" className="block text-sm mr-1" >Fecha de Nacimiento</Label>
                                            <p className="pl-2  text-gray dark:text-gray-light/60">{simpleDate(personal?.personalInfo?.dateOfBirth)}</p>
                                        </div>
                                        <div className="flex items-baseline">
                                            <Label htmlFor="gender" className="block text-sm mr-1" >Género</Label>
                                            <p className="pl-2  text-gray dark:text-gray-light/60">{personal?.personalInfo?.gender}</p>
                                        </div>

                                    </div>
                                },
                                {
                                    id: 'personalContact',
                                    label: <p className="flex items-center gap-1.5"> {isEditMode && <Pencil className="text-brand dark:text-brand-light" size={12} />} Datos de contacto</p>,
                                    content: <div className="flex flex-col gap-3">
                                        <div className="">
                                            <div className="flex  items-baseline">
                                                <Label htmlFor="email" className="block text-sm mr-1" >Correo</Label>
                                                <Input
                                                    disabled={!isEditMode}
                                                    size="sm"
                                                    id="email"
                                                    className={`${!isEditMode ? 'border-none! outline-none!' : 'block'}`}
                                                    {...register("contactInfo.email")}
                                                    error={!!errors.contactInfo?.email}
                                                />
                                            </div>
                                            <p className="mt-1 text-error-light text-xs italic">{errors?.contactInfo?.email?.message}</p>
                                        </div>
                                        <div className="">
                                            <div className="flex  items-baseline">
                                                <Label htmlFor="phone" className="block text-sm mr-1 mb-0 pb-0" >Teléfono</Label>
                                                <Input
                                                    disabled={!isEditMode}
                                                    size="sm"
                                                    id="phone"
                                                    className={`${!isEditMode ? 'border-none! outline-none!' : 'block'}`}
                                                    {...register("contactInfo.phone")}
                                                    error={!!errors.contactInfo?.phone}
                                                />
                                            </div>
                                            <p className="mt-1 text-error-light text-xs italic">{errors?.contactInfo?.phone?.message}</p>
                                        </div>
                                        <div className="">
                                            <div className="flex  items-baseline">
                                                <Label htmlFor="address" className="block text-sm mr-1" >Dirección</Label>
                                                <Input
                                                    disabled={!isEditMode}
                                                    size="sm"
                                                    id="address"
                                                    className={`${!isEditMode ? 'border-none! outline-none!' : 'block'}`}
                                                    {...register("contactInfo.address")}
                                                    error={!!errors.contactInfo?.address}
                                                />
                                            </div>
                                            <p className="mt-1 text-error-light text-xs italic">{errors?.contactInfo?.address?.message}</p>
                                        </div>
                                        <div className="">
                                            <div className="flex  items-baseline">
                                                <Label htmlFor="city" className="block text-sm mr-1" >Ciudad</Label>
                                                <Input
                                                    disabled={!isEditMode}
                                                    size="sm"
                                                    id="city"
                                                    className={`${!isEditMode && 'border-none! outline-none! '}`}
                                                    {...register("contactInfo.city")}
                                                    error={!!errors.contactInfo?.city}
                                                />
                                            </div>
                                            <p className="mt-1 text-error-light text-xs italic">{errors?.contactInfo?.city?.message}</p>
                                        </div>
                                        <div className="">
                                            <div className="flex  items-baseline">
                                                <Label htmlFor="state" className="block text-sm mr-1" >Estado</Label>
                                                <Input
                                                    disabled={!isEditMode}
                                                    size="sm"
                                                    id="state"
                                                    className={`${!isEditMode && 'border-none! outline-none! '}`}
                                                    {...register("contactInfo.state")}
                                                    error={!!errors.contactInfo?.state}
                                                />
                                            </div>
                                            <p className="mt-1 text-error-light text-xs italic">{errors?.contactInfo?.state?.message}</p>
                                        </div>
                                        <div className="">
                                            <div className="flex  items-baseline">
                                                <Label htmlFor="zip" className="block text-sm mr-1" >Código Postal</Label>
                                                <Input
                                                    disabled={!isEditMode}
                                                    size="sm"
                                                    id="zip"
                                                    {...register("contactInfo.zip")}
                                                    className={`${!isEditMode && 'border-none! outline-none! '}`}
                                                    error={!!errors.contactInfo?.zip}
                                                />
                                            </div>
                                            <p className="mt-1 text-error-light text-xs italic">{errors?.contactInfo?.zip?.message}</p>
                                        </div>
                                        <div className="">
                                            <div className="flex  items-baseline">
                                                <Label htmlFor="country" className="block text-sm mr-1" >País</Label>
                                                <Input
                                                    disabled={!isEditMode}
                                                    size="sm"
                                                    id="country"
                                                    className={`${!isEditMode && 'border-none! outline-none! '}`}
                                                    {...register("contactInfo.country")}
                                                    error={!!errors.contactInfo?.country}
                                                />
                                            </div>
                                            <p className="mt-1 text-error-light text-xs italic">{errors?.contactInfo?.country?.message}</p>
                                        </div>

                                    </div>
                                },
                                {
                                    id: 'generalInfo',
                                    label: <p className="flex items-center gap-1.5"> {isEditMode && <Pencil className="text-brand dark:text-brand-light " size={12} />} General</p>,
                                    content: <div className="flex flex-col gap-3">
                                        <div className="">
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
                                            <p className="mt-1 text-error-light text-xs italic">{errors?.status?.message}</p>
                                        </div>

                                        <div className="rounded-lg border border-gray/20 p-3">
                                            <div className="flex items-center justify-between gap-2">
                                                <p className="text-sm font-semibold">Asignaciones por sede</p>
                                                {isEditMode && <Button type="button" size="sm" variant="outline" onClick={() => { const headquarters = eligibleHeadquarters[0] ?? HEADQUARTERS_DATA[0]; const speciality = headquarters.specialities.find((item) => item.isActive && personalSpecialities.some((info) => info.speciality === item.value))?.value ?? personalSpecialities[0]?.speciality ?? headquarters.specialities[0].value; appendLocationAssignment({ id: `assignment-${Date.now()}`, headquartersId: headquarters.id, speciality, roleSystem: 'professional' }); }}>Agregar sede</Button>}
                                            </div>
                                            {locationAssignmentFields.map((field, index) => {
                                                const assignment = locationAssignmentValues?.[index];
                                                const headquarters = HEADQUARTERS_DATA.find((item) => item.id === assignment?.headquartersId) ?? HEADQUARTERS_DATA[0];
                                                const specialityOptions = personalSpecialities.length > 0
                                                    ? headquarters.specialities.filter(({ value, isActive }) => (isActive || value === assignment?.speciality) && personalSpecialities.some((item) => item.speciality === value))
                                                    : headquarters.specialities.filter(({ value, isActive }) => isActive || value === assignment?.speciality);
                                                return <div key={field.fieldKey} className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3 rounded-md border border-gray/10 p-3">
                                                    <div>
                                                        <Label htmlFor={`assignment-headquarters-${index}`}>Sede</Label>
                                                        <Select id={`assignment-headquarters-${index}`} options={eligibleHeadquarters.map(({ id, name }) => ({ value: id, label: name }))} value={assignment?.headquartersId ?? ''} {...register(`locationAssignments.${index}.headquartersId`)} onChange={(event) => { const selected = eligibleHeadquarters.find((item) => item.id === event.target.value); methods.setValue(`locationAssignments.${index}.headquartersId`, event.target.value); if (selected) { const speciality = selected.specialities.find((item) => item.isActive && personalSpecialities.some((info) => info.speciality === item.value))?.value; if (speciality) methods.setValue(`locationAssignments.${index}.speciality`, speciality); methods.setValue(`locationAssignments.${index}.departmentId`, ''); } }} disabled={!isEditMode} size="sm" />
                                                    </div>
                                                    <div>
                                                        <Label htmlFor={`assignment-role-${index}`}>Rol en sede</Label>
                                                        <Select id={`assignment-role-${index}`} options={rolesSelect} value={assignment?.roleSystem ?? 'professional'} {...register(`locationAssignments.${index}.roleSystem`)} onChange={(event) => methods.setValue(`locationAssignments.${index}.roleSystem`, event.target.value as RoleSystem)} disabled={!isEditMode} size="sm" />
                                                    </div>
                                                    <div>
                                                        <Label htmlFor={`assignment-speciality-${index}`}>Especialidad en sede</Label>
                                                        <Select id={`assignment-speciality-${index}`} options={specialityOptions.map(({ value, isActive }) => ({ value, label: `${specialityT(value)}${isActive ? '' : ' (inactiva)'}` }))} value={assignment?.speciality ?? ''} {...register(`locationAssignments.${index}.speciality`)} onChange={(event) => { methods.setValue(`locationAssignments.${index}.speciality`, event.target.value as typeof assignment.speciality); const currentDepartment = headquarters.departments.find(({ id }) => id === assignment?.departmentId); if (currentDepartment && !currentDepartment.specialities.includes(event.target.value as typeof assignment.speciality)) methods.setValue(`locationAssignments.${index}.departmentId`, ''); }} disabled={!isEditMode} size="sm" />
                                                    </div>
                                                    <div className="flex items-end gap-2">
                                                        <div className="flex-1">
                                                            <Label htmlFor={`assignment-department-${index}`}>Departamento (opcional)</Label>
                                                            <Select id={`assignment-department-${index}`} options={headquarters.departments.filter((department) => (department.isActive || department.id === assignment?.departmentId) && (!assignment?.speciality || department.specialities.includes(assignment.speciality))).map(({ id, value, isActive }) => ({ value: id, label: `${departmentT(value)}${isActive ? '' : ' (inactivo)'}` }))} value={assignment?.departmentId ?? ''} {...register(`locationAssignments.${index}.departmentId`)} placeholder="Sin departamento" canClear disabled={!isEditMode} size="sm" />
                                                        </div>
                                                        {isEditMode && <Button type="button" size="sm" variant="outline" onClick={() => removeLocationAssignment(index)}><Trash2 className="h-4 w-4" /></Button>}
                                                    </div>
                                                </div>;
                                            })}
                                            <p className="mt-2 text-xs text-gray">La especialidad registrada es independiente de la especialidad y rol que ejerce en cada sede.</p>
                                        </div>

                                        <div className="border border-gray my-2" />
                                        <div className="">
                                            <p>Especialidades </p>
                                            <div className="flex gap-3 flex-wrap mt-3">
                                                {personal?.profesionalInfo?.map((speciality, idx) => (
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
                            <Button disabled={isPending} form="editPersonalForm" type="submit" size="sm">
                                {
                                    isPending ? (
                                        <Loader2 className="animate-spin" />
                                    ) : (
                                        commonT('saveChanges')
                                    )
                                }
                            </Button>
                        )
                    }
                </footer>
            </Modal >

        </>
    )
}

