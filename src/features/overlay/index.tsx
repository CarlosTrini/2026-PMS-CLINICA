'use client';
import { useHeadquarterStore } from "@/store/useHeadquarterStore";
import { useUserStore } from "@/store/userStore";
// NAVIGATION
import { useRouter } from "@/i18n/navigation";
import OverlarHeadquarters from "./components/OverlayHeadquarters";
//TANKS
import { useMutation } from '@tanstack/react-query';
import { HeadquartersService } from "../headquarters/services/headquartersService";


export default function OverlayView() {

    const { allHeadquarters, setCurrentHeadquarter, currentHeadquarter } = useHeadquarterStore();
    const { setUserRole } = useUserStore();
    const Navigate = useRouter();



    // TRAER LA DATA DE LA SEDE SELECCIONADA POR EL USUARIO
    const { mutate: handleQuarters, isPending } = useMutation({
        mutationKey: ['headquarterbyid'],
        mutationFn: (id: string) => HeadquartersService.getHearquarterById(id),
        onSuccess: (res) => {
            setCurrentHeadquarter(res);
            // se actualiza el role del suaurio en el sistema


            Navigate.push('/admin');
        },
        onError: (err) => {
            console.error('Error al obtener la sede');
        }
    });

    // useEffect(() => {
    //     if (currentHeadquarter && currentHeadquarter?.id) {
    //         Navigate.push('/admin');
    //     }
    // }, [currentHeadquarter]);

    return (


        <OverlarHeadquarters
            assignsHeadquarters={allHeadquarters || []}
            headquarterSelected={(headquarterSelected) => {
                // se manda a traer la información de la sede seleccionada
                handleQuarters(headquarterSelected?.headquartersId);
                // se actualiza el role del usuario en el sistema en dicha sede
                setUserRole(headquarterSelected.roleSystem);
            }}
            isLoading={isPending}
        />
    );
}