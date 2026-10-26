import NewProfesionalView from "@/features/profesionals/NewProfesionalView";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Registrar Personal | PMS Clínica",
    description: "Formulario para dar de alta a nuevo personal y profesionales en el sistema clínico.",
};

export default function Page() {
    return <NewProfesionalView />;
}
