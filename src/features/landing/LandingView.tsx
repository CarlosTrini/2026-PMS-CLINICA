"use client";

import React, { useState } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import {
  SPECIALITY_ARRAY,
  PERSONAL_DATA,
  HEADQUARTERS_DATA,
} from "@/utils/constants";

// 4 Sedes Hospitalarias Detalladas
// 4 Promociones Médicas Destacadas (Estudios y Consultas)
const MEDICAL_PROMOTIONS = [
  {
    id: "promo-checkup",
    title: "Check-up Integral Preventivo",
    category: "Estudios de Laboratorio y Gabinete",
    tag: "Más Solicitado",
    regularPrice: "$2,850 MXN",
    promoPrice: "$1,490 MXN",
    discount: "48% OFF",
    image: "https://picsum.photos/id/180/800/600",
    features: [
      "Química Sanguínea de 36 elementos",
      "Biometría Hemática Completa",
      "Examen General de Orina (EGO)",
      "Electrocardiograma de reposo interpretado",
      "Consulta médica de entrega de resultados",
    ],
    recommendedFor: "Hombres y mujeres mayores de 25 años como control anual preventivo.",
  },
  {
    id: "promo-tiroides",
    title: "Perfil Tiroideo y Metabólico",
    category: "Laboratorio Especializado",
    tag: "Salud Metabólica",
    regularPrice: "$1,980 MXN",
    promoPrice: "$990 MXN",
    discount: "50% OFF",
    image: "https://picsum.photos/id/1059/800/600",
    features: [
      "Perfil Tiroideo Completo (TSH, T3, T4 Libre)",
      "Glucosa e Insulina basal en suero",
      "Perfil de Lípidos (Colesterol y Triglicéridos)",
      "Consulta de valoración con Endocrinólogo",
    ],
    recommendedFor: "Pacientes con fatiga crónica, cambios de peso o antecedentes metabólicos.",
  },
  {
    id: "promo-cardio",
    title: "Consulta Cardiológica + Electrocardiograma",
    category: "Consulta con Especialista",
    tag: "Cuidado Cardiovascular",
    regularPrice: "$1,800 MXN",
    promoPrice: "$1,150 MXN",
    discount: "36% OFF",
    image: "https://picsum.photos/id/65/800/600",
    features: [
      "Valoración clínica por Cardiólogo Certificado",
      "Electrocardiograma digital de 12 derivaciones",
      "Monitoreo de presión arterial y saturación",
      "Cálculo de riesgo cardiovascular personalizado",
    ],
    recommendedFor: "Personas con hipertensión, antecedentes familiares o que inician ejercicio.",
  },
  {
    id: "promo-pediatrico",
    title: "Paquete Pediátrico y Escolar",
    category: "Salud Infantil",
    tag: "Prevención Escolar",
    regularPrice: "$1,400 MXN",
    promoPrice: "$750 MXN",
    discount: "46% OFF",
    image: "https://picsum.photos/id/1060/800/600",
    features: [
      "Consulta exhaustiva con Médico Pediatra",
      "Examen agudeza visual y auditiva básico",
      "Revisión de cartilla de vacunación y desarrollo",
      "Certificado médico oficial escolar",
    ],
    recommendedFor: "Bebés, niñas y niños para ingreso escolar o chequeo semestral.",
  },
];

// Nombres y descripciones amigables para las especialidades del ARR as const
const SPECIALITY_DETAILS: Record<string, { label: string; desc: string }> = {
  familyMedicine: { label: "Medicina Familiar", desc: "Cuidado continuo y preventivo para toda la familia." },
  generalMedicine: { label: "Medicina General", desc: "Diagnóstico inicial, control y canalización médica oportuna." },
  cardiology: { label: "Cardiología", desc: "Prevención, diagnóstico y tratamiento de enfermedades cardíacas." },
  pediatrics: { label: "Pediatría", desc: "Atención especializada para el sano desarrollo de niños y adolescentes." },
  neurology: { label: "Neurología", desc: "Diagnóstico de padecimientos del sistema nervioso y cefaleas." },
  dermatology: { label: "Dermatología", desc: "Cuidado clínico y tratamiento de la piel, cabello y uñas." },
  ophthalmology: { label: "Oftalmología", desc: "Salud ocular integral, graduación y microcirugía especializada." },
  gynecology: { label: "Ginecología y Obstetricia", desc: "Salud integral femenina, control prenatal y colposcopía." },
  orthopedics: { label: "Ortopedia y Traumatología", desc: "Tratamiento de lesiones musculoesqueléticas y articulaciones." },
  dentistry: { label: "Odontología Integral", desc: "Salud bucal, endodoncia, ortodoncia y estética dental." },
  nutrition: { label: "Nutrición Clínica", desc: "Planes alimenticios personalizados y control metabólico." },
  psychology: { label: "Psicología y Bienestar", desc: "Acompañamiento emocional, terapia cognitivo-conductual." },
  oncology: { label: "Oncología", desc: "Detección temprana y seguimiento de padecimientos oncológicos." },
  geriatrics: { label: "Geriatría", desc: "Atención médica integral centrada en el adulto mayor." },
  otorhinolaryngology: { label: "Otorrinolaringología", desc: "Tratamiento especializado de oídos, nariz y garganta." },
  veterinary: { label: "Veterinaria Preventiva", desc: "Servicio clínico complementario y salud comunitaria." },
  traumatology: { label: "Traumatología", desc: "Atención inmediata de fracturas, luxaciones y esguinces." },
};

export default function LandingView() {
  const departmentT = useTranslations("deparments");
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>("all");
  const [selectedBranch, setSelectedBranch] = useState<string>(HEADQUARTERS_DATA[0].id);

  // Filtrado de especialidades
  const selectedHeadquarters = HEADQUARTERS_DATA.find((branch) => branch.id === selectedBranch) ?? HEADQUARTERS_DATA[0];
  const branchSpecialities = selectedHeadquarters.specialities.filter(({ isActive }) => isActive).map(({ value }) => value);
  const filteredSpecialties =
    selectedSpecialty === "all"
      ? branchSpecialities.slice(0, 12)
      : branchSpecialities.filter((spec) => spec === selectedSpecialty);

  // Datos de doctores destacados tomados de PERSONAL_DATA
  const featuredDoctors = PERSONAL_DATA.filter((doctor) => doctor.locationAssignments.some((assignment) => assignment.headquartersId === selectedBranch)).slice(0, 4);

  return (
    <div className="min-h-screen bg-white text-gray-dark font-outfit antialiased selection:bg-brand selection:text-white">
      {/* ============================================================ */}
      {/* 1. TOP BAR DE URGENCIAS Y ATENCIÓN INMEDIATA                  */}
      {/* ============================================================ */}
      <div className="bg-brand-dark text-white text-xs py-2 px-4 border-b border-white/10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-4 flex-wrap justify-center md:justify-start">
            <span className="flex items-center gap-1.5 font-medium">
              <span className="h-2 w-2 rounded-full bg-error animate-pulse" />
              Línea de Urgencias 24/7: <strong className="text-white">(55) 5482-1000</strong>
            </span>
            <span className="hidden sm:inline text-white/40">|</span>
            <span className="flex items-center gap-1.5">
              WhatsApp Citas: <strong className="text-white">+52 55 1234 5600</strong>
            </span>
            <span className="hidden sm:inline text-white/40">|</span>
            <span>4 Sedes en México &bull; Hospital Central Certificado</span>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/signin"
              className="text-brand-light hover:text-white font-medium transition-colors"
            >
              Portal Médicos y Personal &rarr;
            </Link>
          </div>
        </div>
      </div>

      {/* ============================================================ */}
      {/* 2. NAVBAR INSTITUCIONAL                                      */}
      {/* ============================================================ */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-gray-light shadow-theme-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="h-10 w-10 rounded-lg bg-brand text-white flex items-center justify-center shadow-theme-xs transition-transform group-hover:scale-105">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
              </svg>
            </div>
            <div>
              <span className="text-xl font-extrabold tracking-tight text-gray-dark leading-tight block">
                PMS Clínica
              </span>
              <span className="text-2xs font-semibold uppercase tracking-wider text-brand block">
                Hospital &bull; Especialidades Médicas
              </span>
            </div>
          </Link>

          {/* Menú de Navegación */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-gray">
            <a href="#especialidades" className="hover:text-brand transition-colors">
              Especialidades
            </a>
            <a href="#promociones" className="hover:text-brand transition-colors">
              Promociones
            </a>
            <a href="#sedes" className="hover:text-brand transition-colors">
              Nuestras Sedes
            </a>
            <a href="#medicos" className="hover:text-brand transition-colors">
              Directorio Médico
            </a>
            <a href="#contacto" className="hover:text-brand transition-colors">
              Contacto y Citas
            </a>
          </nav>

          {/* CTAs */}
          <div className="flex items-center gap-3">
            <Link
              href="/signin"
              className="hidden sm:inline-flex items-center justify-center px-4 py-2 text-xs font-semibold text-gray-dark bg-light hover:bg-gray-light rounded-md border border-gray-light transition-colors"
            >
              Acceso Personal
            </Link>
            <a
              href="#contacto"
              className="inline-flex items-center justify-center px-5 py-2.5 text-xs font-bold text-white bg-brand hover:bg-brand-dark rounded-md shadow-theme-xs transition-colors"
            >
              Agendar Cita
            </a>
          </div>
        </div>
      </header>

      {/* ============================================================ */}
      {/* 3. HERO SECTION                                              */}
      {/* ============================================================ */}
      <section className="relative bg-light-accent py-14 sm:py-20 border-b border-gray-light overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Texto y Buscador */}
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-brand/10 border border-brand/20 text-brand text-xs font-bold uppercase tracking-wider mb-4">
                <span className="h-2 w-2 rounded-full bg-success animate-pulse" />
                Atención Médica Inmediata y Certificada
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-dark tracking-tight leading-tight mb-5">
                Cuidamos de tu salud con especialistas de excelencia y tecnología hospitalaria.
              </h1>
              <p className="text-base sm:text-lg text-gray leading-relaxed mb-8 max-w-2xl">
                En <strong>PMS Clínica</strong> contamos con más de 17 especialidades médicas, laboratorio de diagnóstico avanzado y 4 sedes preparadas para brindarte un trato humano, seguro y oportuno.
              </p>

              {/* Simulador rápido de búsqueda de cita */}
              <div className="bg-white p-4 sm:p-5 rounded-lg border border-gray-light shadow-theme-sm max-w-xl">
                <h3 className="text-xs font-bold uppercase tracking-wider text-gray-dark mb-3">
                  Encuentra tu consulta o estudio médico:
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                  <div>
                    <label htmlFor="hero-spec" className="block text-2xs font-semibold text-gray mb-1">
                      Especialidad de Interés
                    </label>
                    <select
                      id="hero-spec"
                      className="w-full text-xs h-10 px-3 bg-light rounded-md border border-gray-light text-gray-dark focus:outline-hidden focus:border-brand"
                      defaultValue=""
                    >
                      <option value="" disabled>Selecciona especialidad...</option>
                      {branchSpecialities.map((spec) => (
                        <option key={spec} value={spec}>
                          {SPECIALITY_DETAILS[spec]?.label || spec}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="hero-branch" className="block text-2xs font-semibold text-gray mb-1">
                      Sede más Cercana
                    </label>
                    <select
                      id="hero-branch"
                      className="w-full text-xs h-10 px-3 bg-light rounded-md border border-gray-light text-gray-dark focus:outline-hidden focus:border-brand"
                      defaultValue=""
                    >
                      <option value="" disabled>Selecciona tu sede...</option>
                      {HEADQUARTERS_DATA.map((b) => (
                        <option key={b.id} value={b.id}>
                          {b.name} ({b.city})
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <a
                  href="#contacto"
                  className="w-full inline-flex items-center justify-center py-2.5 px-4 bg-brand hover:bg-brand-dark text-white text-xs font-bold rounded-md shadow-theme-xs transition-colors"
                >
                  Solicitar Cita con Especialista &rarr;
                </a>
              </div>

              {/* Sellos de Confianza */}
              <div className="grid grid-cols-3 gap-3 mt-8 pt-6 border-t border-gray-light text-2xs font-semibold text-gray">
                <div className="flex items-center gap-2">
                  <span className="text-success font-bold text-sm">✓</span>
                  <span>Certificación Médica Nacional</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-success font-bold text-sm">✓</span>
                  <span>Laboratorio Clínico 24/7</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-success font-bold text-sm">✓</span>
                  <span>Expediente Digital Seguro</span>
                </div>
              </div>
            </div>

            {/* Imagen Hero Estática */}
            <div className="lg:col-span-5 relative">
              <div className="relative h-96 w-full rounded-lg overflow-hidden border border-gray-light shadow-theme-md">
                <Image
                  src="https://picsum.photos/id/433/1200/800"
                  alt="Instalaciones PMS Clínica Hospitalaria"
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-linear-to-t from-gray-dark/80 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-white p-3 bg-gray-dark/60 backdrop-blur-xs rounded-md border border-white/20">
                  <div className="text-xs font-bold text-brand-light">Sede Central Hospitalaria</div>
                  <p className="text-2xs text-white/90">
                    Instalaciones de vanguardia para consultas, diagnóstico y procedimientos médicos.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 4. CIFRAS Y PROMESAS DE SERVICIO                             */}
      {/* ============================================================ */}
      <section className="bg-white py-10 border-b border-gray-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="p-4 border-r last:border-r-0 border-gray-light">
              <div className="text-3xl sm:text-4xl font-extrabold text-brand mb-1">+{SPECIALITY_ARRAY.length}</div>
              <div className="text-xs font-bold uppercase tracking-wider text-gray-dark">Especialidades Médicas</div>
              <div className="text-2xs text-gray mt-1">Con médicos certificados</div>
            </div>
            <div className="p-4 border-r last:border-r-0 border-gray-light">
              <div className="text-3xl sm:text-4xl font-extrabold text-brand mb-1">4</div>
              <div className="text-xs font-bold uppercase tracking-wider text-gray-dark">Sedes Hospitalarias</div>
              <div className="text-2xs text-gray mt-1">CDMX, Jal, N.L. y Puebla</div>
            </div>
            <div className="p-4 border-r last:border-r-0 border-gray-light">
              <div className="text-3xl sm:text-4xl font-extrabold text-brand mb-1">+50k</div>
              <div className="text-xs font-bold uppercase tracking-wider text-gray-dark">Consultas Anuales</div>
              <div className="text-2xs text-gray mt-1">Atención humana y de calidad</div>
            </div>
            <div className="p-4">
              <div className="text-3xl sm:text-4xl font-extrabold text-brand mb-1">24/7</div>
              <div className="text-xs font-bold uppercase tracking-wider text-gray-dark">Urgencias y Farmacia</div>
              <div className="text-2xs text-gray mt-1">Respuesta inmediata</div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 5. PROMOCIONES DE ESTUDIOS MÉDICOS Y CONSULTAS (4 CARDS)    */}
      {/* ============================================================ */}
      <section id="promociones" className="py-16 bg-light-accent border-b border-gray-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-brand block mb-2">
              Promociones del Mes
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-dark tracking-tight">
              Paquetes de Estudios Clínicos y Consultas de Especialidad
            </h2>
            <p className="text-sm text-gray mt-3">
              Aprovecha nuestras tarifas preferenciales diseñadas para incentivar la medicina preventiva y el cuidado regular de toda tu familia.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {MEDICAL_PROMOTIONS.map((promo) => (
              <div
                key={promo.id}
                className="bg-white rounded-lg border border-gray-light shadow-theme-xs hover:shadow-theme-md transition-shadow flex flex-col overflow-hidden"
              >
                {/* Imagen Estática de la Card */}
                <div className="relative h-44 w-full bg-gray-light">
                  <Image
                    src={promo.image}
                    alt={promo.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 25vw"
                  />
                  <div className="absolute top-2.5 left-2.5 bg-brand text-white text-2xs font-bold px-2 py-0.5 rounded">
                    {promo.tag}
                  </div>
                  <div className="absolute top-2.5 right-2.5 bg-error text-white text-2xs font-bold px-2 py-0.5 rounded">
                    {promo.discount}
                  </div>
                </div>

                {/* Contenido */}
                <div className="p-5 flex-1 flex flex-col">
                  <div className="text-2xs uppercase tracking-wider font-semibold text-gray mb-1">
                    {promo.category}
                  </div>
                  <h3 className="text-base font-bold text-gray-dark leading-snug mb-3">
                    {promo.title}
                  </h3>

                  {/* Precios */}
                  <div className="flex items-baseline gap-2 mb-4">
                    <span className="text-xl font-extrabold text-brand">
                      {promo.promoPrice}
                    </span>
                    <span className="text-xs text-gray line-through">
                      {promo.regularPrice}
                    </span>
                  </div>

                  {/* Lista de Estudios Incluidos */}
                  <div className="mb-4 flex-1">
                    <div className="text-2xs font-bold uppercase tracking-wider text-gray-dark mb-2">
                      Incluye:
                    </div>
                    <ul className="space-y-1.5 text-xs text-gray">
                      {promo.features.map((feat, idx) => (
                        <li key={idx} className="flex items-start gap-1.5">
                          <span className="text-brand font-bold text-xs mt-0.5">✓</span>
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <p className="text-2xs text-gray/80 italic mb-4 border-t border-gray-light pt-2">
                    {promo.recommendedFor}
                  </p>

                  <a
                    href="#contacto"
                    className="w-full py-2.5 px-3 text-center text-xs font-bold text-white bg-brand hover:bg-brand-dark rounded-md transition-colors"
                  >
                    Agendar Paquete
                  </a>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center text-xs text-gray">
            * Promociones vigentes con previa cita en cualquiera de nuestras 4 sedes. Consulta términos en recepción.
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 6. ESPECIALIDADES MÉDICAS (TOMADAS DE ARR AS CONST)          */}
      {/* ============================================================ */}
      <section id="especialidades" className="py-16 bg-white border-b border-gray-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-brand block mb-2">
                Cartera de Especialidades
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-dark tracking-tight">
                Especialistas Médicos Certificados
              </h2>
              <p className="text-sm text-gray mt-2 max-w-xl">
                Contamos con médicos especialistas con cédula profesional y certificación vigente por sus respectivos consejos médicos.
              </p>
            </div>
            <div>
              <span className="text-xs font-semibold text-gray mr-2">Filtrar:</span>
              <button
                onClick={() => setSelectedSpecialty("all")}
                className={`px-3 py-1.5 text-xs font-medium rounded-md border mr-2 transition-colors ${selectedSpecialty === "all"
                  ? "bg-brand text-white border-brand"
                  : "bg-light text-gray-dark border-gray-light hover:bg-gray-light"
                  }`}
              >
              Todas ({branchSpecialities.length})
              </button>
            </div>
          </div>

          {/* Grid de Especialidades */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredSpecialties.map((spec) => {
              const details = SPECIALITY_DETAILS[spec] || {
                label: spec,
                desc: "Diagnóstico y tratamiento médico de primer nivel.",
              };

              return (
                <div
                  key={spec}
                  className="p-5 rounded-lg border border-gray-light bg-light-accent/60 hover:bg-white hover:border-brand/40 hover:shadow-theme-xs transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="h-9 w-9 rounded-md bg-brand/10 text-brand flex items-center justify-center font-bold text-sm mb-3">
                      ⚕
                    </div>
                    <h3 className="text-sm font-bold text-gray-dark mb-1.5">
                      {details.label}
                    </h3>
                    <p className="text-xs text-gray leading-relaxed mb-4">
                      {details.desc}
                    </p>
                  </div>
                  <a
                    href="#contacto"
                    className="text-2xs font-bold text-brand hover:text-brand-dark inline-flex items-center gap-1"
                  >
                    Consultar disponibilidad &rarr;
                  </a>
                </div>
              );
            })}
          </div>

          {/* Departamentos adicionales del ARR as const */}
          <div className="mt-10 p-5 rounded-lg border border-gray-light bg-light">
            <span className="text-xs font-bold uppercase tracking-wider text-gray-dark block mb-2">
              Departamentos Hospitalarios Activos:
            </span>
            <div className="flex flex-wrap gap-2">
              {selectedHeadquarters.departments.filter(({ isActive }) => isActive).map((dept) => (
                <span
                  key={dept.id}
                  className="px-2.5 py-1 text-2xs font-medium rounded bg-white border border-gray-light text-gray-dark"
                >
                  {departmentT(dept.value)}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 7. NUESTRAS SEDES (4 SEDES DETALLADAS)                       */}
      {/* ============================================================ */}
      <section id="sedes" className="py-16 bg-light-accent border-b border-gray-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-brand block mb-2">
              Cobertura Nacional
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-dark tracking-tight">
              4 Sedes Clínicas a tu Servicio
            </h2>
            <p className="text-sm text-gray mt-3">
              Instalaciones médicas de vanguardia en ubicaciones estratégicas, diseñadas para brindarte comodidad, rapidez y atención en urgencias las 24 horas.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {HEADQUARTERS_DATA.map((branch) => (
              <div
                key={branch.id}
                className={`bg-white rounded-lg border transition-all flex flex-col overflow-hidden ${selectedBranch === branch.id
                  ? "border-brand shadow-theme-md"
                  : "border-gray-light shadow-theme-xs hover:border-gray"
                  }`}
                onClick={() => setSelectedBranch(branch.id)}
              >
                {/* Imagen Estática de la Sede */}
                <div className="relative h-48 w-full bg-gray-light">
                  <Image
                    src={branch.image}
                    alt={branch.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 25vw"
                  />
                  <div className="absolute top-2.5 left-2.5 bg-gray-dark/80 text-white text-2xs font-bold px-2 py-0.5 rounded">
                    {branch.city}
                  </div>
                </div>

                <div className="p-5 flex-1 flex flex-col">
                  <h3 className="text-base font-bold text-gray-dark mb-2">
                    {branch.name}
                  </h3>
                  <p className="text-xs text-gray leading-relaxed mb-4">
                    📍 {branch.address}
                  </p>

                  <div className="space-y-2 text-xs border-t border-gray-light pt-3 mb-4">
                    <div className="flex items-center justify-between">
                      <span className="text-gray">Conmutador:</span>
                      <strong className="text-gray-dark">{branch.phone}</strong>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray">WhatsApp:</span>
                      <strong className="text-brand">{branch.whatsapp}</strong>
                    </div>
                    <div className="text-2xs text-gray">
                      🕒 {branch.hours}
                    </div>
                    <div className="text-2xs font-semibold text-error bg-error/10 px-2 py-1 rounded">
                      🚨 {branch.emergency}
                    </div>
                  </div>

                  {/* Servicios Destacados */}
                  <div className="mt-auto border-t border-gray-light pt-3">
                    <span className="text-2xs font-bold uppercase tracking-wider text-gray-dark block mb-1.5">
                      Servicios Clave:
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {branch.services.slice(0, 3).map((srv, idx) => (
                        <span key={idx} className="text-2xs px-1.5 py-0.5 rounded bg-light text-gray">
                          {srv}
                        </span>
                      ))}
                    </div>
                  </div>

                  <a
                    href="#contacto"
                    className="mt-4 w-full py-2 px-3 text-center text-xs font-bold text-gray-dark bg-light hover:bg-brand hover:text-white rounded-md transition-colors"
                  >
                    Agendar en esta Sede
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 8. DIRECTORIO MÉDICO (DATOS DE PERSONAL_DATA)                */}
      {/* ============================================================ */}
      <section id="medicos" className="py-16 bg-white border-b border-gray-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-brand block mb-2">
              Cuerpo Médico
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-dark tracking-tight">
              Especialistas con Alto Sentido Humano
            </h2>
            <p className="text-sm text-gray mt-3">
              Nuestro equipo está conformado por médicas y médicos reconocidos a nivel nacional, con amplia trayectoria en investigación y práctica clínica.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredDoctors.map((doc, idx) => {
              const specKey = doc.profesionalInfo?.[0]?.speciality || "generalMedicine";
              const specLabel = SPECIALITY_DETAILS[specKey]?.label || specKey;
              // Static picsum portrait IDs
              const staticPortraits = [
                "https://picsum.photos/id/64/400/400",
                "https://picsum.photos/id/91/400/400",
                "https://picsum.photos/id/338/400/400",
                "https://picsum.photos/id/399/400/400",
              ];

              return (
                <div
                  key={doc.id}
                  className="rounded-lg border border-gray-light bg-white p-5 shadow-theme-xs hover:shadow-theme-md transition-shadow flex flex-col items-center text-center"
                >
                  <div className="relative h-24 w-24 rounded-full overflow-hidden mb-4 ring-2 ring-brand/20">
                    <Image
                      src={staticPortraits[idx] || "https://picsum.photos/id/64/400/400"}
                      alt={`${doc.personalInfo.name} ${doc.personalInfo.lastName}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <h3 className="text-sm font-bold text-gray-dark leading-tight">
                    Dr. {doc.personalInfo.name} {doc.personalInfo.lastName}
                  </h3>
                  <div className="text-xs font-semibold text-brand mt-1 mb-2">
                    {specLabel}
                  </div>
                  <div className="text-2xs text-gray space-y-0.5 mb-4">
                    <div>Cédula: <strong>{doc.profesionalInfo?.[0]?.cedula}</strong></div>
                    <div>Sede: {doc.contactInfo.city}</div>
                  </div>
                  <a
                    href="#contacto"
                    className="mt-auto w-full py-1.5 px-3 text-2xs font-bold text-brand bg-brand/10 hover:bg-brand hover:text-white rounded-md transition-colors"
                  >
                    Agendar Consulta
                  </a>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 9. CONTACTO Y FORMULARIO DE CITAS                            */}
      {/* ============================================================ */}
      <section id="contacto" className="py-16 bg-light-accent border-b border-gray-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Información de Contacto */}
            <div className="lg:col-span-5 flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-brand block mb-2">
                  Atención Inmediata
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-dark tracking-tight mb-4">
                  Agenda tu Consulta o Estudio Clínico
                </h2>
                <p className="text-sm text-gray leading-relaxed mb-6">
                  Completa tus datos o comunícate directamente con nuestro conmutador central. Te asignaremos al especialista idóneo en la sede de tu elección.
                </p>

                <div className="space-y-4 text-xs">
                  <div className="p-4 rounded-lg bg-white border border-gray-light shadow-theme-xs">
                    <strong className="block text-gray-dark font-bold text-sm mb-1">
                      🚨 Urgencias Médicas y Hospitalización:
                    </strong>
                    <div className="text-error font-extrabold text-base">(55) 5482-1000</div>
                    <span className="text-2xs text-gray">Atención inmediata los 365 días del año</span>
                  </div>

                  <div className="p-4 rounded-lg bg-white border border-gray-light shadow-theme-xs">
                    <strong className="block text-gray-dark font-bold mb-1">
                      💬 Conmutador & WhatsApp Citas:
                    </strong>
                    <div className="text-brand font-bold text-sm">+52 55 1234 5600</div>
                    <div className="text-gray text-2xs">atencion@clinicapms.com</div>
                  </div>
                </div>
              </div>

              <div className="mt-8 text-2xs text-gray border-t border-gray-light pt-4">
                Protección de Datos: La información recabada está estrictamente reservada para fines de expedición y programación médica, conforme a la NOM-004-SSA3-2012 del Expediente Clínico.
              </div>
            </div>

            {/* Formulario Estático */}
            <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-lg border border-gray-light shadow-theme-xs">
              <h3 className="text-lg font-bold text-gray-dark mb-1">
                Solicitud de Cita Médica
              </h3>
              <p className="text-xs text-gray mb-6">
                Ingresa tus datos y un asesor médico te confirmará fecha y horario en menos de 2 horas.
              </p>

              <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="landing-name" className="block text-xs font-semibold text-gray-dark mb-1">
                      Nombre Completo <span className="text-error">*</span>
                    </label>
                    <input
                      id="landing-name"
                      name="name"
                      type="text"
                      placeholder="Ej. Juan Pérez"
                      className="w-full h-10 px-3 text-xs bg-light rounded-md border border-gray-light text-gray-dark focus:outline-hidden focus:border-brand"
                    />
                  </div>
                  <div>
                    <label htmlFor="landing-phone" className="block text-xs font-semibold text-gray-dark mb-1">
                      Teléfono Celular <span className="text-error">*</span>
                    </label>
                    <input
                      id="landing-phone"
                      name="phone"
                      type="tel"
                      placeholder="Ej. 55 1234 5678"
                      className="w-full h-10 px-3 text-xs bg-light rounded-md border border-gray-light text-gray-dark focus:outline-hidden focus:border-brand"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="landing-branch" className="block text-xs font-semibold text-gray-dark mb-1">
                      Sede de Preferencia <span className="text-error">*</span>
                    </label>
                    <select
                      id="landing-branch"
                      name="branch"
                      className="w-full h-10 px-3 text-xs bg-light rounded-md border border-gray-light text-gray-dark focus:outline-hidden focus:border-brand"
                      defaultValue=""
                    >
                      <option value="" disabled>Selecciona sede...</option>
                      {HEADQUARTERS_DATA.map((b) => (
                        <option key={b.id} value={b.id}>
                          {b.name} ({b.city})
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="landing-specialty" className="block text-xs font-semibold text-gray-dark mb-1">
                      Especialidad o Estudio <span className="text-error">*</span>
                    </label>
                    <select
                      id="landing-specialty"
                      name="specialty"
                      className="w-full h-10 px-3 text-xs bg-light rounded-md border border-gray-light text-gray-dark focus:outline-hidden focus:border-brand"
                      defaultValue=""
                    >
                      <option value="" disabled>Selecciona servicio...</option>
                      <optgroup label="Promociones">
                        {MEDICAL_PROMOTIONS.map((p) => (
                          <option key={p.id} value={p.id}>
                            {p.title}
                          </option>
                        ))}
                      </optgroup>
                      <optgroup label="Especialidades">
                        {branchSpecialities.map((s) => (
                          <option key={s} value={s}>
                            {SPECIALITY_DETAILS[s]?.label || s}
                          </option>
                        ))}
                      </optgroup>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="landing-notes" className="block text-xs font-semibold text-gray-dark mb-1">
                    Comentarios o Síntomas (Opcional)
                  </label>
                  <textarea
                    id="landing-notes"
                    name="notes"
                    rows={3}
                    placeholder="Describe brevemente el motivo de tu consulta o estudio requerido..."
                    className="w-full p-3 text-xs bg-light rounded-md border border-gray-light text-gray-dark focus:outline-hidden focus:border-brand"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-3 px-4 bg-brand hover:bg-brand-dark text-white text-xs font-bold rounded-md shadow-theme-xs transition-colors"
                  >
                    Confirmar Solicitud de Cita
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 10. FOOTER INSTITUCIONAL                                     */}
      {/* ============================================================ */}
      <footer className="bg-white border-t border-gray-light text-gray text-xs py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-10">
            {/* Columna Marca */}
            <div className="lg:col-span-2">
              <div className="flex items-center gap-2 mb-3">
                <div className="h-8 w-8 rounded-md bg-brand text-white flex items-center justify-center font-bold">
                  ⚕
                </div>
                <span className="text-base font-extrabold text-gray-dark tracking-tight">
                  PMS Clínica
                </span>
              </div>
              <p className="text-xs text-gray leading-relaxed mb-4 max-w-sm">
                Red médica hospitalaria privada con 4 sedes en México, comprometida con la excelencia diagnóstica, la seguridad clínica y el bienestar de cada paciente.
              </p>
              <div className="text-2xs text-gray/80 space-y-1">
                <div>Permiso de Publicidad COFEPRIS: <strong>243300201A0120</strong></div>
                <div>Responsable Sanitario: Dr. Carlos Trini &bull; Cédula Profesional: 100001</div>
              </div>
            </div>

            {/* Columna Sedes */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-gray-dark mb-3">
                Nuestras Sedes
              </h4>
              <ul className="space-y-2 text-xs">
                {HEADQUARTERS_DATA.map((b) => (
                  <li key={b.id}>
                    <a href="#sedes" className="hover:text-brand transition-colors">
                      {b.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Columna Especialidades */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-gray-dark mb-3">
                Especialidades
              </h4>
              <ul className="space-y-2 text-xs">
                <li><a href="#especialidades" className="hover:text-brand">Cardiología</a></li>
                <li><a href="#especialidades" className="hover:text-brand">Pediatría</a></li>
                <li><a href="#especialidades" className="hover:text-brand">Medicina General</a></li>
                <li><a href="#especialidades" className="hover:text-brand">Ginecología</a></li>
                <li><a href="#especialidades" className="hover:text-brand">Dermatología</a></li>
              </ul>
            </div>

            {/* Columna Enlaces de Sistema */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-gray-dark mb-3">
                Acceso al Sistema
              </h4>
              <ul className="space-y-2 text-xs">
                <li>
                  <Link href="/signin" className="hover:text-brand font-semibold">
                    Portal de Médicos
                  </Link>
                </li>
                <li>
                  <Link href="/signup" className="hover:text-brand">
                    Registro de Personal
                  </Link>
                </li>
                <li>
                  <Link href="/admin" className="hover:text-brand">
                    Dashboard Administrativo
                  </Link>
                </li>
                <li>
                  <a href="#promociones" className="hover:text-brand">
                    Check-ups y Promociones
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-light pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-2xs text-gray">
            <div>
              &copy; {new Date().getFullYear()} PMS Clínica. Todos los derechos reservados.
            </div>
            <div className="flex gap-4">
              <a href="#contacto" className="hover:underline">Aviso de Privacidad</a>
              <a href="#contacto" className="hover:underline">Términos y Condiciones</a>
              <a href="#contacto" className="hover:underline">Derechos del Paciente</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
