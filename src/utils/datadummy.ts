import type { Professional } from "../types/dataTypes";

// TYPES VALUES ARRAYS FOR SELECTS 
export const ROLE_SYSTEM_ARRAY = ['admin', 'professional', 'assistant', 'receptionist', 'owner'] as const;
export const APPOINTMENT_STATUS_ARRAY = ['SCHEDULED', 'COMPLETED', 'CANCELLED', 'PENDING', 'RESCHEDULED', 'MISSED', 'IN_PROGRESS'] as const;
export const DEPARTMENT_ARRAY = ['noDepartment', 'Cardiologist', 'Dentist', 'Neurologist', 'Dermatologist', 'Ophthalmologist', 'Otorhinolaryngologist', 'Orthopedist', 'Traumatologist', 'Gynecologist', 'Urologist', 'InfectiousDiseases', 'Endocrinologist', 'Rheumatologist', 'Nephrologist', 'Hematologist', 'Pulmonologist', 'Gastroenterologist'] as const;
export const STATUS_PROFESSIONAL_ARRAY = ['active', 'inactive', 'on_leave', 'on_vacation', 'in_consultation', 'on_break', 'incapacitated'] as const;
export const SPECIALITY_ARRAY = ['familyMedicine', 'generalMedicine', 'dentistry', 'veterinary', 'psychology', 'nutrition', 'pediatrics', 'geriatrics', 'oncology', 'cardiology', 'neurology', 'dermatology', 'ophthalmology', 'otorhinolaryngology', 'orthopedics', 'traumatology', 'gynecology'] as const;
export const GENDER_ARRAY = ['male', 'female', 'other'] as const;
export const RELATIONSHIP_ARRAY = ['father', 'mother', 'legalGuardian', 'other'] as const;

export const PROFESIONALS_DATA: Professional[] = [
    {
        id: "prof-001",
        role: "admin",
        status: 'active',
        image: "https://picsum.photos/seed/face/200/200",
        personalInfo: {
            name: "Sofía",
            lastName: "García López",
            dateOfBirth: "1985-03-14T00:00:00.000Z",
            gender: "female"
        },
        department: "",
        contactInfo: {
            email: "sofia.garcia@example.com",
            phone: "+525512345601",
            address: "Av. Insurgentes Sur 120",
            city: "Ciudad de México",
            state: "CDMX",
            zip: "03100",
            country: "México"
        },
        profesionalInfo: [{
            speciality: "cardiology",
            cedula: "CED-100001",
            license: "LIC-200001"
        }],
        createdAt: "2024-01-10T09:30:00.000Z",
        updatedAt: "2024-02-15T14:20:00.000Z"
    },
    {
        id: "prof-002",
        status: 'on_leave',
        image: "https://picsum.photos/seed/face/200/200",
        role: 'admin',
        personalInfo: {
            name: "Daniel",
            lastName: "Hernández Ruiz",
            dateOfBirth: "1978-07-22T00:00:00.000Z",
            gender: "male"
        },
        department: "Dentist",
        contactInfo: {
            email: "daniel.hernandez@example.com",
            phone: "+525512345602",
            address: "Calle Reforma 245",
            city: "Guadalajara",
            state: "Jalisco",
            zip: "44100",
            country: "México"
        },
        profesionalInfo: [{
            speciality: "generalMedicine",
            cedula: "CED-100002",
            license: "LIC-200002"
        }, {
            speciality: "familyMedicine",
            cedula: "CED-100002",
            license: "LIC-200002"
        }],
        createdAt: "2024-01-12T11:00:00.000Z",
        updatedAt: "2024-03-01T16:45:00.000Z"
    },
    {
        id: "prof-003",
        status: 'incapacitated',
        image: "https://picsum.photos/seed/face/200/200",
        role: 'professional',
        personalInfo: {
            name: "Valentina",
            lastName: "Martínez Torres",
            dateOfBirth: "1990-11-05T00:00:00.000Z",
            gender: "female"
        },
        department: "Neurologist",
        contactInfo: {
            email: "valentina.martinez@example.com",
            phone: "+525512345603",
            address: "Av. Universidad 350",
            city: "Monterrey",
            state: "Nuevo León",
            zip: "64000",
            country: "México"
        },
        profesionalInfo: [{
            speciality: "pediatrics",
            cedula: "CED-100003",
            license: "LIC-200003"
        }],
        createdAt: "2024-02-05T08:15:00.000Z",
        updatedAt: "2024-04-10T12:30:00.000Z"
    },
    {
        id: "prof-004",
        status: 'on_vacation',
        image: "https://picsum.photos/seed/face/200/200",
        role: 'professional',
        personalInfo: {
            name: "Alejandro",
            lastName: "López Mendoza",
            dateOfBirth: "1982-01-19T00:00:00.000Z",
            gender: "male"
        },
        department: "Cardiologist",
        contactInfo: {
            email: "alejandro.lopez@example.com",
            phone: "+525512345604",
            address: "Calle Juárez 87",
            city: "Puebla",
            state: "Puebla",
            zip: "72000",
            country: "México"
        },
        profesionalInfo: [{
            speciality: "dentistry",
            cedula: "CED-100004",
            license: "LIC-200004"
        }],
        createdAt: "2024-02-18T10:45:00.000Z",
        updatedAt: "2024-05-02T09:00:00.000Z"
    },
    {
        id: "prof-005",
        status: 'in_consultation',
        image: "https://picsum.photos/seed/face/200/200",
        role: 'professional',
        personalInfo: {
            name: "Camila",
            lastName: "González Rivera",
            dateOfBirth: "1993-06-30T00:00:00.000Z",
            gender: "female"
        },
        department: "Ophthalmologist",
        contactInfo: {
            email: "camila.gonzalez@example.com",
            phone: "+525512345605",
            address: "Av. Colón 154",
            city: "Mérida",
            state: "Yucatán",
            zip: "97000",
            country: "México"
        },
        profesionalInfo: [{
            speciality: "psychology",
            cedula: "CED-100005",
            license: "LIC-200005"
        }],
        createdAt: "2024-03-03T13:20:00.000Z",
        updatedAt: "2024-06-12T15:10:00.000Z"
    },
    {
        id: "prof-006",
        status: 'on_break',
        image: "https://picsum.photos/seed/face/200/200",
        role: 'professional',
        personalInfo: {
            name: "Diego",
            lastName: "Ramírez Flores",
            dateOfBirth: "1975-09-12T00:00:00.000Z",
            gender: "male"
        },
        department: "Otorhinolaryngologist",
        contactInfo: {
            email: "diego.ramirez@example.com",
            phone: "+525512345606",
            address: "Blvd. Bernardo Quintana 410",
            city: "Querétaro",
            state: "Querétaro",
            zip: "76000",
            country: "México"
        },
        profesionalInfo: [{
            speciality: "orthopedics",
            cedula: "CED-100006",
            license: "LIC-200006"
        }, {
            speciality: "traumatology",
            cedula: "CED-100006",
            license: "LIC-200006"
        }],
        createdAt: "2024-03-15T07:50:00.000Z",
        updatedAt: "2024-07-01T11:25:00.000Z"
    },
    {
        id: "prof-007",
        status: 'inactive',
        image: "https://picsum.photos/seed/face/200/200",
        role: 'professional',
        personalInfo: {
            name: "Lucía",
            lastName: "Sánchez Ortega",
            dateOfBirth: "1988-12-03T00:00:00.000Z",
            gender: "female"
        },
        department: "Orthopedist",
        contactInfo: {
            email: "lucia.sanchez@example.com",
            phone: "+525512345607",
            address: "Calle Morelos 62",
            city: "Toluca",
            state: "Estado de México",
            zip: "50000",
            country: "México"
        },
        profesionalInfo: [{
            speciality: "dermatology",
            cedula: "CED-100007",
            license: "LIC-200007"
        }],
        createdAt: "2024-04-02T12:10:00.000Z",
        updatedAt: "2024-07-18T08:40:00.000Z"
    },
    {
        id: "prof-008",
        status: 'in_consultation',
        image: "https://picsum.photos/seed/face/200/200",
        role: 'professional',
        personalInfo: {
            name: "Mateo",
            lastName: "Torres Castillo",
            dateOfBirth: "1980-04-25T00:00:00.000Z",
            gender: "male"
        },
        department: "Traumatologist",
        contactInfo: {
            email: "mateo.torres@example.com",
            phone: "+525512345608",
            address: "Av. León 225",
            city: "León",
            state: "Guanajuato",
            zip: "37000",
            country: "México"
        },
        profesionalInfo: [{
            speciality: "neurology",
            cedula: "CED-100008",
            license: "LIC-200008"
        }],
        createdAt: "2024-04-20T09:00:00.000Z",
        updatedAt: "2024-08-05T13:15:00.000Z"
    },
    {
        id: "prof-009",
        status: 'on_vacation',
        image: "https://picsum.photos/seed/face/200/200",
        role: 'professional',
        personalInfo: {
            name: "Isabella",
            lastName: "Cruz Morales",
            dateOfBirth: "1991-02-17T00:00:00.000Z",
            gender: "female"
        },
        department: "Cardiologist",
        contactInfo: {
            email: "isabella.cruz@example.com",
            phone: "+525512345609",
            address: "Paseo de los Héroes 180",
            city: "Tijuana",
            state: "Baja California",
            zip: "22000",
            country: "México"
        },
        profesionalInfo: [{
            speciality: "nutrition",
            cedula: "CED-100009",
            license: "LIC-200009"
        }],
        createdAt: "2024-05-06T14:35:00.000Z",
        updatedAt: "2024-08-22T10:05:00.000Z"
    },
    {
        id: "prof-010",
        status: 'active',
        image: "https://picsum.photos/seed/face/200/200",
        role: 'professional',
        personalInfo: {
            name: "Gabriel",
            lastName: "Reyes Navarro",
            dateOfBirth: "1972-08-09T00:00:00.000Z",
            gender: "male"
        },
        department: "Cardiologist",
        contactInfo: {
            email: "gabriel.reyes@example.com",
            phone: "+525512345610",
            address: "Av. Tulum 98",
            city: "Cancún",
            state: "Quintana Roo",
            zip: "77500",
            country: "México"
        },
        profesionalInfo: [{
            speciality: "oncology",
            cedula: "CED-100010",
            license: "LIC-200010"
        }],
        createdAt: "2024-05-21T08:25:00.000Z",
        updatedAt: "2024-09-03T16:50:00.000Z"
    },
    {
        id: "prof-011",
        status: 'active',
        image: "https://picsum.photos/seed/face/200/200",
        role: 'professional',
        personalInfo: {
            name: "Renata",
            lastName: "Díaz Herrera",
            dateOfBirth: "1987-05-11T00:00:00.000Z",
            gender: "female"
        },
        department: "Gynecologist",
        contactInfo: {
            email: "renata.diaz@example.com",
            phone: "+525512345611",
            address: "Calle Hidalgo 315",
            city: "Ciudad de México",
            state: "CDMX",
            zip: "06000",
            country: "México"
        },
        profesionalInfo: [{
            speciality: "gynecology",
            cedula: "CED-100011",
            license: "LIC-200011"
        }],
        createdAt: "2024-06-04T10:15:00.000Z",
        updatedAt: "2024-09-20T12:00:00.000Z"
    },
    {
        id: "prof-012",
        status: 'active',
        image: "https://picsum.photos/seed/face/200/200",
        role: 'professional',
        personalInfo: {
            name: "Sebastián",
            lastName: "Ortiz Vega",
            dateOfBirth: "1984-10-27T00:00:00.000Z",
            gender: "male"
        },
        department: "Cardiologist",
        contactInfo: {
            email: "sebastian.ortiz@example.com",
            phone: "+525512345612",
            address: "Av. Patria 500",
            city: "Guadalajara",
            state: "Jalisco",
            zip: "45030",
            country: "México"
        },
        profesionalInfo: [{
            speciality: "ophthalmology",
            cedula: "CED-100012",
            license: "LIC-200012"
        }],
        createdAt: "2024-06-19T07:40:00.000Z",
        updatedAt: "2024-10-02T14:30:00.000Z"
    },
    {
        id: "prof-013",
        status: 'active',
        image: "https://picsum.photos/seed/face/200/200",
        role: 'professional',
        personalInfo: {
            name: "Andrea",
            lastName: "Flores Medina",
            dateOfBirth: "1995-01-08T00:00:00.000Z",
            gender: "other"
        },
        department: "Cardiologist",
        contactInfo: {
            email: "andrea.flores@example.com",
            phone: "+525512345613",
            address: "Calle Morelos 122",
            city: "Monterrey",
            state: "Nuevo León",
            zip: "64010",
            country: "México"
        },
        profesionalInfo: [{
            speciality: "nutrition",
            cedula: "CED-100013",
            license: "LIC-200013"
        }],
        createdAt: "2024-07-01T11:30:00.000Z",
        updatedAt: "2024-10-15T09:45:00.000Z"
    },
    {
        id: "prof-014",
        status: 'active',
        image: "https://picsum.photos/seed/face/200/200",
        role: 'professional',
        personalInfo: {
            name: "Nicolás",
            lastName: "Gutiérrez Campos",
            dateOfBirth: "1979-03-21T00:00:00.000Z",
            gender: "male"
        },
        department: "Dentist",
        contactInfo: {
            email: "nicolas.gutierrez@example.com",
            phone: "+525512345614",
            address: "Av. Las Torres 76",
            city: "Puebla",
            state: "Puebla",
            zip: "72100",
            country: "México"
        },
        profesionalInfo: [{
            speciality: "dentistry",
            cedula: "CED-100014",
            license: "LIC-200014"
        }],
        createdAt: "2024-07-16T13:05:00.000Z",
        updatedAt: "2024-11-01T10:20:00.000Z"
    },
    {
        id: "prof-015",
        status: 'active',
        image: "https://picsum.photos/seed/face/200/200",
        role: 'professional',
        personalInfo: {
            name: "Victoria",
            lastName: "Rivera Domínguez",
            dateOfBirth: "1989-09-16T00:00:00.000Z",
            gender: "female"
        },
        department: "Dentist",
        contactInfo: {
            email: "victoria.rivera@example.com",
            phone: "+525512345615",
            address: "Calle 60 420",
            city: "Mérida",
            state: "Yucatán",
            zip: "97000",
            country: "México"
        },
        profesionalInfo: [{
            speciality: "nutrition",
            cedula: "CED-100015",
            license: "LIC-200015"
        }, {
            speciality: "generalMedicine",
            cedula: "CED-100015",
            license: "LIC-200015"
        }],
        createdAt: "2024-08-03T08:50:00.000Z",
        updatedAt: "2024-11-18T15:35:00.000Z"
    }
];