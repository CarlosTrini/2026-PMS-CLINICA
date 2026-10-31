# cambio de interface.

### paso 2
> Elimina la interface UserSytem en todo el sistema y los lugares que implique
> Elimina la interface UserSession ya que ahora la data se tomará desde professional al traer sus datos
> Elimina la interface AuthRegister, ya que esa ruta quedará comentada, al igual que todos los imports que impliquen. Ojo, no eliminar, solo comentar.

### paso 2
> la ruta app/api/v1/auth/register se comenta para que ya no sea accesible, ojo, no eliminar, solo comentar. Las demás rutas se quedan.

### paso 3
> En DataTypes.ts se modifican las las siguientes interfaces:

```typescript

ANTES
export interface ProfessionalLocationAssignment {
    id: string;
    headquartersId: string;
    speciality: Speciality;
    departmentId?: string;
}

AHORA
export interface ProfessionalLocationAssignment {
    id: string;
    headquartersId: string;
    speciality: Speciality;
    departmentId?: string;
    roleSystem: RoleSystem; // Se agrega esta nueva propiedad 
}
```

```typescript

ANTES

export interface Professional {
    id: string;
    image: string;
    personalInfo: PersonalInfo;
    contactInfo: ContactInfo;
    profesionalInfo: ProfesionalInfo[];
    locationAssignments: ProfessionalLocationAssignment[];
    createdAt: string;
    updatedAt: string;
    role: RoleSystem; // Se elimina en la nueva esta propiedad porque ya no se utilizará 
    status: StatusProfessional;
}


AHORA

export interface Professional {
    id: string;
    image: string;
    personalInfo: PersonalInfo;
    contactInfo: ContactInfo;
    profesionalInfo?: ProfesionalInfo[] | [];  // Se modifica porque en algunos casos no se tendrá profesionalInfo
    locationAssignments: ProfessionalLocationAssignment[];
    termsAcceptedAt: string;  // va a ser una fecha como en createdAt o updatedAt
    lastLoginAt: string;  // va a ser una fecha como en createdAt o updatedAt
    createdAt: string;
    updatedAt: string;
    status: StatusProfessional;
}

```
### Paso 4

> actualiza la data de PROFESIONALS_DATA (utils/constants) para que refleje los cambios realizados en el paso 3. Ojo, no se necesita que tenga todos los datos, solo que refleje los cambios. te anexo un ejemplo de data que puedes usar de modo aleatorio.
Utiliza data de sedes, roles, status etc ya existentes en DataTypes.ts NO CREES NUEVOS. OJO A ESTO

```typescript

// ---------- DATOS DE REFERENCIA ----------

// ---------- PROFESSIONALS ----------
 
export const professionals = [
  // -----------------------------------------------------------
  // 1) Profesional con UNA sede
  // -----------------------------------------------------------
  {
    id: 'prof-001',
    status: 'active',
    image: 'https://picsum.photos/seed/sofia/200/200',
    personalInfo: {
      name: 'Sofía',
      lastName: 'García López',
      dateOfBirth: new Date('1985-03-14'),
      gender: 'female',
    },
    contactInfo: {
      email: 'sofia.garcia@example.com',
      phone: '+525512345601',
      address: 'Av. Insurgentes Sur 120',
      city: 'Ciudad de México',
      state: 'CDMX',
      zip: '03100',
      country: 'México',
    },
    professionalInfo: [
      {
        id: 'pinfo-001',
        specialityId: 'spec-cardiology',
        cedula: 'CED-100001',
        license: 'LIC-200001',
      },
    ],
    locationAssignments: [
      {
        id: 'assign-001',
        headquartersId: 'sede-insurgentes',
        departmentId: 'dep-ins-cardiology',
        role: 'professional',
        specialityId: 'spec-cardiology',
        isActive: true,
      },
    ],
    termsAcceptedAt: new Date('2024-01-10T09:30:00Z'),
    lastLoginAt: new Date('2024-02-15T08:10:00Z'),
    createdAt: new Date('2024-01-08T16:00:00Z'),
    updatedAt: new Date('2024-02-15T14:20:00Z'),
  },
 
  // -----------------------------------------------------------
  // 2) Recepcionista (personal NO clínico)
  //    Sin professionalInfos y sin specialityId: se omiten los campos
  // -----------------------------------------------------------
  {
    id: 'prof-002',
    status: 'active',
    image: 'https://picsum.photos/seed/mariana/200/200',
    personalInfo: {
      name: 'Mariana',
      lastName: 'Torres Ruiz',
      dateOfBirth: new Date('1992-07-22'),
      gender: 'female',
    },
    contactInfo: {
      email: 'mariana.torres@example.com',
      phone: '+525512345602',
      city: 'Ciudad de México',
      state: 'CDMX',
      country: 'México',
    },
    professionalInfo: [],
    locationAssignments: [
      {
        id: 'assign-002',
        headquartersId: 'sede-insurgentes',
        departmentId: 'dep-ins-reception',
        role: 'receptionist',
        isActive: true,
      },
    ],
    termsAcceptedAt: new Date('2024-01-12T10:00:00Z'),
    lastLoginAt: new Date('2024-02-15T07:45:00Z'),
    createdAt: new Date('2024-01-10T11:00:00Z'),
    updatedAt: new Date('2024-02-01T09:00:00Z'),
  },
 
  // -----------------------------------------------------------
  // 3) Profesional con UNA profesión y presencia en DOS sedes
  //    - professionalInfos: una sola cédula (una profesión).
  //    - locationAssignments: dos asignaciones que reutilizan esa especialidad.
  // -----------------------------------------------------------
  {
    id: 'prof-003',
    status: 'active',
    image: 'https://picsum.photos/seed/carlos/200/200',
    personalInfo: {
      name: 'Carlos',
      lastName: 'Hernández Vega',
      dateOfBirth: new Date('1980-11-05'),
      gender: 'male',
    },
    contactInfo: {
      email: 'carlos.hernandez@example.com',
      phone: '+525512345603',
      address: 'Calle Durango 88',
      city: 'Ciudad de México',
      state: 'CDMX',
      zip: '06700',
      country: 'México',
    },
    professionalInfo: [
      {
        _id: 'pinfo-003',
        specialityId: 'spec-dermatology',
        cedula: 'CED-100003',
        license: 'LIC-200003',
      },
    ],
    locationAssignments: [
      {
        _id: 'assign-003',
        headquartersId: 'sede-insurgentes',
        departmentId: 'dep-ins-dermatology',
        role: 'professional',
        specialityId: 'spec-dermatology',
        isActive: true,
      },
      {
        _id: 'assign-004',
        headquartersId: 'sede-norte',
        departmentId: 'dep-nor-dermatology',
        role: 'professional',
        specialityId: 'spec-dermatology',
        isActive: true,
      },
    ],
    termsAcceptedAt: new Date('2024-01-15T12:00:00Z'),
    lastLoginAt: new Date('2024-02-14T18:30:00Z'),
    createdAt: new Date('2024-01-12T10:00:00Z'),
    updatedAt: new Date('2024-02-14T18:30:00Z'),
  },
];
```




## paso 5

> Verifica que todo siga funcionando una vez terminados los cambios.

### Fin del proceso.

---

## IMPORTANTE

- No modifiques las interfaces que no estén relacionadas con los cambios realizados en pasos anteriores.


---

## Guía Rápida:Formas de Enviar y Recibir Datos en Next.js App Router (`route.ts`)

| Método de envío | Ejemplo en Cliente (Axios) | Archivo que responde en Next.js | Cómo se lee en `route.ts` (Next.js 16) | Cuándo usarlo (Estándar REST) | Métodos HTTP comunes |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **1. Path Params** *(Parámetros de ruta)* | `apiClient.get('/headquarters/sede-01')` | `app/api/v1/headquarters/[id]/route.ts` | `const { id } = await params;` *(2do argumento de la función)* | Identificar un **recurso único** obligatorio (`id`, `slug`, `cedula`). | `GET`, `PUT`, `PATCH`, `DELETE` |
| **2. Query Params** *(Search Params)* | `apiClient.get('/headquarters?city=CDMX&active=true')` | `app/api/v1/headquarters/route.ts` | `const city = request.nextUrl.searchParams.get('city');` *(1er argumento)* | **Filtros**, búsquedas, paginación (`?page=1&limit=10`) u ordenamiento opcional. | `GET` |
| **3. Body** *(Cuerpo de la petición)* | `apiClient.post('/personal', dataObj)` | `app/api/v1/personal/route.ts` | `const body = await request.json();` *(1er argumento)* | Enviar **objetos completos**, formularios, payloads grandes o datos sensibles (credenciales). **No disponible en `GET`**. | `POST`, `PUT`, `PATCH` |
| **4. Headers / Cookies** *(Cabeceras)* | `headers: { Authorization: 'Bearer ...' }` | Cualquier `route.ts` | `request.headers.get('authorization')` / `request.cookies.get('auth_token')` | **Autenticación** (JWT), tokens de sesión, idioma (`Accept-Language`) o metadatos. | Todos |

### Ejemplos prácticos en Next.js 16

#### 1. Path Params (`app/api/v1/headquarters/[id]/route.ts`)
```typescript
import { NextRequest, NextResponse } from "next/server";

// ⚠️ IMPORTANTE: request SIEMPRE es el 1er parámetro; { params } SIEMPRE es el 2do.
export async function GET(
    _request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params; // Ej: "sede-insurgentes"
    return NextResponse.json({ id });
}
```

#### 2. Query Params (`app/api/v1/headquarters/route.ts`)
```typescript
import { NextRequest, NextResponse } from "next/server";

// URL llamada: /api/v1/headquarters?city=CDMX&status=active
export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const city = searchParams.get("city");     // "CDMX" | null
    const status = searchParams.get("status"); // "active" | null

    return NextResponse.json({ city, status });
}
```

#### 3. Body (`app/api/v1/auth/login/route.ts`)
```typescript
import { NextRequest, NextResponse } from "next/server";

// Llamada con POST / PUT / PATCH enviando un JSON
export async function POST(request: NextRequest) {
    const body = await request.json(); // { email: "...", password: "..." }
    return NextResponse.json({ received: body });
}
```
