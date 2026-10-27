import ThemeTogglerTwo from "@/components/common/ThemeTogglerTwo";
import { ThemeProvider } from "@/context/ThemeContext";
import { Link } from "@/i18n/navigation";
import Image from "next/image";
import React from "react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider>
      <div className="relative min-h-screen w-full bg-light-accent dark:bg-gray-dark">
        {/* Floating Theme Toggler */}
        <div className="fixed top-5 right-5 z-50">
          <ThemeTogglerTwo />
        </div>

        <div className="flex min-h-screen w-full flex-col lg:flex-row">
          {/* Left panel: Form Content */}
          <div className="flex w-full flex-col justify-center px-6 py-10 sm:px-12 md:px-16 lg:w-1/2 lg:px-20 xl:px-24">
            {children}
          </div>

          {/* Right panel: Modern Clinic Showcase */}
          <div className="relative hidden w-full lg:flex lg:w-1/2 lg:flex-col lg:justify-between overflow-hidden bg-gray-dark p-12 xl:p-16">
            {/* Background Image & Ambient Gradients */}
            <div className="absolute inset-0 z-0">
              <Image
                src="/images/auth-clinic.jpg"
                alt="PMS Clínica Médica"
                fill
                priority
                className="object-cover object-center"
                sizes="50vw"
              />
              {/* Gradient overlays to maintain high contrast with text */}
              <div className="absolute inset-0 bg-linear-to-t from-gray-dark via-gray-dark/75 to-brand-dark/50" />
              <div className="absolute inset-0 bg-brand-dark/20 mix-blend-multiply" />
            </div>

            {/* Header: Clinic Brand & Status */}
            <div className="relative z-10 flex items-center justify-between">
              <Link href="/" className="group flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand text-light-accent shadow-theme-md transition-transform group-hover:scale-105">
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                </div>
                <div>
                  <span className="text-xl font-bold tracking-tight text-light">
                    PMS Clínica
                  </span>
                  <span className="block text-xs font-medium text-brand-light">
                    Portal Hospitalario
                  </span>
                </div>
              </Link>

              <div className="flex items-center gap-2 rounded-full border border-gray/40 bg-black/40 px-3.5 py-1.5 text-xs font-semibold text-light backdrop-blur-sm">
                <span className="h-2 w-2 rounded-full bg-success animate-pulse" />
                <span>Sistema Activo</span>
              </div>
            </div>

            {/* Center Content: Hospital Value Proposition & Stats */}
            <div className="relative z-10 my-auto py-10 max-w-lg">
              <div className="inline-flex items-center gap-2 rounded-full border border-brand-light/30 bg-brand/20 px-3 py-1 text-xs font-semibold text-brand-light mb-4">
                <span>Gestión Médica Integral</span>
              </div>
              <h2 className="text-3xl font-extrabold text-light tracking-tight sm:text-4xl leading-tight mb-4">
                Tecnología al servicio del cuidado y la salud de tus pacientes.
              </h2>
              <p className="text-base text-gray-light/90 leading-relaxed mb-8">
                Centraliza expedientes clínicos, monitorea consultas en tiempo real y colabora con todo el equipo médico en una plataforma segura y eficiente.
              </p>

              {/* Highlight metrics */}
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-xl border border-gray/40 bg-black/40 p-4 backdrop-blur-sm">
                  <div className="text-2xl font-bold text-light mb-1">99.9%</div>
                  <div className="text-xs text-gray-light/75">
                    Disponibilidad de expedientes clínicos
                  </div>
                </div>
                <div className="rounded-xl border border-gray/40 bg-black/40 p-4 backdrop-blur-sm">
                  <div className="text-2xl font-bold text-brand-light mb-1">100% Digital</div>
                  <div className="text-xs text-gray-light/75">
                    Consultas, recetas y citas en la nube
                  </div>
                </div>
              </div>
            </div>

            {/* Footer Testimonial / Security Seal */}
            <div className="relative z-10">
              <div className="rounded-2xl border border-gray/40 bg-black/40 p-5 backdrop-blur-sm">
                <p className="text-sm text-gray-light italic mb-3">
                  &ldquo;Nuestra prioridad es la atención humana, respaldada por la mejor tecnología médica y rigor en la privacidad de datos.&rdquo;
                </p>
                <div className="flex items-center justify-between text-xs text-gray-light/70">
                  <span className="font-medium text-light">Comité de Dirección Médica</span>
                  <span>PMS Clínica &bull; 2026</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}
