import NewPersonalView from "@/features/personal/NewPersonalView";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Registrar Personal | PMS Clínica",
    description: "Formulario para dar de alta a nuevo personal en el sistema clínico.",
};

export default function Page() {
    return <NewPersonalView />;
}

