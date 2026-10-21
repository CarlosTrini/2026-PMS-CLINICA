# PMS Core — Patient & Practice Management System
> **Sistema Integral de Gestión Clínica y de Pacientes**  
> *Arquitectura agnóstica para Práctica Médica Humana y Veterinaria*

---

## 1. Definición y Categoría del Sistema

Este sistema pertenece a la categoría **PMS (Practice Management System)** y **EHR / EMR (Electronic Health / Medical Record)**:
- **No es un CMS convencional**: No es un gestor de contenidos para blogs o sitios web; es un **Software de Gestión Operativa, Clínica y Administrativa**.
- **Propósito**: Centralizar el flujo operativo diario de un centro de salud o clínica: recepción, agendamiento de citas, ficha médica del paciente, gestión del personal profesional, control de insumos/farmacia y caja.

---

## 2. El Modelo de Abstracción Universal (Humano vs. Veterinaria)

Para que el frontend y el backend (NestJS) compartan una misma base de código sin duplicar pantallas ni tablas, se utiliza el patrón de **Abstracción de Sujeto de Atención**:

| Concepto Universal | Entidad Clínica Humana | Entidad Veterinaria | Implementación en el Sistema |
| :--- | :--- | :--- | :--- |
| **Sujeto de Atención** | Paciente (Persona) | Paciente (Mascota) | `Patient` (Nombre, fecha nac., sexo, especie/raza opcional, alergias, foto). |
| **Responsable Legal / Contacto** | Tutor / Contacto de emergencia | Dueño / Tutor de la mascota | `Guardian / Contact` (Nombre, teléfono, email, dirección, relación). En adultos humanos puede ser el mismo paciente o un contacto de emergencia; en veterinaria o pediatría es el responsable de pago y decisiones. |
| **Prestador del Servicio** | Médico / Odontólogo / Especialista | Médico Veterinario / Cirujano | `Professional / Practitioner` (Especialidad, cédula/licencia, agenda, comisión). |
| **Punto de Encuentro** | Consulta Médica | Consulta Veterinaria | `Appointment` + `MedicalRecord` (Motivo, constantes vitales, diagnóstico, receta). |
| **Insumo / Fármaco** | Medicamento / Material de curación | Fármaco veterinario / Vacunas / Alimento | `InventoryItem` (Stock, caducidad, lote, dosis/unidad). |

---

## 3. Módulos y Páginas Iniciales del Sistema

A continuación se define la estructura modular recomendada para el MVP y versiones iniciales:

```mermaid
graph TD
    Dashboard --> Info Gral [1. Dashboard Principal] 
    Dashboard --> Patients[2. Directorio de Pacientes]
    Dashboard --> Appointments[3. Agenda y Citas]
    Dashboard --> Clinical[4. Historial y Consultas]
    Dashboard --> Inventory[5. Inventario y Farmacia]
    Dashboard --> Staff[6. Personal y Especialistas] (MAKING)
    Dashboard --> Billing[7. Caja y Pagos]
    Dashboard --> Settings[8. Configuración General]
```

---

### Módulo 1: Dashboard Principal (`/`)
El centro de comando diario para el recepcionista, profesional o administrador:
- **Métricas Rápidas (KPI Cards)**:
  - Citas del día (Total, Pendientes, En curso, Completadas).
  - Pacientes nuevos registrados en el mes.
  - Alertas críticas de inventario (artículos por agotarse o por vencer).
  - Ingresos del día / Caja activa.
- **Línea de Tiempo del Día**: Lista interactiva de las citas de hoy en orden cronológico con acción directa a *"Iniciar Consulta"*.
- **Acciones Rápidas**: Botón flotante o barra superior para: *"Nueva Cita"*, *"Nuevo Paciente"*, *"Venta Rápida / Cobro"*.

---

### Módulo 2: Agenda y Gestión de Citas (`/appointments`)
La herramienta más utilizada en el día a día operativo:
- **Vistas**: Calendario interactivo (Día, Semana, Mes) y Vista de Lista / Tabla filtrable.
- **Filtros Clave**: Por profesional, por sucursal/consultorio, por estatus.
- **Estatus de Cita**:
  - `SCHEDULED` (Agendada / Pendiente)
  - `CONFIRMED` (Confirmada por paciente/tutor)
  - `IN_WAITING_ROOM` (En sala de espera)
  - `IN_PROGRESS` (En consulta)
  - `COMPLETED` (Finalizada)
  - `CANCELLED` (Cancelada con motivo)
  - `NO_SHOW` (No se presentó)
- **Modal de Creación / Edición**:
  - Selector de paciente existente o creación rápida al vuelo.
  - Asignación de profesional, fecha, rango de horario.
  - Motivo de la visita (primera vez, control, urgencia, vacunación, procedimiento).

---

### Módulo 3: Directorio de Pacientes (`/patients`)
El catálogo maestro de los sujetos de atención:
- **Vista de Lista (`/patients`)**:
  - Tabla con búsqueda en tiempo real (por nombre, código de expediente, teléfono o documento del tutor).
  - Columnas: Foto, Código de Expediente, Nombre, Tutor/Responsable, Última visita, Acciones rápidas.
- **Ficha Detallada del Paciente (`/patients/[id]`)**:
  - **Pestaña 1 - Datos Generales**: Información demográfica, datos de contacto del tutor, alertas médicas permanentes (alergias, enfermedades crónicas).
  - **Pestaña 2 - Expediente Clínico**: Timeline cronológico de todas las consultas, diagnósticos previos y recetas.
  - **Pestaña 3 - Historial de Citas**: Citas pasadas y futuras.
  - **Pestaña 4 - Documentos y Archivos**: Radiografías, análisis de laboratorio, consentimientos informados en PDF.
  - **Pestaña 5 - Estado de Cuenta**: Historial de pagos y saldos pendientes.

---

### Módulo 4: Consulta e Historia Clínica (`/clinical` o `/consultations/[id]`)
La pantalla de trabajo del profesional de la salud durante la atención:
- **Registro de Signos y Constantes**:
  - Peso, temperatura, frecuencia cardíaca, presión/pulso.
- **Evolución Clínica (Método SOAP)**:
  - **S (Subjetivo)**: Motivo de consulta y síntomas referidos por el paciente o tutor.
  - **O (Objetivo)**: Hallazgos de la exploración física.
  - **A (Análisis / Diagnóstico)**: Diagnóstico principal y secundarios (catálogo CIE-10 opcional).
  - **P (Plan)**: Tratamiento indicado, indicaciones y cuidados.
- **Generador de Receta Médica / Prescripción**:
  - Búsqueda de medicamentos en el inventario o texto libre.
  - Posología, duración e indicaciones de consumo.
  - Impresión o exportación a PDF con membrete de la clínica.

---

### Módulo 5: Inventario y Farmacia (`/inventory`)
Control de medicamentos, insumos médicos y productos comerciales:
- **Listado de Artículos**:
  - Código/SKU, Nombre comercial, Principio activo, Categoría (Insumo clínico, Medicamento, Alimento/Venta mostrador), Stock actual, Stock mínimo, Precio de compra y venta.
- **Control de Lotes y Caducidades**: Alertas preventivas para productos próximos a expirar.
- **Movimientos de Stock**: Entradas (compras), salidas (consumo en consulta o venta directa), ajustes por merma.

---

### Módulo 6: Personal y Especialistas (`/staff`)
Gestión del equipo humano de la clínica:
- **Directorio de Colaboradores**: Médicos, veterinarios, enfermeros, recepcionistas, administradores.
- **Roles y Permisos**:
  - `ADMIN`: Control total y reportería financiera.
  - `PRACTITIONER`: Acceso a agenda propia, expedientes clínicos y recetas.
  - `RECEPTIONIST`: Agendamiento, registro de pacientes, cobro en caja.
- **Horarios de Disponibilidad**: Configuración de turnos y días de trabajo para alimentar el calendario de citas.

---

### Módulo 7: Caja, Pagos y Facturación (`/billing`)
Gestión de cobros y flujo monetario:
- **Cuentas por Cobrar / Tickets de Consulta**: Generación del cobro derivado de una cita, servicios aplicados e insumos utilizados.
- **Métodos de Pago**: Efectivo, tarjeta (débito/crédito), transferencia.
- **Corte de Caja Diario (Arqueo)**: Balance de entradas y salidas al final del turno.

---

### Módulo 8: Configuración del Sistema (`/settings`)
Personalización de la clínica:
- **Perfil de la Clínica**: Nombre, logotipo, dirección, teléfono, datos fiscales para recetas y recibos.
- **Modalidad del Sistema**: Toggle de configuración general (`HUMAN_CLINIC` vs `VETERINARY_CLINIC`) que adapta etiquetas visuales (ej. "Tutor" en vez de "Contacto de emergencia", "Raza/Especie" visible u oculta).
- **Catálogo de Servicios**: Precios de consultas, vacunas, estudios y procedimientos estándar.

---

## 4. Hoja de Ruta de Implementación (Fases)

### Fase 1: Núcleo Operativo (MVP)
1. **Pacientes & Tutores**: Alta, edición, listado con búsqueda y ficha básica.
2. **Agenda de Citas**: Calendario visual, creación de citas y cambio de estados.
3. **Personal**: Lista de médicos/especialistas para asignación de citas.

### Fase 2: Expediente Clínico y Receta
1. **Módulo de Consulta**: Registro de signos vitales, diagnóstico y notas clínicas.
2. **Generación e impresión de recetas médicas**.
3. **Historial clínico interactivo** dentro de la ficha del paciente.

### Fase 3: Gestión de Recursos
1. **Inventario básico**: Catálogo de insumos y medicamentos con alerta de stock mínimo.
2. **Caja y Cobro básico**: Registro del pago de la consulta y emisión de comprobante simple.

---

## 5. Consideraciones para la Integración con NestJS (Backend)

- **Arquitectura de Microservicios o Monolito Modular**:
  - `auth-module` (JWT, Roles, Permisos)
  - `patients-module` (CRUD de pacientes y tutores)
  - `appointments-module` (Gestión de agenda, traslapes de horarios)
  - `clinical-module` (Historiales médicos y consultas)
  - `inventory-module` (Stock y movimientos)
  - `billing-module` (Transacciones y cobros)
- **Contratos de Datos (DTOs)**: El frontend consumirá endpoints REST estructurados respetando la paginación, filtros de búsqueda y tipado TypeScript estricto.
