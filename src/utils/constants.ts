import type { Headquarters, Personal } from "../types/dataTypes";

// TYPES VALUES ARRAYS FOR SELECTS 



export const SPECIALITY_ARRAY = ['family_medicine', 'general_medicine', 'dentistry', 'veterinary', 'psychology', 'nutrition', 'pediatrics', 'geriatrics', 'oncology', 'cardiology', 'neurology', 'dermatology', 'ophthalmology', 'otorhinolaryngology', 'orthopedics', 'traumatology', 'gynecology', 'urology', 'infectious_diseases', 'endocrinology', 'rheumatology', 'nephrology', 'hematology', 'pulmonology', 'gastroenterology', 'anesthesiology', 'emergency_medicine', 'internal_medicine', 'general_surgery', 'psychiatry', 'radiology', 'plastic_surgery', 'physical_therapy', 'midwifery'] as const;

// DATA QUE PUEDE PERMANECER EN EL SISTEMA..
export const ROLE_SYSTEM_ARRAY = ['admin', 'professional', 'assistant', 'receptionist', 'owner', 'no_role'] as const;
export const APPOINTMENT_STATUS_ARRAY = ['scheduled', 'completed', 'cancelled', 'pending', 'rescheduled', 'missed', 'in_progress', 'no_show'] as const;
export const GENDER_ARRAY = ['male', 'female', 'other', 'prefer_not_to_say'] as const;
export const RELATIONSHIP_ARRAY = ['father', 'mother', 'legal_guardian', 'other', 'spouse', 'son_daughter', 'sibling', 'grandparent', 'caregiver'] as const;
export const STATUS_PERSONAL_ARRAY = ['active', 'inactive', 'on_leave', 'on_vacation', 'in_consultation', 'on_break', 'incapacitated', 'suspended'] as const;

export const HEADQUARTERS_DEPARTMENT_ARRAY = ['outpatient', 'emergency', 'surgery', 'cardiology_unit', 'dentistry_unit', 'womens_health', 'pediatrics_unit', 'intensive_care', 'laboratory', 'imaging'] as const;

const headquartersSpecialities = (specialities: readonly (typeof SPECIALITY_ARRAY[number])[]) => specialities.map((value) => ({
    value,
    isActive: true,
}));

export const PERSONAL_DATA: Personal[] = [
    {
        "id": "pers-001",
        "status": "active",
        "image": "https://picsum.photos/seed/sofia/200/200",
        "personalInfo": {
            "name": "Sofía",
            "lastName": "García López",
            "dateOfBirth": "1985-03-14T00:00:00.000Z",
            "gender": "female"
        },
        "contactInfo": {
            "email": "sofia.garcia@example.com",
            "phone": "+525512345601",
            "address": "Av. Insurgentes Sur 120",
            "city": "Ciudad de México",
            "state": "CDMX",
            "zip": "03100",
            "country": "México"
        },
        "profesionalInfo": [
            {
                "speciality": "cardiology",
                "cedula": "CED-100001",
                "license": "LIC-200001"
            }
        ],
        "locationAssignments": [
            {
                "id": "assignment-pers-001",
                "headquartersId": "sede-insurgentes",
                "departmentId": "insurgentes-cardiologia",
                "speciality": "cardiology",
                "roleSystem": "admin"
            }
        ],
        "security": {
            "password": "Femalesystem22#",
            "mustChangePassword": false,
            "emailVerified": false,
            "inviteTokenHash": "",
            "inviteTokenExpiresAt": ""
        },
        "termsAcceptedAt": "2024-01-10T09:30:00.000Z",
        "lastLoginAt": "2024-02-15T08:10:00.000Z",
        "createdAt": "2024-01-08T16:00:00.000Z",
        "updatedAt": "2024-02-15T14:20:00.000Z"
    },
    {
        "id": "pers-002",
        "status": "active",
        "image": "https://picsum.photos/seed/mariana/200/200",
        "personalInfo": {
            "name": "Mariana",
            "lastName": "Torres Ruiz",
            "dateOfBirth": "1992-07-22T00:00:00.000Z",
            "gender": "female"
        },
        "contactInfo": {
            "email": "mariana.torres@example.com",
            "phone": "+525512345602",
            "address": "Calle Reforma 245",
            "city": "Ciudad de México",
            "state": "CDMX",
            "zip": "06600",
            "country": "México"
        },
        "profesionalInfo": [],
        "locationAssignments": [
            {
                "id": "assignment-pers-002",
                "headquartersId": "sede-insurgentes",
                "departmentId": "insurgentes-consulta",
                "speciality": "general_medicine",
                "roleSystem": "receptionist"
            }
        ],
        "security": {
            "password": "Femalesystem22#",
            "mustChangePassword": false,
            "emailVerified": false,
            "inviteTokenHash": "",
            "inviteTokenExpiresAt": ""
        },
        "termsAcceptedAt": "2024-01-12T10:00:00.000Z",
        "lastLoginAt": "2024-02-15T07:45:00.000Z",
        "createdAt": "2024-01-10T11:00:00.000Z",
        "updatedAt": "2024-02-01T09:00:00.000Z"
    },
    {
        "id": "pers-003",
        "status": "active",
        "image": "https://picsum.photos/seed/carlos/200/200",
        "personalInfo": {
            "name": "Carlos",
            "lastName": "Hernández Vega",
            "dateOfBirth": "1980-11-05T00:00:00.000Z",
            "gender": "male"
        },
        "contactInfo": {
            "email": "carlos.hernandez@example.com",
            "phone": "+525512345603",
            "address": "Calle Durango 88",
            "city": "Ciudad de México",
            "state": "CDMX",
            "zip": "06700",
            "country": "México"
        },
        "profesionalInfo": [
            {
                "speciality": "dermatology",
                "cedula": "CED-100003",
                "license": "LIC-200003"
            }
        ],
        "locationAssignments": [
            {
                "id": "assignment-pers-003-a",
                "headquartersId": "sede-insurgentes",
                "departmentId": "insurgentes-consulta",
                "speciality": "dermatology",
                "roleSystem": "professional"
            },
            {
                "id": "assignment-pers-003-b",
                "headquartersId": "sede-guadalajara",
                "speciality": "dermatology",
                "roleSystem": "professional"
            }
        ],
        "security": {
            "password": "Malesystem22#",
            "mustChangePassword": false,
            "emailVerified": false,
            "inviteTokenHash": "",
            "inviteTokenExpiresAt": ""
        },
        "termsAcceptedAt": "2024-01-15T12:00:00.000Z",
        "lastLoginAt": "2024-02-14T18:30:00.000Z",
        "createdAt": "2024-01-12T10:00:00.000Z",
        "updatedAt": "2024-02-14T18:30:00.000Z"
    },
    {
        "id": "pers-004",
        "status": "on_leave",
        "image": "https://picsum.photos/seed/daniel/200/200",
        "personalInfo": {
            "name": "Daniel",
            "lastName": "Hernández Ruiz",
            "dateOfBirth": "1978-07-22T00:00:00.000Z",
            "gender": "male"
        },
        "contactInfo": {
            "email": "daniel.hernandez@example.com",
            "phone": "+525512345604",
            "address": "Calle Reforma 245",
            "city": "Guadalajara",
            "state": "Jalisco",
            "zip": "44100",
            "country": "México"
        },
        "profesionalInfo": [
            {
                "speciality": "general_medicine",
                "cedula": "CED-100002",
                "license": "LIC-200002"
            },
            {
                "speciality": "family_medicine",
                "cedula": "CED-100002",
                "license": "LIC-200002"
            }
        ],
        "locationAssignments": [
            {
                "id": "assignment-pers-004",
                "headquartersId": "sede-guadalajara",
                "speciality": "general_medicine",
                "roleSystem": "admin"
            }
        ],
        "security": {
            "password": "Malesystem22#",
            "mustChangePassword": false,
            "emailVerified": false,
            "inviteTokenHash": "",
            "inviteTokenExpiresAt": ""
        },
        "termsAcceptedAt": "2024-01-12T11:00:00.000Z",
        "lastLoginAt": "2024-03-01T16:00:00.000Z",
        "createdAt": "2024-01-12T11:00:00.000Z",
        "updatedAt": "2024-03-01T16:45:00.000Z"
    },
    {
        "id": "pers-005",
        "status": "in_consultation",
        "image": "https://picsum.photos/seed/camila/200/200",
        "personalInfo": {
            "name": "Camila",
            "lastName": "González Rivera",
            "dateOfBirth": "1993-06-30T00:00:00.000Z",
            "gender": "female"
        },
        "contactInfo": {
            "email": "camila.gonzalez@example.com",
            "phone": "+525512345605",
            "address": "Av. Colón 154",
            "city": "Mérida",
            "state": "Yucatán",
            "zip": "97000",
            "country": "México"
        },
        "profesionalInfo": [
            {
                "speciality": "psychology",
                "cedula": "CED-100005",
                "license": "LIC-200005"
            }
        ],
        "locationAssignments": [
            {
                "id": "assignment-pers-005",
                "headquartersId": "sede-insurgentes",
                "departmentId": "insurgentes-consulta",
                "speciality": "psychology",
                "roleSystem": "professional"
            }
        ],
        "security": {
            "password": "Femalesystem22#",
            "mustChangePassword": false,
            "emailVerified": false,
            "inviteTokenHash": "",
            "inviteTokenExpiresAt": ""
        },
        "termsAcceptedAt": "2024-03-03T13:20:00.000Z",
        "lastLoginAt": "2024-06-12T08:00:00.000Z",
        "createdAt": "2024-03-03T13:20:00.000Z",
        "updatedAt": "2024-06-12T15:10:00.000Z"
    },
    {
        "id": "pers-006",
        "status": "on_break",
        "image": "https://picsum.photos/seed/diego/200/200",
        "personalInfo": {
            "name": "Diego",
            "lastName": "Ramírez Flores",
            "dateOfBirth": "1975-09-12T00:00:00.000Z",
            "gender": "male"
        },
        "contactInfo": {
            "email": "diego.ramirez@example.com",
            "phone": "+525512345606",
            "address": "Blvd. Bernardo Quintana 410",
            "city": "Querétaro",
            "state": "Querétaro",
            "zip": "76000",
            "country": "México"
        },
        "profesionalInfo": [
            {
                "speciality": "orthopedics",
                "cedula": "CED-100006",
                "license": "LIC-200006"
            },
            {
                "speciality": "traumatology",
                "cedula": "CED-100006",
                "license": "LIC-200006"
            }
        ],
        "locationAssignments": [
            {
                "id": "assignment-pers-006",
                "headquartersId": "sede-insurgentes",
                "departmentId": "insurgentes-consulta",
                "speciality": "orthopedics",
                "roleSystem": "professional"
            }
        ],
        "security": {
            "password": "Malesystem22#",
            "mustChangePassword": false,
            "emailVerified": false,
            "inviteTokenHash": "",
            "inviteTokenExpiresAt": ""
        },
        "termsAcceptedAt": "2024-03-15T07:50:00.000Z",
        "lastLoginAt": "2024-07-01T07:30:00.000Z",
        "createdAt": "2024-03-15T07:50:00.000Z",
        "updatedAt": "2024-07-01T11:25:00.000Z"
    },
    {
        "id": "pers-007",
        "status": "inactive",
        "image": "https://picsum.photos/seed/lucia/200/200",
        "personalInfo": {
            "name": "Lucía",
            "lastName": "Sánchez Ortega",
            "dateOfBirth": "1988-12-03T00:00:00.000Z",
            "gender": "female"
        },
        "contactInfo": {
            "email": "lucia.sanchez@example.com",
            "phone": "+525512345607",
            "address": "Calle Morelos 62",
            "city": "Toluca",
            "state": "Estado de México",
            "zip": "50000",
            "country": "México"
        },
        "locationAssignments": [
            {
                "id": "assignment-pers-007",
                "headquartersId": "sede-insurgentes",
                "departmentId": "insurgentes-urgencias",
                "speciality": "emergency_medicine",
                "roleSystem": "assistant"
            }
        ],
        "security": {
            "password": "Femalesystem22#",
            "mustChangePassword": false,
            "emailVerified": false,
            "inviteTokenHash": "",
            "inviteTokenExpiresAt": ""
        },
        "termsAcceptedAt": "2024-04-02T12:10:00.000Z",
        "lastLoginAt": "2024-07-18T08:40:00.000Z",
        "createdAt": "2024-04-02T12:10:00.000Z",
        "updatedAt": "2024-07-18T08:40:00.000Z"
    },
    {
        "id": "pers-008",
        "status": "on_vacation",
        "image": "https://picsum.photos/seed/alejandro/200/200",
        "personalInfo": {
            "name": "Alejandro",
            "lastName": "López Mendoza",
            "dateOfBirth": "1982-01-19T00:00:00.000Z",
            "gender": "male"
        },
        "contactInfo": {
            "email": "alejandro.lopez@example.com",
            "phone": "+525512345608",
            "address": "Calle Juárez 87",
            "city": "Puebla",
            "state": "Puebla",
            "zip": "72000",
            "country": "México"
        },
        "profesionalInfo": [
            {
                "speciality": "dentistry",
                "cedula": "CED-100004",
                "license": "LIC-200004"
            }
        ],
        "locationAssignments": [
            {
                "id": "assignment-pers-008",
                "headquartersId": "sede-guadalajara",
                "speciality": "dentistry",
                "roleSystem": "owner"
            }
        ],
        "security": {
            "password": "Malesystem22#",
            "mustChangePassword": false,
            "emailVerified": false,
            "inviteTokenHash": "",
            "inviteTokenExpiresAt": ""
        },
        "termsAcceptedAt": "2024-02-18T10:45:00.000Z",
        "lastLoginAt": "2024-05-02T09:00:00.000Z",
        "createdAt": "2024-02-18T10:45:00.000Z",
        "updatedAt": "2024-05-02T09:00:00.000Z"
    }
]



export const HEADQUARTERS_DATA: Headquarters[] = [
    {
        id: 'sede-insurgentes',
        name: 'Sede Central Insurgentes',
        city: 'Ciudad de Mexico',
        address: 'Av. Insurgentes Sur 1450, Col. Actipan, Benito Juarez, CDMX',
        phone: '(55) 5482-1000',
        whatsapp: '+52 55 1234 5601',
        hours: 'Lunes a Domingo: 24 Horas',
        emergency: 'Urgencias y Terapia 24/7',
        image: 'https://picsum.photos/id/1076/800/600',
        services: ['Hospitalizacion', 'Terapia Intensiva', 'Resonancia Magnetica', 'Laboratorio 24h', 'Banco de Sangre'],
        specialities: headquartersSpecialities([
            'cardiology', 'general_medicine', 'family_medicine', 'pediatrics', 'psychology',
            'orthopedics', 'dermatology', 'neurology', 'nutrition', 'oncology', 'gynecology',
            'ophthalmology', 'dentistry', 'emergency_medicine', 'radiology'
        ]),
        departments: [
            { id: 'insurgentes-consulta', headquartersId: 'sede-insurgentes', value: 'outpatient', isActive: true, specialities: ['cardiology', 'general_medicine', 'family_medicine', 'pediatrics', 'psychology', 'orthopedics', 'dermatology', 'neurology', 'nutrition', 'oncology', 'gynecology', 'ophthalmology', 'dentistry'] },
            { id: 'insurgentes-urgencias', headquartersId: 'sede-insurgentes', value: 'emergency', isActive: true, specialities: ['emergency_medicine', 'general_medicine'] },
            { id: 'insurgentes-cardiologia', headquartersId: 'sede-insurgentes', value: 'cardiology_unit', isActive: true, specialities: ['cardiology'] },
            { id: 'insurgentes-terapia-intensiva', headquartersId: 'sede-insurgentes', value: 'intensive_care', isActive: true, specialities: ['cardiology', 'emergency_medicine'] },
            { id: 'insurgentes-laboratorio', headquartersId: 'sede-insurgentes', value: 'laboratory', isActive: true, specialities: [] },
            { id: 'insurgentes-imagen', headquartersId: 'sede-insurgentes', value: 'imaging', isActive: true, specialities: ['radiology'] },
        ],
    },
    {
        id: 'sede-guadalajara',
        name: 'Sede Guadalajara Country',
        city: 'Guadalajara, Jalisco',
        address: 'Av. Circunvalacion Jorge Alvarez del Castillo 1240, Guadalajara, Jalisco',
        phone: '(33) 3818-4000',
        whatsapp: '+52 33 9876 5402',
        hours: 'Lunes a Sabado: 7:00 am - 9:00 pm | Urgencias 24h',
        emergency: 'Urgencias Medicas 24/7',
        image: 'https://picsum.photos/id/122/800/600',
        services: ['Consulta Especializada', 'Tomografia Axial', 'Check-ups Ejecutivos', 'Clinica Dental', 'Farmacia'],
        specialities: headquartersSpecialities(SPECIALITY_ARRAY),
        departments: [],
    },
];
