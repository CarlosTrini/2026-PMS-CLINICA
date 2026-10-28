import type { StatusProfessional, AppointmentStatus } from "@/types/dataTypes";



export const STATUS_COLOR_SOLID: {
    [key in StatusProfessional | AppointmentStatus]: string;
} = {
    // Éxito / Operativo (Verdes: success -> success-dark)
    "active": "bg-gradient-to-r from-success to-success-dark text-light-accent shadow-xs",
    "completed": "bg-gradient-to-r from-success to-success-dark text-light-accent shadow-xs",

    // Error / Crítico (Rojos: error -> error-dark)
    "inactive": "bg-gradient-to-r from-error to-error-dark text-light-accent shadow-xs",
    "cancelled": "bg-gradient-to-r from-error to-error-dark text-light-accent shadow-xs",
    "missed": "bg-gradient-to-r from-error to-error-dark text-light-accent shadow-xs",
    "no_show": "bg-gradient-to-r from-error to-error-dark text-light-accent shadow-xs",
    "incapacitated": "bg-gradient-to-r from-error to-error-dark text-light-accent shadow-xs",
    "suspended": "bg-gradient-to-r from-error to-error-dark text-light-accent shadow-xs",

    // Alerta / Pendiente (Amarillos: warning -> warning-dark)
    "pending": "bg-gradient-to-r from-warning to-warning-dark text-light-accent shadow-xs",
    "on_break": "bg-gradient-to-r from-warning to-warning-dark text-light-accent shadow-xs",

    // Atención / Baja temporal (Naranjas: orange -> orange-dark)
    "on_leave": "bg-gradient-to-r from-orange to-orange-dark text-light-accent shadow-xs",

    // En curso / Enfoque (Brand azul: brand -> brand-dark)
    "in_consultation": "bg-gradient-to-r from-brand to-brand-dark text-light-accent shadow-xs",
    "in_progress": "bg-gradient-to-r from-brand to-brand-dark text-light-accent shadow-xs",

    // Informativo / Programado (Azul claro: blue-light -> blue-light-dark)
    "on_vacation": "bg-gradient-to-r from-blue-light to-blue-light-dark text-light-accent shadow-xs",
    "scheduled": "bg-gradient-to-r from-blue-light to-blue-light-dark text-light-accent shadow-xs",
    "rescheduled": "bg-gradient-to-r from-blue-light to-blue-light-dark text-light-accent shadow-xs",
};


export const STATUS_COLOR_LIGHT: {
    [key in StatusProfessional | AppointmentStatus]: string;
} = {
    // Éxito
    "active": "bg-success/20 border border-success/40 text-success-dark dark:text-success-light backdrop-blur-xs",
    "completed": "bg-success/20 border border-success/40 text-success-dark dark:text-success-light backdrop-blur-xs",

    // Error
    "inactive": "bg-error/20 border border-error/40 text-error-dark dark:text-error-light backdrop-blur-xs",
    "cancelled": "bg-error/20 border border-error/40 text-error-dark dark:text-error-light backdrop-blur-xs",
    "missed": "bg-error/20 border border-error/40 text-error-dark dark:text-error-light backdrop-blur-xs",
    "no_show": "bg-error/20 border border-error/40 text-error-dark dark:text-error-light backdrop-blur-xs",
    "incapacitated": "bg-error/20 border border-error/40 text-error-dark dark:text-error-light backdrop-blur-xs",
    "suspended": "bg-error/20 border border-error/40 text-error-dark dark:text-error-light backdrop-blur-xs",

    // Warning
    "pending": "bg-warning/20 border border-warning/40 text-warning-dark dark:text-warning-light backdrop-blur-xs",
    "on_break": "bg-warning/20 border border-warning/40 text-warning-dark dark:text-warning-light backdrop-blur-xs",

    // Orange
    "on_leave": "bg-orange/20 border border-orange/40 text-orange-dark dark:text-orange-light backdrop-blur-xs",

    // Brand
    "in_consultation": "bg-brand/20 border border-brand/40 text-brand-dark dark:text-brand-light backdrop-blur-xs",
    "in_progress": "bg-brand/20 border border-brand/40 text-brand-dark dark:text-brand-light backdrop-blur-xs",

    // Blue light
    "on_vacation": "bg-blue-light/20 border border-blue-light/40 text-blue-light-dark dark:text-blue-light-light backdrop-blur-xs",
    "scheduled": "bg-blue-light/20 border border-blue-light/40 text-blue-light-dark dark:text-blue-light-light backdrop-blur-xs",
    "rescheduled": "bg-blue-light/20 border border-blue-light/40 text-blue-light-dark dark:text-blue-light-light backdrop-blur-xs",
};
