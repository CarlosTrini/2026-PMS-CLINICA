import Input from "@/components/form/input/InputField";
import Label from "@/components/form/Label";
import Badge from "@/components/ui/badge/Badge";
import Button from "@/components/ui/button/Button";
import { Modal } from "@/components/ui/modal";;
import { FileExclamationPoint, Save, X } from "lucide-react";

import { useHeadquarterStore } from '@/store/useHeadquarterStore';
import Switch from "@/components/form/switch/Switch";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { formAddServiceData } from "../schemas/formAddServiceSchema";
import { formAddServiceDefault, formAddServiceSchema } from "../schemas/formAddServiceSchema";
import { useEffect, useState } from "react";
import { Services } from "@/types/dataTypes";
import { getISODate } from "@/utils/dates";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ServicesActionService } from "../services/service";
import Alert from "@/components/ui/alert/Alert";


// INTERFACE
interface Props {
    isOpen: boolean;
    handleToggle: () => void;
}

const AddServiceModal = ({ isOpen, handleToggle }: Props) => {

    // STORES
    const { currentHeadquarter } = useHeadquarterStore();
    const [statusValue, setStatusValue] = useState<formAddServiceData['status']>(false);

    //STATE

    // HOOK FORM
    const { register, handleSubmit, reset, subscribe, formState: { errors } } = useForm<formAddServiceData>({
        resolver: zodResolver(formAddServiceSchema),
        defaultValues: formAddServiceDefault
    })

    // QUERY
    const queryClient = useQueryClient();
    const { mutate: handleAddService, isPending, error, isSuccess } = useMutation({
        mutationKey: ['add-service-modal'],
        mutationFn: ({ idHq, service }: { idHq: string, service: Services }) => ServicesActionService.addNewService(idHq, service),
        onSuccess: async (res) => {
            await queryClient.invalidateQueries({
                queryKey: ['services-page-table', currentHeadquarter?.id]
            });
            closeModal();
        },
        onError: (err) => {
            console.error('Add service err: ', err?.message)
        }
    });


    // FUNCTIONS
    const handleAddServiceSubmit = (data: formAddServiceData) => {
        const fullDataService: Services = {
            id: crypto.randomUUID(),
            name: data.name,
            isActive: data.status!,
            createdAt: getISODate(),
            updatedAt: getISODate()
        };

        if (!currentHeadquarter?.id) return;

        handleAddService({ idHq: currentHeadquarter.id, service: fullDataService })
    }

    const closeModal = () => {
        reset();
        setStatusValue(false);
        handleToggle();
    }

    // EFFECTS
    useEffect(() => {
        const subscribeForm = subscribe({
            formState: {
                values: true
            },
            callback({ values, name }) {
                if (name == 'status') {
                    setStatusValue(values['status'])
                }

            }
        });

        return subscribeForm;
    }, [subscribe]);



    return (
        <>

            <Modal
                key={'add-service-modal'}
                showCloseButton={true}
                isOpen={isOpen}
                onClose={() => { closeModal(); }}
                className="max-w-120 dark:bg-gray-dark/80! p-5 rounded-lg"
                title={<div className="mb-5">
                    <h3 className="font-bold text-2xl text-theme-light-gray">Nuevo servicio</h3>
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
                <form id="form-add-service" onSubmit={handleSubmit(handleAddServiceSubmit)} action="">
                    <div className="sm:flex space-y-3 md:space-y-0 justify-between">
                        {/* body */}
                        {/* NOMBRE DEL SERVICIO */}
                        <div>
                            <Label key={'new-service-name'} htmlFor="newServiceName"> <span className="text-error text-lg">*</span> Nombre del servicio: </Label>
                            <Input
                                type="text"
                                placeholder="Ejem: Banco de sangre"
                                size="sm"
                                {...register("name")}
                                error={!!errors.name}
                            />
                        </div>

                        {/* ESTATUS */}
                        <div className="">
                            <Label key={'new-service-status'} htmlFor="newServiceStatus"> Estatus: </Label>
                            <div className="flex gap-2">

                                <Switch
                                    color="blue"
                                    size="sm"
                                    {...register('status')}
                                />

                                <p className="text-sm text-theme-light-gray">{statusValue ? 'Activo' : 'Inactivo'}</p>
                            </div>
                        </div>


                    </div>

                    <div>

                    </div>

                    <div className="flex justify-end gap-2 mt-5">
                        <Button form="form-add-service" type="submit" size="xs" variant="primary"  ><Save className="w-4 h-4 text-light" /> Guardar</Button>
                        <Button onClick={closeModal} type="button" size="xs" className="bg-error-dark/80! text-light"  ><X className="w-4 h-4 text-light" />Cancelar</Button>
                    </div>
                </form>
                {
                    error?.message && (
                        <p className="flex items-center  gap-2 text-error text-xs mt-3"><FileExclamationPoint className="w-4 h-4" /> Ha ocurrido un error</p>
                    )
                }


            </Modal>
            {
                isSuccess && <Alert title="Servicio agregado correctamente" variant="success" timer={2500} />
            }
        </>
    );
};

export default AddServiceModal;