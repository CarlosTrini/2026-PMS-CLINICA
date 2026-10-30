# Modelo de sedes, especialidades y asignaciones profesionales

## Objetivo

Separar el perfil y las credenciales de una persona de los servicios que ejerce en cada sede. Una especialidad puede pertenecer al perfil profesional, estar ofrecida por una sede y aparecer en una asignación profesional-sede; esos conceptos están relacionados, pero no representan el mismo dato.

## Modelo

```text
Catálogo global de especialidades (SPECIALITY_ARRAY)
  ├── Profesional.profesionalInfo[] (credenciales personales)
  ├── Headquarters.specialities[] = { value, isActive }
  └── Professional.locationAssignments[] (especialidad que ejerce en esa sede)

Headquarters.departments[] = { id, headquartersId, value, isActive, specialities[] }
Professional.locationAssignments[].departmentId (opcional; departamento de esa sede)
```

- `Speciality` es el catálogo común con claves estables traducibles (`cardiology`, `dentistry`, etc.).
- `Professional.profesionalInfo` conserva una o más especialidades personales con cédula y licencia.
- `Headquarters.specialities` define la oferta de esa sede. Cada opción conserva una clave de catálogo y su estado activo.
- `Headquarters.departments` contiene cero o más departamentos. Cada uno tiene su clave de catálogo, estado activo y claves de especialidades asociadas.
- `Professional.locationAssignments` contiene cero o más asignaciones. Cada asignación tiene ID, sede, especialidad y `departmentId` opcional.
- Un cambio de sede, especialidad ejercida o departamento se realiza en la asignación correspondiente; no altera el perfil personal ni sus credenciales.

Los tipos y los datos actuales usan listas en memoria para el catálogo y las sedes de demostración. El modelo de relaciones es apto para persistirse como documentos/registros separados en la BD.

## Reglas de negocio

1. La sede referenciada debe existir.
2. La sede debe ofrecer y tener activa la especialidad elegida para asignaciones nuevas.
3. La persona debe tener esa especialidad en su perfil personal.
4. Si se especifica `departmentId`, ese departamento debe pertenecer a la sede y estar asociado con la especialidad asignada.
5. La asignación no requiere departamento. Una sede sin departamentos se representa con `departments: []` y la asignación omite `departmentId`.
6. La sede puede ofrecer cero o más especialidades (`specialities: []` también es válido).

`createProfesionalFormSchema` valida las reglas 1–4. Al implementar escrituras de BD, el servidor debe repetirlas: una validación hecha solo en el cliente no protege los datos persistidos.

## Ejemplos

### Profesional con más de una especialidad personal

```ts
const profesional = {
  id: "prof-021",
  profesionalInfo: [
    { speciality: "cardiology", cedula: "CED-123", license: "LIC-123" },
    { speciality: "general_medicine", cedula: "CED-123", license: "LIC-123" },
  ],
  locationAssignments: [
    {
      id: "assignment-1",
      headquartersId: "sede-insurgentes",
      speciality: "cardiology",
      departmentId: "insurgentes-cardiologia",
    },
  ],
};
```

En este caso el perfil tiene dos especialidades personales; en Insurgentes ejerce Cardiología y se vincula a su unidad de Cardiología.

### La misma persona en otra sede, sin departamento

```ts
profesional.locationAssignments.push({
  id: "assignment-2",
  headquartersId: "sede-guadalajara",
      speciality: "general_medicine",
  // departmentId se omite porque la sede no tiene un departamento aplicable.
});
```

La segunda asignación no modifica credenciales ni la asignación de Insurgentes. La especialidad debe estar en la oferta de Guadalajara.

### Sede sin departamentos

```ts
const sedeAmbulatoria = {
  id: "sede-consultorios",
  specialities: [{ value: "cardiology", isActive: true }],
  departments: [],
};
```

El sitio puede ofrecer servicios sin organizarse en departamentos.

## Compatibilidad y persistencia

- `HEADQUARTERS_DEPARTMENT_ARRAY` conserva las claves traducibles disponibles al configurar una sede. Las opciones de filtro y asignación se leen de la sede seleccionada.
- La demo usa dos sedes: Insurgentes tiene departamentos y una selección de especialidades; Guadalajara no tiene departamentos y ofrece todas las claves de `SPECIALITY_ARRAY`.
- Al iniciar sesión, `useHeadquarterStore` recibe la primera sede para establecer el contexto predeterminado.
- `GET /api/v1/profesionals` omite el antiguo `department` global en su respuesta y entrega `locationAssignments: []` para documentos que aún no lo tengan. No modifica documentos MongoDB.
- El proyecto no tiene una ruta de escritura de asignaciones conectada: la actualización de profesional sigue siendo simulada y la pantalla de alta sigue siendo una maqueta sin `onSubmit`/mutación. Para persistir asignaciones nuevas, falta implementar las operaciones de escritura en API y la migración explícita de documentos antiguos. No se deduce una sede ni un departamento a partir del antiguo `department`, porque ese valor no identifica de forma fiable ninguna sede.
- Las rutas `auth/login` y `auth/register` no se modificaron; el rol `no_role` continúa disponible.

## Archivos y cambios realizados

Las líneas son referencias al estado actual del repositorio y pueden desplazarse con cambios posteriores.

| Archivo | Modificado, eliminado o agregado |
| --- | --- |
| `src/types/dataTypes.ts` | Líneas 38, 44, 50 y 57: tipos de oferta de especialidades (`value`, `isActive`), departamentos (`specialities`, `isActive`), asignaciones y sede. Línea 94: eliminado `Professional.department`; agregado `Professional.locationAssignments`. |
| `src/utils/constants.ts` | Líneas 7 y 480 en adelante: dos sedes de demo, una con departamentos/especialidades seleccionadas y otra sin departamentos con todas las especialidades globales. Departamentos enlazan claves de especialidad y ambos catálogos guardan `isActive`. |
| `src/features/profesionals/schemas/formProfesionalSchema.ts` | Líneas 27, 53 y 61: eliminado el campo global `department`; agregadas asignaciones y reglas `superRefine` para sede, oferta, especialidad personal y pertenencia del departamento. |
| `src/features/profesionals/schemas/formFiltersSchema.ts` | Líneas 4–10: filtros por sede, especialidad ofrecida y departamento de la sede. |
| `src/features/profesionals/components/Filters.tsx` | Líneas 25, 45 y 128: toma la sede actual del store, actualiza opciones de especialidad/departamento al cambiar sede y filtra por asignaciones de esa sede. |
| `src/features/profesionals/NewProfesionalView.tsx` | Líneas 62 y 346: eliminado el selector global; agregado un bloque visual para elegir sede, servicio/especialidad y departamento opcional. El formulario todavía no guarda. |
| `src/features/profesionals/components/ViewEditProf.tsx` | Líneas 33 y 343: eliminado el selector global; agregado editor de asignaciones con selección por sede, especialidad compatible y departamento de esa sede. |
| `src/features/profesionals/index.tsx` | Línea 28 y líneas 224, 398: la columna “Departamento” pasó a mostrar sedes y sus asignaciones. |
| `src/features/landing/LandingView.tsx` | Líneas 108, 122 y 517: eliminada la definición duplicada de sedes; sedes, especialidades ofrecidas y departamentos se leen de `HEADQUARTERS_DATA`; directorio de profesionales se filtra por sede. |
| `src/app/api/v1/profesionals/route.ts` | Líneas 5 y 18: normalización de lectura para documentos heredados; no escribe ni migra MongoDB. |
| `src/store/useHeadquarterStore.ts`, `src/features/auth/SigninView.tsx` | Store cambiado a guardar el objeto completo de sede; el login selecciona Insurgentes como sede inicial. |
| `src/messages/es.json`, `src/messages/en.json` | Líneas 83, 106 y 177: agregadas claves para sede y departamentos organizacionales. |

## Símbolos principales para localizar el cambio

- `src/types/dataTypes.ts`: `Professional`, `ProfessionalLocationAssignment`, `HeadquartersSpeciality`, `HeadquartersDepartment`, `Headquarters`.
- `src/utils/constants.ts`: `HEADQUARTERS_DEPARTMENT_ARRAY`, `HEADQUARTERS_DATA`, `headquartersSpecialities`, `PROFESIONALS_DATA`.
- `src/features/profesionals/schemas/formProfesionalSchema.ts`: `createProfesionalFormSchema.superRefine`.
- `src/features/profesionals/components/ViewEditProf.tsx`: `useFieldArray` para editar afiliaciones por sede.
- `src/app/api/v1/profesionals/route.ts`: normalización compatible de la respuesta `GET`.

## Verificaciones ejecutadas

- `.\node_modules\.bin\tsc.cmd --noEmit`: correcto.
- `npm.cmd run build`: compilación de producción correcta, incluyendo páginas en español e inglés y la ruta de API.
- JSON: ambos archivos de mensajes se pudieron parsear.
- Integridad de datos de demostración: cada asignación apunta a una sede existente, la sede ofrece la especialidad, el perfil personal incluye esa especialidad y cualquier departamento pertenece a esa misma sede.
