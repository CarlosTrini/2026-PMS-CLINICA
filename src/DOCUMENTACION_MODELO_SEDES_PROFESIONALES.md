# CASOS DE USO

> una asignación o asignación múltiple (se refiere a en cuántes sedes el usuario está registrado)

## ☢️LOGIN 

### una asignación

Al iniciar sesión como este usuario pertenece a una solo sede, simplemente se redirigirá a la pantalla principal /admin/
se trae y guarda de forma global la información de la sede

### (Asignación múltiple)

Al iniciar sesión y detectar que el usuario pertence a más de una sede, se muestra un overview sencillo con botones para seleccionar la sede 
a la cual desea iniciar sesión, luego se guarda la data de la sede seleccionada

## ☢️PANEL ADMIN (/ADMIN)

### Sidebar 

#### Una asignación
Se mostrará menú normal con las vistas/páginas que pueda ver según su rol se lo permita

#### Asignación mútiple
Se mostrará en la parte superios un select, que indique primeramente la sede que se ha seleccionado y al desplegar, las demás, opciones que puede seleccionar, para intercambiar de sede.




```typescript

```


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
