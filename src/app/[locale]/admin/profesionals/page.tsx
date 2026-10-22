
import ProfesionalsView from "@/features/profesionals/ProfesionalsView";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Gestión de Profesionales | PMS Clínica",
};

export default function Page() {
    return (
        <ProfesionalsView />
    )
}