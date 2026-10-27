# PMS Clínica — Sistema de Gestión y Administración Médica

> ⚠️ **Estado del Proyecto: En Desarrollo Activo (WIP)**  
> Esta aplicación se encuentra actualmente en construcción como muestra técnica de arquitectura moderna con Next.js. Algunas funcionalidades, módulos y flujos de autenticación se encuentran en constante actualización e integración.

Plataforma orientada a la gestión hospitalaria y control clínico. Permite administrar personal médico, agendas, pacientes y métricas operativas, integrando una landing page institucional y un portal de autenticación para personal de salud.

---

## 🚀 Módulos y Funcionalidades Principales

- **Landing Page Institucional (`/`)**:
  - Catálogo de especialidades y departamentos médicos.
  - Simulador y agendamiento rápido de consultas.
  - Directorio médico y sedes hospitalarias con ubicación e información de contacto.
  - Paquetes de salud y promociones clínicas.

- **Portal de Autenticación (`/signin` & `/signup`)**:
  - Registro de usuarios y control de acceso por roles (`admin`, `professional`, `assistant`, `receptionist`, `owner`).
  - Validación de formularios con esquemas tipados.
  - Emisión y verificación de tokens seguros mediante JWT.

- **Panel de Administración (`/admin`)**:
  - **Dashboard Operativo**: Indicadores clave de rendimiento (KPIs), métricas hospitalarias y volumen de consultas.
  - **Gestión de Personal Médico (`/admin/profesionals`)**: Registro, edición, filtros avanzados por especialidad/estatus, búsqueda y control de estados activos/inactivos.

---

## 🛠️ Stack Tecnológico (Hasta ahora)

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router & Server Actions / Route Handlers)
- **UI & Lenguaje**: [React 19](https://react.dev/), [TypeScript](https://www.typescriptlang.org/)
- **Estilos**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Gestión de Estado y Servidor**: [TanStack Query v5](https://tanstack.com/query/latest) (React Query)
- **Formularios y Validación**: [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/)
- **Seguridad & Auth**: [jose](https://github.com/panva/jose) (JWT para entornos Serverless y Edge Runtime)
- **Cliente HTTP**: [Axios](https://axios-http.com/)
- **Internacionalización**: [next-intl](https://next-intl-docs.vercel.app/)

---

## 💻 Instalación y Ejecución Local

1. **Clonar repositorio**:
   ```bash
   git clone <URL_DEL_REPOSITORIO>
   cd nextjs-admin-dashboard
   ```

2. **Instalar dependencias**:
   ```bash
   npm install
   ```

3. **Variables de entorno**:
   Crear un archivo `.env` en la raíz basado en los requerimientos del proyecto:
   ```env
   JWT_SECRET=tu_clave_secreta_aqui
   ```

4. **Iniciar entorno de desarrollo**:
   ```bash
   npm run dev
   ```
   Abrir [http://localhost:3000](http://localhost:3000) en el navegador.
