import SignInView from "@/features/auth/SigninView";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ingresar | PMS Clínica",
  description: "Ingresa a tu cuenta de profesional",
  // other metadata
};

export default function SignIn() {
  return <SignInView />;
}
