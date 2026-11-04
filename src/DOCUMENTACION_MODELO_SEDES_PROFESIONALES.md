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

### PANEL LATERAL (SIDEBAR) 

#### Una asignación
Se mostrará menú normal con las vistas/páginas que pueda ver según su rol se lo permita

#### Asignación mútiple
Se mostrará en la parte superios un select, que indique primeramente la sede que se ha seleccionado y al desplegar, las demás, opciones que puede seleccionar, para intercambiar de sede.

### HEADER

- Debe mostrár un tag con el nombre de la sede de la cual se está visualizando la data en el momento.

- Botones de theme y notificaciones.

- Dropdown para foto de usuario logueado, nombre, rol y al desplegar mostar: Editar perfil, configuración de la cuenta, Idioma(drop con idioma) y el botón de cerrar sesión

## PÁGINA DE PERSONAL

### Métricas
Muestra 4 cards sencillas con información relevante rápida correspondiente a la sede seleccionada.
- Total de personal
- cantidad de médicos en 'consulta'
- especialidades
- cantidad de personal con estatus: Activo, inactivo, en descanso y en consulta

### Filtros
Collapse con filtros para la tabla del personal que se muestra debajo, debe contener botones de:
- Quitar filtros
- Filtrar

Los filtros a usar son: 
- Buscar por nombre: Si este filtro tiene valor, todos los demás se anulan
  
  Filtros de sede: 
- Sede, solo muestra la sede actual
- Servicios: select con servicios de la sede
- Especialidades de la sede: select (si la sede no  cuenta con especialidades, mostrar 'sin especialidades disponibles para esta sede')
- Departamento: select (si la sede no  cuenta con departamentos, mostrar 'sin departamentos disponibles para esta sede') 
- Especialidades de departamento: Si el departamento cuenta con especialidades, se muestra un select adicional con su especialidades. Al regresar el departamento a su valor 'Todos' este filtro debe ocultarse

    Filtros generales: 
- Estatus : select de estatus del personal
- Ordernar por ingreso: select asc y desc para filtrar por fechas de alta del personal
- Orden por especialidad: select asc y desc para especialidades
- Orden por estatus: select de asc y desc para estatus

### Tabla del personal

Mostrará información del personal asi como acciones para editar o eliminar.

En el footer, dos botones: 

- Cerrar
- Guardar cambios (este solo se mostrará si se encuentra en 'modo edición')

Columnas: 

- Nombre: Mostrará un avatar con foto del usuario, nombre en negritas, Ciudad y estado, Role en el sistema y id
- Especialidad: Especialidad en la cuál está asignada en dicha sede, Ced y lic (Si aplica)
- Sede: Sedes a las que pertenece
- Contacto: correo y teléfono
- Estatus
- Ingreso
- acciones: Botones con iconos para ver y eliminar 
    - Ver: Abre un modal y muestra por tabs info del personal seleccionado. En el header el nobmre y su/s especialidad/es, su estatus. En el body un icono para eliminar y un switch de "editar datos" esto activará el modo edición.
    - Tab 'información personal': Nombre, apellido, fecha de nacimiento y género.
    - Tab 'Datos de contacto': Todos como inputs en disabled hasta que se habilite edición. Correo, Teléfono, Dirección, Ciudad, Estado, Código postal y País
    - Tab 'Sedes': Todos como inputs en disabled hasta que se habilite edición. Estatus, en tabs muestra las sedes a la que pertenece, aqui se peude editar sede, rol en sede, especialidad en sede y departemento (si la sede tiene deptos), o asignar a una nueva sede o eliminarlo de alguna sede
    - Si se está en el modo edición y se editaron o no valores, en caso de cerra el modal, los cambios no se guardan
    
     


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
