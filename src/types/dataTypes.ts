import { APPOINTMENT_STATUS_ARRAY, GENDER_ARRAY, RELATIONSHIP_ARRAY, ROLE_SYSTEM_ARRAY, SPECIALITY_ARRAY, STATUS_PERSONAL_ARRAY, HEADQUARTERS_DEPARTMENT_ARRAY } from '@/utils/constants';

export type Relationships = typeof RELATIONSHIP_ARRAY[number];
export type Genders = typeof GENDER_ARRAY[number];
export type Speciality = typeof SPECIALITY_ARRAY[number];
export type RoleSystem = typeof ROLE_SYSTEM_ARRAY[number];
export type AppointmentStatus = typeof APPOINTMENT_STATUS_ARRAY[number];
export type Department = typeof HEADQUARTERS_DEPARTMENT_ARRAY[number];
export type StatusPersonal = typeof STATUS_PERSONAL_ARRAY[number];

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

export interface HeadquartersDepartment {
    id: string;
    headquartersId: string;
    value: Department;
    isActive: boolean;
    specialities: Speciality[];
}

export interface PersonalLocationAssignment {
    id: string;
    headquartersId: string;
    speciality: Speciality;
    departmentId?: string;
    roleSystem: RoleSystem;
}

export interface Headquarters {
    id: string;
    name: string;
    city: string;
    address: string;
    phone: string;
    whatsapp: string;
    hours: string;
    emergency: string;
    image: string;
    services: string[];
    specialities: Speciality[];
    departments: HeadquartersDepartment[];
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


export interface Personal {
    id: string;
    image: string;
    personalInfo: PersonalInfo;
    contactInfo: ContactInfo;
    profesionalInfo?: ProfesionalInfo[] | [];
    locationAssignments: PersonalLocationAssignment[];
    termsAcceptedAt: string;
    lastLoginAt: string;
    createdAt: string;
    updatedAt: string;
    status: StatusPersonal;
    security: {
        password: string;
        mustChangePassword: boolean;
        emailVerified: boolean;
        inviteTokenHash?: string;       // guarda el hash del token, no el token
        inviteTokenExpiresAt?: string;
    }
}

export interface UserSystem {
    id: Personal["id"]
    image: Personal["image"]
    name: Personal["personalInfo"]["name"]
    lastName: Personal["personalInfo"]["lastName"],
    assigments: Personal["locationAssignments"],
    status: Personal["status"]
    emailVerified: Personal["security"]["emailVerified"]


}

// ==================== APPOINTMENT DATA STRUCTURES ====================
export interface Appointment {
    id: string;
    patientId: string;
    personalId: string;
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



// ====================== DATA DE MÉTRICAS DE PERSONAL

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

// ====================== DATA DE AUTH: LOGIN

export interface AuthLogin {
    email: string;
    password: string;
}
