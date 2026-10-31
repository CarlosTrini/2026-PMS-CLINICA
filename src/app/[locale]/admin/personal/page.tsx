import PersonalView from "@/features/personal";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Gestión de Personal | PMS Clínica",
};

export default function Page() {
    return (
        <PersonalView />
    )
}

