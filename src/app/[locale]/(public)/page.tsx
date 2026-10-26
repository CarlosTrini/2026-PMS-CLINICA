import LandingView from "@/features/landing/LandingView";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "PMS Clínica | Hospital y Especialidades Médicas",
  description:
    "Atención médica integral, más de 17 especialidades médicas, laboratorio clínico y 4 sedes de alta especialidad en México.",
};

export default function HomePage() {
  return <LandingView />;
}
