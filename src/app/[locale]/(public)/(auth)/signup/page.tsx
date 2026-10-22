import SignUpView from "@/features/auth/SignupView";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Registro | PMS Clínica",
  description: "Registro de nuevos profesionales",
  // other metadata
};

export default function SignUp() {
  return <SignUpView />;
}
