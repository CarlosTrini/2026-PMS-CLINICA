# DASHBOARD_USE.md — TailAdmin Pro

> Plantilla de panel de administración en Next.js · Tailwind CSS v4 · next-intl · ApexCharts · FullCalendar · Swiper

## Mapa del Repositorio (Repo Map)

> Los route groups `(name)/` son carpetas organizativas de Next.js App Router —
> no afectan la ruta de la URL. Explora las subcarpetas directamente; este mapa
> se detiene en el nivel necesario para orientar, no para enumerar todo.

```
src/
├── app/                      # rutas (Next.js App Router)
│   ├── [locale]/             # rutas localizadas (next-intl)
│   │   ├── admin/          # shell del dashboard (sidebar+header mediante src/layout)
│   │   │   ├── (home)/       # variantes de dashboard, ej. analytics/, crm/, sales/
│   │   │   ├── (others-pages)/ # páginas de funcionalidades, ej. calendar/, chat/, (forms)/
│   │   │   └── (ui-elements)/ # páginas demo de componentes (alerts, buttons, modals…)
│   │   ├── (public)/ # sin shell del dashboard, ej. (auth)/, coming-soon/
│   │   ├── (layouts-example)/ # variantes de layout del sidebar (layout-one … six)
│   │   └── layout.tsx, not-found.tsx
│   ├── favicon.ico, globals.css
├── components/
│   ├── ui/                    # primitivos: button, modal, table, tabs…
│   ├── form/                  # Form, Label, Select + input/, switch/
│   ├── common/                # widgets compartidos: PageBreadCrumb, ThemeToggleButton…
│   ├── header/                # dropdowns del header
│   └── <feature>/             # una carpeta por dominio: ecommerce, crm, invoice…
├── i18n/                     # routing.ts, request.ts, navigation.ts, languages.ts
├── messages/                 # diccionarios de traducción (en.json, ar.json, es.json, de.json)
├── layout/                    # shell de admin: AppSidebar, AppHeader
├── context/                   # SidebarContext, ThemeContext
├── hooks/                     # useModal, useGoBack, useClickOutside
├── icons/                     # .svg + barrel index.tsx (SVGR)
├── proxy.ts                  # middleware de enrutamiento de next-intl
└── utils/
```

## Stack Tecnológico

- **Next.js 16** (App Router, Turbopack + webpack ambos configurados) con **React 19** y **TypeScript** estricto.
- **next-intl v4** para internacionalización (i18n), enrutamiento localizado y soporte RTL.
- Alias de ruta: `@/*` → `src/*`.
- Scripts: `npm run dev`, `npm run build`, `npm run lint`. Node >= 20.9.
- Esta versión de Next.js puede diferir de tus datos de entrenamiento — lee la guía correspondiente en `node_modules/next/dist/docs/` antes de escribir código y presta atención a los avisos de desuso (deprecation notices).

## Convenciones

- **Nueva página** → agrega una carpeta bajo el grupo coincidente en `src/app/[locale]/(...)/`; ubica allí los componentes exclusivos de esa ruta. Nunca coloques páginas fuera de `[locale]`.
- **Nuevo componente reutilizable** → `components/<feature>/` si es específico de un dominio, de lo contrario en `components/common/` o `components/ui/`.
- **Nuevo icono** → coloca el `.svg` en `icons/`, expórtalo desde el barrel `index.tsx` con un nombre en PascalCase. Nunca insertes marcado SVG inline en componentes.
- Grupos de rutas (Route groups): `(admin)` es el único grupo con el shell de sidebar/header; `(public)` renderiza páginas sin la barra de interfaz (chrome); `(layouts-example)` contiene layouts alternativos de sidebar.
- Los archivos de componentes van en **PascalCase** (`MonthlySalesChart.tsx`) con un **default export**; los archivos de rutas se mantienen en minúsculas (`page.tsx`, `layout.tsx`); los hooks van en camelCase (`useModal.ts`).
- El `app/[locale]/layout.tsx` raíz es un Server Component que configura `NextIntlClientProvider`, fuentes, dirección (`dir="ltr"|"rtl"`) y providers. El layout del shell `(admin)` y la interfaz de usuario interactiva son Client Components — agrega `"use client"` siempre que utilices hooks, controladores de eventos o APIs del navegador.
- Importa mediante alias (`@/context/...`, `@/icons/...`, `@/i18n/...`) para importaciones entre carpetas; las importaciones relativas están bien dentro de la misma carpeta de una feature.

## Reglas de Internacionalización (next-intl)

- **Navegación y Enrutamiento**: Importa siempre los primitivos de navegación (`Link`, `useRouter`, `usePathname`, `redirect`) desde `@/i18n/navigation`, nunca directamente desde `next/link` o `next/navigation`.
- **Configuración de Enrutamiento**: Los locales (`en`, `ar`, `es`, `de`) y las configuraciones de enrutamiento están centralizados en `src/i18n/routing.ts` (`localePrefix: "never"`).
- **Traducciones**:
  - En Client Components: usa `useTranslations("namespace")`.
  - En Server Components: usa `getTranslations("namespace")` desde `next-intl/server`.
  - Organiza las claves de traducción mediante namespaces de características anidados (por ejemplo, `t("customers")` dentro de `ecommerce.metrics`).
- **Mensajes de Traducción**: Todos los diccionarios de traducción se encuentran en `src/messages/<locale>.json`. Al agregar o actualizar textos dirigidos al usuario, mantén las claves correspondientes en todos los archivos de idiomas compatibles.
- **Renderizado Estático y Server Components**: Los layouts/páginas del servidor dentro de `[locale]` deben invocar `setRequestLocale(locale)` para permitir el renderizado estático con `generateStaticParams()`.
- **Soporte RTL**: El árabe (`ar`) utiliza dirección RTL (`dir="rtl"`) mediante `isRtl(locale)` en `src/i18n/languages.ts`. Asegúrate de que los componentes de la interfaz manejen los diseños RTL adecuadamente utilizando propiedades lógicas de CSS y variantes `rtl:`.

## Reglas de Estilos

- Tailwind CSS **v4** — el tema se define en `src/app/globals.css` bajo `@theme`; no existe `tailwind.config`.
- Utiliza siempre tokens del tema en lugar de valores fijos en el código (hardcoded):
  - Colores: escalas `brand`, `gray`, `blue-light`, `orange`, `success`, `error`, `warning` (`25`–`950`), más `theme-pink-500` / `theme-purple-500`.
  - Tipografía: `font-outfit`, `text-theme-xs/sm/xl`, `text-title-sm/md/lg/xl/2xl`.
  - Sombras: `shadow-theme-xs/sm/md/lg/xl`, `shadow-focus-ring`, `shadow-slider-navigation`, `shadow-tooltip`, `shadow-datepicker`.
  - Puntos de interrupción (Breakpoints): personalizados `2xsm` (375px), `xsm` (425px), `3xl` (2000px) junto a los valores por defecto.
  - Z-index: tokens `z-1`, `z-9`, `z-99`, … `z-999999`.
- **El modo oscuro se basa en clases** (`@custom-variant dark (&:is(.dark *))`, controlado por `ThemeContext` con opciones light/dark/auto). Cada elemento estilizado debe incluir su variante `dark:`.
- **Propiedades Lógicas de CSS para RTL e Internacionalización**:
  - Nunca utilices utilidades direccionales físicas cuando existan equivalentes lógicos; las propiedades físicas `left`/`right` se rompen en el diseño RTL (`ar`):
    - **Márgenes**: Usa `ms-*` / `me-*` (margin-inline start/end) en lugar de `ml-*` / `mr-*`.
    - **Relleno (Padding)**: Usa `ps-*` / `pe-*` (padding-inline start/end) en lugar de `pl-*` / `pr-*`.
    - **Posicionamiento / Insets**: Usa `start-*` / `end-*` en lugar de `left-*` / `right-*`.
    - **Bordes**: Usa `border-s-*` / `border-e-*` en lugar de `border-l-*` / `border-r-*`.
    - **Radio de Borde (Border Radius)**: Usa `rounded-s-*` / `rounded-e-*` / `rounded-ss-*` / `rounded-se-*` / `rounded-es-*` / `rounded-ee-*` en lugar de combinaciones en esquinas como `rounded-l-*` / `rounded-r-*` / `rounded-t-*`.
    - **Alineación de Texto**: Usa `text-start` / `text-end` en lugar de `text-left` / `text-right`.
  - **Iconos Direccionales y Transformaciones**:
    - Los glifos direccionales (por ejemplo, flechas de volver/avanzar, chevrons de migas de pan, iconos siguiente/anterior) deben invertirse en RTL con `rtl:rotate-180` o `rtl:-scale-x-100`.
    - Los paneles deslizantes (drawers) off-canvas y los elementos deslizantes deben reflejar su traslación (por ejemplo, `-translate-x-full rtl:translate-x-full`).
    - Usa los modificadores `ltr:*` y `rtl:*` cuando se requieran anulaciones direccionales explícitas o estilos de integración con terceros.
- Las clases `@utility` reutilizables ya existen en `globals.css` (`menu-item-*`, `menu-dropdown-*`, `custom-scrollbar`, `no-scrollbar`, `docs-menu-item-*`, `nav-icon-item-*`, …) — reutilízalas antes de inventar nuevas.
- Todas las anulaciones de CSS de terceros (ApexCharts, FullCalendar, Swiper, flatpickr, jvectormap, simplebar, Prism) se encuentran al final de `globals.css`. Agrega las anulaciones allí, manteniendo el estilo `@apply` existente.
- Nunca escribas colores hexadecimales directos en `className`. (Los objetos de opciones de gráficos como `ApexOptions.colors` son la excepción establecida — copia los valores hexadecimales de la paleta `@theme`, por ejemplo `#465fff` = brand-500).

## Reglas de Componentes

- **Una funcionalidad, una carpeta (One feature, one folder)**: la interfaz de usuario de nuevas páginas va en `src/components/<feature>/`, dividida en subcomponentes enfocados de responsabilidad única (por ejemplo, `EcommerceMetrics.tsx`, `RecentOrders.tsx`) — nunca en un solo archivo monolítico.
- **Composición sobre prop drilling**: pasa `children`, mantén la lógica del contenedor/estado separada de los componentes presentacionales, extrae el JSX de cada sección a su propio archivo y define interfaces de props tipadas explícitas para cada subcomponente.
- Prefiere los primitivos de `src/components/ui/` y `src/components/form/` antes que HTML nativo o nuevos equivalentes de terceros.
- Envuelve las secciones de demostración/página en `ComponentCard` y agrega `PageBreadCrumb` en la parte superior de las páginas, coincidiendo con las páginas existentes.
- **Gráficos**: `react-apexcharts` debe importarse dinámicamente — `const ReactApexChart = dynamic(() => import("react-apexcharts"), { ssr: false })`.
- **Calendario y carruseles**: `FullCalendar` y `Swiper` también son librerías exclusivas del cliente — impórtalas dinámicamente de la misma manera (`dynamic(() => import(...), { ssr: false })`) en lugar de importarlas directamente, a menos que ya estén aisladas dentro de un componente renderizado únicamente en el lado del cliente (verifica antes de asumir).
- **Iconos**: importa desde `@/icons` (los SVGs se compilan a componentes de React mediante `@svgr/webpack`, configurado tanto para webpack como para Turbopack).
- Los modales utilizan el hook `useModal` (`isOpen`, `openModal`, `closeModal`, `toggleModal`).
- El estado global se gestiona a través de los contextos existentes (`useSidebar`, `useTheme`) — no agregues nuevos providers sin necesidad.

## Lo que NO debes hacer (Don'ts)

- No instales nuevos paquetes sin consultar al usuario.
- No importes `Link`, `useRouter`, `usePathname` o `redirect` desde `next/link` o `next/navigation` — usa siempre `@/i18n/navigation`.
- No crees páginas directamente bajo `src/app/` fuera del segmento `[locale]`.
- No escribas texto directo dirigido al usuario sin agregar las claves en `src/messages/*.json`.
- No uses utilidades direccionales físicas (`ml-*`, `mr-*`, `pl-*`, `pr-*`, `left-*`, `right-*`, `border-l-*`, `border-r-*`, `rounded-l-*`, `rounded-r-*`, `text-left`, `text-right`) — usa siempre los equivalentes lógicos de CSS (`ms-*`, `me-*`, `ps-*`, `pe-*`, `start-*`, `end-*`, `border-s-*`, `border-e-*`, `rounded-s-*`, `rounded-e-*`, `text-start`, `text-end`).
- No utilices colores hexadecimales ni valores en píxeles fijos en `className` — usa los tokens de `@theme`.
- No crees un archivo `tailwind.config` — Tailwind v4 se configura a través de `globals.css`.
- No importes `react-apexcharts`, `FullCalendar` o `Swiper` de forma estática — utiliza siempre `next/dynamic` con `ssr: false` (a menos que ya estén envueltos dentro de un límite exclusivo de cliente — confirma primero el patrón existente en la carpeta de esa feature).

---

## Punto Extra: Arquitectura Alternativa por Features (Feature-Driven Architecture)

Si este proyecto decidiera migrar de una arquitectura por capas (`components/`, `hooks/`, `types/`) a una **arquitectura por features (vertical slices)**, las carpetas y archivos actuales se reorganizarían de la siguiente manera:

### 1. Principio rector
* **`src/app/`**: Se reduce a enrutamiento puro (Thin Routes). Las páginas (`page.tsx`) solo reciben parámetros, manejan metadatos/i18n básicos y montan la vista exportada de la feature.
* **`src/features/<nombre-feature>/`**: Cada dominio de negocio encapsula todo su ciclo de vida (componentes específicos, schemas de Zod, tipos de TS, hooks y llamadas a API/servicios).
* **`src/components/` & `src/hooks/`**: Pasan a contener **únicamente lo compartido/genérico** del sistema de diseño (UI Primitives, layouts y utilidades transversales).

### 2. Árbol de directorios reorganizado

```text
src/
├── app/                              # Rutas puras y delgadas (Next.js App Router)
│   ├── [locale]/
│   │   ├── (public)/
│   │   │   └── (auth)/signin/page.tsx # Solo importa <SignInForm /> de @/features/auth
│   │   ├── admin/
│   │   │   ├── layout.tsx            # Shell administrativo
│   │   │   ├── page.tsx              # Dashboard home
│   │   │   └── profesionals/
│   │   │       └── page.tsx          # Solo importa <ProfessionalsView /> de @/features/professionals
│   │   └── layout.tsx
│   ├── favicon.ico
│   └── globals.css
│
├── features/                         # 🌟 Módulos de dominio de negocio autónomos
│   ├── auth/                         # (Extraído de src/components/auth/)
│   │   ├── components/               # SignInForm.tsx, SignUpForm.tsx...
│   │   ├── schemas/                  # auth.schema.ts (Zod)
│   │   ├── types/                    # auth.types.ts
│   │   └── index.ts                  # Barrel export público de la feature
│   │
│   ├── professionals/                # (Lógica y vistas extraídas de profesionals/page.tsx)
│   │   ├── components/               # ProfessionalCard.tsx, ProfessionalTable.tsx, StatsBadge.tsx...
│   │   ├── hooks/                    # useProfessionalFilters.ts...
│   │   ├── schemas/                  # professional.schema.ts (Zod)
│   │   ├── types/                    # professional.types.ts (DataTypes específicos)
│   │   ├── services/                 # professionals.api.ts (fetchers / server actions)
│   │   └── index.ts                  # Exporta: ProfessionalsView, etc.
│   │
│   └── dashboard/                    # Métricas globales, analíticas generales
│       ├── components/
│       └── ...
│
├── components/                       # 🧩 Solo UI compartida y componentes globales
│   ├── ui/                           # Primitivos agnósticos: button, modal, table, tabs, dropdown...
│   ├── form/                         # Inputs agnósticos: InputField, Radio, TextArea, Select, Switch...
│   └── common/                       # Breadcrumbs, ThemeToggle, Preloader...
│
├── layout/                           # Shell global: AppSidebar, AppHeader
├── context/                          # Contextos de UI globales: SidebarContext, ThemeContext
├── hooks/                            # Hooks utilitarios globales: useModal, useClickOutside, useGoBack...
├── icons/                            # Catálogo global de iconos SVG
├── i18n/                             # Routing y configuración de next-intl
├── messages/                         # Diccionarios de traducción (en.json, es.json...)
├── types/                            # Tipos globales de la app (navigation, context, etc.)
└── utils/                            # Funciones de ayuda compartidas
```

### 3. Dónde van los Schemas de Zod en este modelo
Cada schema reside **dentro de su propia feature** (`src/features/<feature>/schemas/<feature>.schema.ts`), permitiendo que el tipo inferido (`z.infer<typeof ...>`) y las validaciones de formulario viajen juntos con la lógica que los consume.

