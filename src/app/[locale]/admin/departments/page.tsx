import { DepartmentsView } from "@/features/departments";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Servicios de la sede | PMS Clínica",
    description: "Administración de los servicios de la sede.",
};

export default function Page() {
    return <DepartmentsView />;
}

