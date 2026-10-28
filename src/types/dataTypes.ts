export type Relationships = 'father' | 'mother' | 'legalGuardian' | 'other';
export type Genders = 'male' | 'female' | 'other';
export type Speciality = 'general' | 'familyMedicine' | 'generalMedicine' | 'dentistry' | 'veterinary' | 'psychology' | 'nutrition' | 'pediatrics' | 'geriatrics' | 'oncology' | 'cardiology' | 'neurology' | 'dermatology' | 'ophthalmology' | 'otorhinolaryngology' | 'orthopedics' | 'traumatology' | 'gynecology';
export type RoleSystem = 'admin' | 'professional' | 'assistant' | 'receptionist' | 'owner' | 'no_role';
export type AppointmentStatus = 'SCHEDULED' | 'COMPLETED' | 'CANCELLED' | 'PENDING' | 'MISSED' | 'IN_PROGRESS' | 'RESCHEDULED';
export type Department = 'no_department' | 'General' | 'Cardiologist' | 'Dentist' | 'Neurologist' | 'Dermatologist' | 'Ophthalmologist' | 'Otorhinolaryngologist' | 'Orthopedist' | 'Traumatologist' | 'Gynecologist';
export type StatusProfessional = 'active' | 'inactive' | 'on_leave' | 'on_vacation' | 'in_consultation' | 'on_break' | 'incapacitated';

// formato fechas ISO 8601 en UTC, por ejemplo, 2024-11-18T15:35:00.000Z

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
    speciality: Speciality;
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



// ====================== DATA DE MÉTRICAS DE PROFESSIONALS

export interface Metrics {
    total: number;
    status: {
        active: number;
        inactive: number;
        on_leave: number;
        on_vacation: number;
        in_consultation: number;
        on_break: number;
        incapacitated: number;
    };
    specialities: number;
    operatives: {
        percentaje: number;
    };
}




// ==================== USER SYSTEM DATA STRUCTURES ====================

// data general del usuario registrar para uso del sistema
export interface UserSystem {
    id: string;
    picture: string;
    name: string;
    lastName: string;
    email: string;
    password: string;
    role: RoleSystem;
    createdAt: string;
    updatedAt: string;
    termsAndConditions?: boolean;
    idEnterprise?: string;
}

// data del usuario usando el sistema
export interface UserSession extends Pick<UserSystem, 'id' | 'name' | 'email' | 'role' | 'picture' | 'idEnterprise'> { }

// ====================== DATA DE AUTH: REGISTRO/LOGIN

export interface AuthRegister extends Pick<UserSystem, 'name' | 'lastName' | 'email' | 'password' | 'termsAndConditions'> { }

export interface AuthLogin {
    email: string;
    password: string;
}