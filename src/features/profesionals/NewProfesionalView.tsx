'use client';

import { useState } from 'react';
import { Link } from '@/i18n/navigation';
import Input from '@/components/form/input/InputField';
import Label from '@/components/form/Label';
import Select from '@/components/form/select/Select';
import Button from '@/components/ui/button/Button';
import {
    ArrowLeft,
    CheckCircle2,
    Mail,
    Plus,
    Save,
    ShieldCheck,
    Stethoscope,
    Trash2,
    User,
    UserPlus,
} from 'lucide-react';
import {
    DEPARTMENT_ARRAY,
    GENDER_ARRAY,
    ROLE_SYSTEM_ARRAY,
    SPECIALITY_ARRAY,
    STATUS_PROFESSIONAL_ARRAY,
} from '@/utils/datadummy';

// Opciones preformateadas para los componentes Select
const ROLE_OPTIONS = ROLE_SYSTEM_ARRAY.map((role) => ({
    value: role,
    label: role === 'admin' ? 'Administrador'
        : role === 'professional' ? 'Médico Especialista'
            : role === 'assistant' ? 'Asistente Clínico'
                : role === 'receptionist' ? 'Recepcionista'
                    : 'Propietario / Director',
}));

const STATUS_OPTIONS = STATUS_PROFESSIONAL_ARRAY.map((status) => ({
    value: status,
    label: status === 'active' ? 'Activo'
        : status === 'inactive' ? 'Inactivo'
            : status === 'on_leave' ? 'Con permiso'
                : status === 'on_vacation' ? 'Vacaciones'
                    : status === 'in_consultation' ? 'En consulta'
                        : status === 'on_break' ? 'En descanso'
                            : 'Incapacitado',
}));

const GENDER_OPTIONS = GENDER_ARRAY.map((gender) => ({
    value: gender,
    label: gender === 'male' ? 'Masculino'
        : gender === 'female' ? 'Femenino'
            : 'Otro',
}));

const DEPARTMENT_OPTIONS = DEPARTMENT_ARRAY.map((dept) => ({
    value: dept,
    label: dept === 'no_department' ? 'Sin departamento asignado'
        : dept === 'general' ? 'Medicina General'
            : dept,
}));

const SPECIALITY_OPTIONS = SPECIALITY_ARRAY.map((spec) => ({
    value: spec,
    label: spec,
}));

export default function NewProfesionalView() {
    // Estado local para permitir agregar/quitar múltiples especialidades en la UI
    // (Listo para vincular con useFieldArray cuando configures react-hook-form)
    const [specialities, setSpecialities] = useState([
        { id: 1, speciality: '', cedula: '', license: '' },
    ]);

    const handleAddSpeciality = () => {
        setSpecialities((prev) => [
            ...prev,
            { id: Date.now(), speciality: '', cedula: '', license: '' },
        ]);
    };

    const handleRemoveSpeciality = (idToRemove: number) => {
        if (specialities.length === 1) return;
        setSpecialities((prev) => prev.filter((item) => item.id !== idToRemove));
    };

    return (
        <div className="w-full max-w-6xl mx-auto pb-16">
            {/* CABECERA & NAVEGACIÓN */}
            <header className="mb-8">
                <Link
                    href="/admin/profesionals"
                    className="inline-flex items-center gap-2 text-sm text-gray hover:text-brand dark:text-gray-light dark:hover:text-brand-light transition-colors mb-4"
                >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Volver al listado de profesionales</span>
                </Link>

                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-gray-light dark:border-gray-dark pb-6">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-brand/10 dark:bg-brand-dark/20 text-brand dark:text-brand-light flex items-center justify-center shrink-0">
                            <UserPlus className="w-6 h-6" />
                        </div>
                        <div>
                            <h1 className="text-xl sm:text-2xl font-bold text-gray-dark dark:text-gray-light">
                                Registrar Nuevo Profesional
                            </h1>
                            <p className="text-xs sm:text-sm text-gray dark:text-gray-light/60 mt-0.5">
                                Ingresa la información personal, datos de contacto y credenciales médicas para dar de alta en la clínica.
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <Link href="/admin/profesionals">
                            <Button variant="outline" size="sm">
                                Cancelar
                            </Button>
                        </Link>
                        {/* 
                          TODO: Cuando vincules useForm, puedes colocar type="submit" form="create-prof-form"
                        */}
                        <Button size="sm" className="flex items-center gap-2">
                            <Save className="w-4 h-4" />
                            <span>Guardar Profesional</span>
                        </Button>
                    </div>
                </div>
            </header>

            {/* FORMULARIO PRINCIPAL */}
            {/* 
              TODO: Conectar con onSubmit={handleSubmit(onHandleSubmit)} de react-hook-form
            */}
            <form id="create-prof-form" className="flex flex-col gap-8">

                {/* SECCIÓN 1: ROL, ESTADO Y DEPARTAMENTO */}
                <div className="rounded-xl generic-border-shadow bg-theme-light-dark p-6">
                    <div className="flex items-center gap-2.5 pb-4 mb-6 border-b border-gray-light dark:border-gray-dark">
                        <ShieldCheck className="w-5 h-5 text-brand dark:text-brand-light shrink-0" />
                        <div>
                            <h2 className="text-base font-semibold text-gray-dark dark:text-gray-light">
                                Rol y Estado del Personal
                            </h2>
                            <p className="text-xs text-gray dark:text-gray-light/60">
                                Asigna los permisos en el sistema clínico y el departamento operativo.
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                        <div>
                            <Label htmlFor="role" className="block text-xs font-medium mb-1.5">
                                Rol en el Sistema <span className="text-error">*</span>
                            </Label>
                            <Select
                                id="role"
                                options={ROLE_OPTIONS}
                                placeholder="Selecciona un rol"
                                defaultValue="professional"
                            />
                        </div>

                        <div>
                            <Label htmlFor="status" className="block text-xs font-medium mb-1.5">
                                Estado Inicial <span className="text-error">*</span>
                            </Label>
                            <Select
                                id="status"
                                options={STATUS_OPTIONS}
                                placeholder="Selecciona el estado"
                                defaultValue="active"
                            />
                        </div>

                        <div>
                            <Label htmlFor="department" className="block text-xs font-medium mb-1.5">
                                Departamento Clínico <span className="text-error">*</span>
                            </Label>
                            <Select
                                id="department"
                                options={DEPARTMENT_OPTIONS}
                                placeholder="Selecciona un departamento"
                                defaultValue="no_department"
                            />
                        </div>
                    </div>
                </div>

                {/* SECCIÓN 2: INFORMACIÓN PERSONAL */}
                <div className="rounded-xl generic-border-shadow bg-theme-light-dark p-6">
                    <div className="flex items-center gap-2.5 pb-4 mb-6 border-b border-gray-light dark:border-gray-dark">
                        <User className="w-5 h-5 text-brand dark:text-brand-light shrink-0" />
                        <div>
                            <h2 className="text-base font-semibold text-gray-dark dark:text-gray-light">
                                Datos Personales
                            </h2>
                            <p className="text-xs text-gray dark:text-gray-light/60">
                                Nombre completo, fecha de nacimiento y género biológico o registrado.
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div>
                            <Label htmlFor="name" className="block text-xs font-medium mb-1.5">
                                Nombre(s) <span className="text-error">*</span>
                            </Label>
                            <Input
                                id="name"
                                name="personalInfo.name"
                                placeholder="Ej. Carlos Eduardo"
                            />
                        </div>

                        <div>
                            <Label htmlFor="lastName" className="block text-xs font-medium mb-1.5">
                                Apellido(s) <span className="text-error">*</span>
                            </Label>
                            <Input
                                id="lastName"
                                name="personalInfo.lastName"
                                placeholder="Ej. González Rivera"
                            />
                        </div>

                        <div>
                            <Label htmlFor="dateOfBirth" className="block text-xs font-medium mb-1.5">
                                Fecha de Nacimiento <span className="text-error">*</span>
                            </Label>
                            <Input
                                id="dateOfBirth"
                                name="personalInfo.dateOfBirth"
                                type="date"
                            />
                            <p className="text-[11px] text-gray dark:text-gray-light/50 mt-1 italic">
                                * El profesional debe ser mayor de 18 años.
                            </p>
                        </div>

                        <div>
                            <Label htmlFor="gender" className="block text-xs font-medium mb-1.5">
                                Género <span className="text-error">*</span>
                            </Label>
                            <Select
                                id="gender"
                                options={GENDER_OPTIONS}
                                placeholder="Selecciona género"
                                defaultValue="other"
                            />
                        </div>
                    </div>
                </div>

                {/* SECCIÓN 3: INFORMACIÓN DE CONTACTO Y DIRECCIÓN */}
                <div className="rounded-xl generic-border-shadow bg-theme-light-dark p-6">
                    <div className="flex items-center gap-2.5 pb-4 mb-6 border-b border-gray-light dark:border-gray-dark">
                        <Mail className="w-5 h-5 text-brand dark:text-brand-light shrink-0" />
                        <div>
                            <h2 className="text-base font-semibold text-gray-dark dark:text-gray-light">
                                Datos de Contacto y Domicilio
                            </h2>
                            <p className="text-xs text-gray dark:text-gray-light/60">
                                Vías directas de comunicación y dirección fiscal o personal.
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div>
                            <Label htmlFor="email" className="block text-xs font-medium mb-1.5">
                                Correo Electrónico <span className="text-error">*</span>
                            </Label>
                            <Input
                                id="email"
                                name="contactInfo.email"
                                type="email"
                                placeholder="ejemplo@clinica.com"
                            />
                        </div>

                        <div>
                            <Label htmlFor="phone" className="block text-xs font-medium mb-1.5">
                                Teléfono Principal <span className="text-error">*</span>
                            </Label>
                            <Input
                                id="phone"
                                name="contactInfo.phone"
                                placeholder="+52 55 1234 5678"
                            />
                        </div>

                        <div className="sm:col-span-2">
                            <Label htmlFor="address" className="block text-xs font-medium mb-1.5">
                                Dirección (Calle, Número, Colonia) <span className="text-error">*</span>
                            </Label>
                            <Input
                                id="address"
                                name="contactInfo.address"
                                placeholder="Av. Insurgentes Sur 1234, Col. Del Valle"
                            />
                        </div>

                        <div>
                            <Label htmlFor="city" className="block text-xs font-medium mb-1.5">
                                Ciudad <span className="text-error">*</span>
                            </Label>
                            <Input
                                id="city"
                                name="contactInfo.city"
                                placeholder="Ej. Ciudad de México"
                            />
                        </div>

                        <div>
                            <Label htmlFor="state" className="block text-xs font-medium mb-1.5">
                                Estado / Provincia <span className="text-error">*</span>
                            </Label>
                            <Input
                                id="state"
                                name="contactInfo.state"
                                placeholder="Ej. CDMX"
                            />
                        </div>

                        <div>
                            <Label htmlFor="zip" className="block text-xs font-medium mb-1.5">
                                Código Postal <span className="text-error">*</span>
                            </Label>
                            <Input
                                id="zip"
                                name="contactInfo.zip"
                                placeholder="Ej. 03100"
                            />
                        </div>

                        <div>
                            <Label htmlFor="country" className="block text-xs font-medium mb-1.5">
                                País <span className="text-error">*</span>
                            </Label>
                            <Input
                                id="country"
                                name="contactInfo.country"
                                placeholder="Ej. México"
                                defaultValue="México"
                            />
                        </div>
                    </div>
                </div>

                {/* SECCIÓN 4: ESPECIALIDADES MÉDICAS Y CREDENCIALES */}
                <div className="rounded-xl generic-border-shadow bg-theme-light-dark p-6">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-4 mb-6 border-b border-gray-light dark:border-gray-dark">
                        <div className="flex items-center gap-2.5">
                            <Stethoscope className="w-5 h-5 text-brand dark:text-brand-light shrink-0" />
                            <div>
                                <h2 className="text-base font-semibold text-gray-dark dark:text-gray-light">
                                    Especialidades y Credenciales Médicas
                                </h2>
                                <p className="text-xs text-gray dark:text-gray-light/60">
                                    Registra una o más especialidades con su respectiva cédula profesional y licencia.
                                </p>
                            </div>
                        </div>

                        <button
                            type="button"
                            onClick={handleAddSpeciality}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-brand/10 dark:bg-brand-dark/20 text-brand dark:text-brand-light hover:bg-brand hover:text-light transition-all w-fit"
                        >
                            <Plus className="w-3.5 h-3.5" />
                            <span>Añadir Especialidad</span>
                        </button>
                    </div>

                    <div className="flex flex-col gap-4">
                        {specialities.map((item, index) => (
                            <div
                                key={item.id}
                                className="relative p-4 rounded-xl border border-gray-light dark:border-gray-dark bg-light dark:bg-black/30"
                            >
                                <div className="flex items-center justify-between mb-3">
                                    <span className="text-xs font-bold uppercase text-brand dark:text-brand-light">
                                        Especialidad #{index + 1}
                                    </span>
                                    {specialities.length > 1 && (
                                        <button
                                            type="button"
                                            onClick={() => handleRemoveSpeciality(item.id)}
                                            className="text-xs text-error hover:text-error-dark dark:hover:text-error-light inline-flex items-center gap-1 transition-colors"
                                            title="Eliminar especialidad"
                                        >
                                            <Trash2 className="w-3.5 h-3.5" />
                                            <span>Quitar</span>
                                        </button>
                                    )}
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                    <div>
                                        <Label className="block text-xs font-medium mb-1.5">
                                            Especialidad Médica <span className="text-error">*</span>
                                        </Label>
                                        <Select
                                            options={SPECIALITY_OPTIONS}
                                            placeholder="Seleccionar especialidad"
                                        />
                                    </div>

                                    <div>
                                        <Label className="block text-xs font-medium mb-1.5">
                                            Cédula Profesional <span className="text-error">*</span>
                                        </Label>
                                        <Input
                                            name={`profesionalInfo.${index}.cedula`}
                                            placeholder="Ej. CED-1234567"
                                        />
                                    </div>

                                    <div>
                                        <Label className="block text-xs font-medium mb-1.5">
                                            Licencia Médica <span className="text-error">*</span>
                                        </Label>
                                        <Input
                                            name={`profesionalInfo.${index}.license`}
                                            placeholder="Ej. LIC-9876543"
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* BOTONES DE ACCIÓN INFERIORES */}
                <div className="flex flex-col-reverse sm:flex-row items-center justify-end gap-3 pt-4 border-t border-gray-light dark:border-gray-dark">
                    <Link href="/admin/profesionals" className="w-full sm:w-auto">
                        <Button variant="outline" size="md" className="w-full sm:w-auto">
                            Cancelar y Volver
                        </Button>
                    </Link>

                    {/* 
                      TODO: Vincula este botón con tu mutación useMutation() para guardar en la BD
                    */}
                    <Button
                        type="submit"
                        size="md"
                        className="w-full sm:w-auto flex items-center justify-center gap-2"
                    >
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Completar Registro</span>
                    </Button>
                </div>
            </form>
        </div>
    );
}
