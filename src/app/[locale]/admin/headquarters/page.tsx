import { HeadquartersView } from "@/features/headquarters";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Gestión de sedes | PMS Clínica",
};

export default function Page() {
    return (
        <HeadquartersView />
    )
}

