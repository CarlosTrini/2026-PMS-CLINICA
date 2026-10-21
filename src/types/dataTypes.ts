export type Relationships = 'father' | 'mother' | 'legalGuardian' | 'other';
export type Genders = 'male' | 'female' | 'other';
export type Specialty = 'familyMedicine' | 'generalMedicine' | 'dentistry' | 'veterinary' | 'psychology' | 'nutrition' | 'pediatrics' | 'geriatrics' | 'oncology' | 'cardiology' | 'neurology' | 'dermatology' | 'ophthalmology' | 'otorhinolaryngology' | 'orthopedics' | 'traumatology' | 'gynecology';
export type RoleSystem = 'admin' | 'professional' | 'assistant' | 'receptionist' | 'owner';
export type AppointmentStatus = 'SCHEDULED' | 'COMPLETED' | 'CANCELLED' | 'PENDING' | 'MISSED' | 'IN_PROGRESS' | 'RESCHEDULED';
export type Department = 'Cardiologist' | 'Dentist' | 'Neurologist' | 'Dermatologist' | 'Ophthalmologist' | 'Otorhinolaryngologist' | 'Orthopedist' | 'Traumatologist' | 'Gynecologist';
export type StatusProfessional = 'active' | 'inactive' | 'on_leave' | 'on_vacation' | 'in_consultation' | 'on_break' | 'incapacitated';

// ==================== COMMON DATA STRUCTURES ====================

export interface ContactInfo {
    email?: string;
    phone?: string;
    address?: string;
    city?: string;
    state?: string;
    zip?: string;
    country?: string;
}

export interface PersonalInfo {
    name: string;
    lastName: string;
    dateOfBirth: string;
    gender: Genders;
}

export interface ProfesionalInfo {
    specialty: Specialty;
    cedula: string;
    license: string;
}

// ==================== CLINICAL DATA STRUCTURES ====================

export interface Patient {
    id: string;
    personalInfo: PersonalInfo;
    contactInfo: ContactInfo;
    guardians?: Guardian[]; // para el caso de niños el tutor es el responsable de pago y decisiones
    allergies?: string[];
    createdAt: string;
    updatedAt: string;
}

export interface Guardian {
    id: string;
    personalInfo: PersonalInfo;
    contactInfo: ContactInfo;
    relationship: Relationships;
    createdAt: string;
    updatedAt: string;
}


export interface Professional {
    id: string;
    image: string;
    personalInfo: PersonalInfo;
    contactInfo: ContactInfo;
    profesionalInfo: ProfesionalInfo[];
    department: Department | '';
    createdAt: string;
    updatedAt: string;
    role: RoleSystem;
    status: StatusProfessional;
}


// ==================== APPOINTMENT DATA STRUCTURES ====================
export interface Appointment {
    id: string;
    patientId: string;
    professionalId: string;
    string: string;
    time: string;
    reason: string;
    status: AppointmentStatus;
    createdAt: string;
    updatedAt: string;
}



// ==================== INVENTORY DATA STRUCTURES ====================
// HACK: El inventario SIEMPRE se almacena y calcula internamente en su UNIDAD MÍNIMA DISPENSABLE (Base Unit).
// lo demás (cajas, frascos, blisters, bultos) son solo presentaciones con factores de conversión.



export interface Inventory {
    id: string;
    name: string;
    description: string;
    price: number;
    stock: number;
    qty: number;
    createdAt: string;
    updatedAt: string;
}

// ==================== USER SYSTEM DATA STRUCTURES ====================

export interface UserSystem {
    id: string;
    name: string;
    email: string;
    password: string;
    role: string;
    createdAt: string;
    updatedAt: string;
}