import Input from "@/components/form/input/InputField";
import Label from "@/components/form/Label";
import Badge from "@/components/ui/badge/Badge";
import Button from "@/components/ui/button/Button";
import { Modal } from "@/components/ui/modal";;
import { FileExclamationPoint, Save, Trash, X } from "lucide-react";

import { useHeadquarterStore } from '@/store/useHeadquarterStore';
import Switch from "@/components/form/switch/Switch";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { formUpdateServiceData } from "../schemas/formUpdateServiceSchema";
import { formUpdateServiceSchema } from "../schemas/formUpdateServiceSchema";
import { useEffect, useState } from "react";
import { Services } from "@/types/dataTypes";
import { getISODate, simpleDate } from "@/utils/dates";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ServicesActionService } from "../services/service";
import Alert from "@/components/ui/alert/Alert";
import Tooltip from "@/components/ui/tooltip/Tooltip";


// INTERFACE
interface Props {
    isOpen: boolean;
    handleToggle: () => void;
    service: Services;
}

const EditServiceModal = ({ isOpen, service, handleToggle }: Props) => {

    // STORES
    const { currentHeadquarter } = useHeadquarterStore();
    const [statusValue, setStatusValue] = useState<formUpdateServiceData['isActive']>(service.isActive);
    const [editMode, setEditMode] = useState<boolean>(false);
    const [alertMessage, setAlertMessage] = useState('');

    //STATE

    // HOOK FORM
    const { register, handleSubmit, reset, subscribe, setValues, getValues, formState: { errors } } = useForm<formUpdateServiceData>({
        resolver: zodResolver(formUpdateServiceSchema),
        // defaultValues: service
    })

    // QUERY
    const queryClient = useQueryClient();
    const { mutate: handleUpdateService, isPending, error, isSuccess } = useMutation({
        mutationKey: ['update-service-modal'],
        mutationFn: ({ idHq, service }: { idHq: string, service: Services }) => ServicesActionService.updateNewService(idHq, service),
        onSuccess: async (res) => {
            await queryClient.invalidateQueries({
                queryKey: ['services-page-table', currentHeadquarter?.id]// actualiza datos de la tabla con este querykey
            });
            setAlertMessage('Servicio actualizado correctamente');
            closeModal();
        },
        onError: (err) => {
            console.error('Add service err: ', err?.message)
        }
    });

    const { mutate: handleDeleteService, isPending: isPendingDelete, error: errorDelete, isSuccess: isSuccessDelete } = useMutation({
        mutationKey: ['delete-service-modal'],
        mutationFn: ({ idHq, serviceId }: { idHq: string, serviceId: Services['id'] }) => ServicesActionService.deleteNewService(idHq, serviceId),
        onSuccess: async (res) => {
            await queryClient.invalidateQueries({
                queryKey: ['services-page-table', currentHeadquarter?.id]// actualiza datos de la tabla con este querykey
            });
            setAlertMessage('Servicio eliminado correctamente');
            closeModal();
        },
        onError: (err) => {
            console.error('Add service err: ', err?.message)
        }
    });



    // FUNCTIONS
    const onAddServiceSubmit = (data: formUpdateServiceData) => {
        const fullDataService: Services = {
            ...service,
            isActive: data.isActive || false,
            name: data.name,
            updatedAt: getISODate()
        };

        if (!currentHeadquarter?.id) return;

        handleUpdateService({ idHq: currentHeadquarter.id, service: fullDataService })
    }

    const onDeleteService = () => handleDeleteService({ idHq: (currentHeadquarter?.id || ''), serviceId: service.id });

    const closeModal = () => {
        reset();
        setStatusValue(false);
        setEditMode(false);
        handleToggle();
    }

    // EFFECTS
    useEffect(() => {
        const subscribeForm = subscribe({
            formState: {
                values: true
            },
            callback({ values, name }) {
                if (name == 'isActive') {
                    setStatusValue(values['isActive'])
                }

            }
        });

        return subscribeForm;
    }, [subscribe]);

    //valores default para el formulario al editar
    useEffect(() => {
        setValues(service);
        setStatusValue(service?.isActive)
    }, [service]);



    return (
        <>

            <Modal
                key={'edit-service-modal'}
                showCloseButton={true}
                isOpen={isOpen}
                onClose={() => { closeModal(); }}
                className="max-w-120 dark:bg-gray-dark/80! p-5 rounded-lg"
                title={<div className="mb-5">
                    <h3 className="font-bold text-2xl text-theme-light-gray">{'Datos del servicio'}</h3>
                    <div className="">
                        <Badge color="info" size="sm">
                            {currentHeadquarter?.name}
                        </Badge>
                    </div>
                </div>}
            >
                {/* OVERLAY LOADING */}
                {
                    isPending && (
                        <div className="absolute top-0 left-0 w-full h-full z-100 bg-gray-dark opacity-40 flex items-center justify-center ">
                            <div className="loader"></div>
                        </div>
                    )
                }

                <div className="mb-4 flex justify-between">

                    <div>
                        <Switch
                            label="Edición"
                            onChange={() => setEditMode(prev => !prev)}
                        />
                    </div>

                    <div>
                        <Tooltip trigger='click' autoclose={false} position="left" content={
                            <div className=" ">
                                <p className="text-sm text-light">Se eliminará el servicio <br /> <span className="font-bold text-gray-light italic">{service.name}</span></p>
                                <button onClick={onDeleteService} type="button" className="text-light bg-error-dark p-1  rounded-md text-xs mt-3">Eliminar</button>
                            </div>
                        }
                        >

                            <button><Trash className="bg-error-dark text-light rounded-md p-1" /> </button>
                        </Tooltip>
                    </div>
                </div>

                <form id="form-update-service" onSubmit={handleSubmit(onAddServiceSubmit)} action="">
                    <div className="sm:flex space-y-3 md:space-y-0 justify-between">
                        {/* body */}
                        {/* NOMBRE DEL SERVICIO */}
                        <div>
                            <Label key={'update-service-name'} className="italic" htmlFor="updateServiceName"> <span className={`${editMode ? 'inline' : 'hidden'} text-error text-lg`}>*</span>Servicio: </Label>
                            {
                                !editMode
                                    ? <p className="text-theme-light-gray">{service.name}</p>
                                    : <Input
                                        type="text"
                                        placeholder="Ejem: Banco de sangre"
                                        size="sm"
                                        {...register("name")}
                                        error={!!errors.name}
                                    />
                            }
                        </div>

                        {/* ESTATUS */}
                        <div className="">
                            <Label key={'edit-service-status'} className="italic" htmlFor="editServiceStatus">Estatus: </Label>
                            <div className="flex gap-2">

                                {
                                    editMode

                                        ? (
                                            <>
                                                <p className="text-sm text-theme-light-gray">{statusValue ? 'Activo' : 'Inactivo'}</p>
                                                <Switch
                                                    color="blue"
                                                    size="sm"
                                                    defaultChecked={getValues('isActive')}
                                                    {...register('isActive')}
                                                />
                                            </>
                                        )
                                        : <Badge color={service?.isActive ? 'success' : 'error'}>{service.isActive ? 'Activo' : 'Inactivo'}</Badge>
                                }

                            </div>
                        </div>
                    </div>


                    <div>

                    </div>

                    <div className="flex justify-center md:justify-between flex-wrap gap-4 mt-10">
                        <div className="mt-5 text-center text-[10px] text-theme-light-gray">
                            <p className="italic">Última fecha de modificación: {simpleDate(service.updatedAt)}</p>
                        </div>

                        <div className="flex gap-2">
                            <Button disabled={!editMode} form="form-update-service" type="submit" size="xs" variant="primary"  ><Save className="w-4 h-4 text-light" /> Guardar</Button>
                            <Button onClick={closeModal} type="button" size="xs" className="bg-error-dark/80! text-light"  ><X className="w-4 h-4 text-light" />Cancelar</Button>
                        </div>
                    </div>
                </form>
                {
                    (error?.message || errorDelete?.message) && (
                        <p className="flex items-center  gap-2 text-error text-xs mt-3"><FileExclamationPoint className="w-4 h-4" /> Ha ocurrido un error</p>
                    )
                }

            </Modal>

            {
                (isSuccess || isSuccessDelete) && <Alert title="Servicio actualizado" variant="success" timer={2500} />
            }
        </>
    );
};

export default EditServiceModal;