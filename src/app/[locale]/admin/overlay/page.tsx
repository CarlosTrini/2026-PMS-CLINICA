import OverlayView from "@/features/overlay";

import type { Metadata } from "next";

export const metadata: Metadata = {
    title:
        "Seleccionar su sede | PMS Clinica Portal Hospitalario",
    description: "Aquí seleccionará la sede en la cuál desea iniciar sesión",
};

export default function Home() {
    return (
        <OverlayView />
    );
}
