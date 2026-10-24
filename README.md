## Guía de Arquitectura de Rutas y Seguridad (Admin vs Public)

### 1. ¿Cómo cambiar las rutas de admin para que tengan el prefijo `/admin`?
En Next.js App Router, las carpetas con paréntesis como `(admin)` son **Route Groups** (grupos invisibles en la URL).
Para que `/admin` forme parte de la URL:
1. **Renombrar la carpeta**:
   - De: `src/app/[locale]/(admin)`
   - A: `src/app/[locale]/admin`
2. **Resultado en URLs**:
   - `src/app/[locale]/admin/page.tsx` ➡️ `http://localhost:3000/admin`
   - `src/app/[locale]/admin/profesionals/page.tsx` ➡️ `http://localhost:3000/admin/profesionals`
3. **Actualizar el Sidebar ([src/layout/AppSidebar.tsx](file:///c:/Users/RAM/Desktop/Proyectos/templates/NEXT/nextjs-admin-dashboard/src/layout/AppSidebar.tsx))**:
   ```typescript
   const adminItems: NavItem[] = [
     {
       icon: <GridIcon />,
       key: "dashboard",
       path: "/admin"
     },
     {
       icon: <UserCircleIcon />,
       key: "profesionals",
       path: "/admin/profesionals"
     }
   ];
   ```

---

### 2. ¿Cómo manejar el área pública y el Home/Landing (`/`)?
Actualmente el área de autenticación se encuentra en:
`src/app/[locale]/(full-width-pages)/(auth)/signin/page.tsx`

- **Si mantienes los paréntesis `(public)`**:
  - Las URLs se mantienen limpias y directas: `/signin`, `/signup`.
  - Si en el futuro agregas `src/app/[locale]/(public)/page.tsx`, ese archivo responderá en la raíz `http://localhost:3000/` como Home o Landing pública.
- **Si no usas paréntesis `public`**:
  - Las URLs forzarían `/public/signin`, lo cual no es recomendable para la experiencia del usuario. Por tanto, se recomienda usar `(public)` con paréntesis.

---

### 3. ¿Cómo renombrar `(full-width-pages)` a `(public)`?
Simplemente renombra la carpeta:
- De: `src/app/[locale]/(full-width-pages)`
- A: `src/app/[locale]/(public)`

Next.js no se romperá porque los Route Groups son invisibles en las importaciones y URLs; solo heredan su `layout.tsx` (que contiene el contenedor de ancho completo sin sidebar).

---

### 4. ¿Cómo validar y proteger rutas (Admin vs Public)? ¿Existe un Middleware o se usa Context?

#### Ubicación del Middleware en este proyecto:
En este proyecto con Next.js 16 y `next-intl`, el middleware se encuentra en:
👉 **[src/proxy.ts](file:///c:/Users/RAM/Desktop/Proyectos/templates/NEXT/nextjs-admin-dashboard/src/proxy.ts)** *(Next.js 16 lo reconoce como `Proxy (Middleware)`)*.

#### ¿Middleware o Context?
- **Usar SOLO Context NO ES SEGURO**: Si validas la sesión únicamente con un `AuthContext` y `useEffect` en el cliente:
  1. El navegador descarga y ejecuta el layout del Admin antes de verificar la sesión.
  2. Provoca un "parpadeo" (FOUC) donde el usuario no autenticado ve el dashboard por unos milisegundos antes de ser redirigido.
  3. No protege los Server Components de ejecutar consultas en el servidor.
- **Middleware (En el Servidor) es la solución correcta**: Intercepta la petición HTTP **antes** de que el servidor empiece a renderizar la página. Si no existe la cookie de sesión/JWT, redirige inmediatamente a `/signin`.

#### Implementación recomendada en [src/proxy.ts](file:///c:/Users/RAM/Desktop/Proyectos/templates/NEXT/nextjs-admin-dashboard/src/proxy.ts):
```typescript
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { NextRequest, NextResponse } from "next/server";

const intlMiddleware = createMiddleware(routing);

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // 1. Verificar si la ruta requiere autenticación (ej: /admin o /es/admin)
  const isAdminRoute = pathname.includes("/admin");
  const token = request.cookies.get("auth_token")?.value; // O cookie de sesión de NestJS

  // 2. Si es ruta de admin y no tiene token, redirigir al login
  if (isAdminRoute && !token) {
    const signInUrl = new URL("/signin", request.url);
    return NextResponse.redirect(signInUrl);
  }

  // 3. Continuar con la internacionalización (next-intl)
  return intlMiddleware(request);
}

export const config = {
  matcher: ["/((?!api/|_next|_vercel|.*\\..*).*)"],
};
```

#### Arquitectura Integral:
- **Middleware ([src/proxy.ts](file:///c:/Users/RAM/Desktop/Proyectos/templates/NEXT/nextjs-admin-dashboard/src/proxy.ts))**: Guarda de seguridad (Server-side). Bloquea accesos no autorizados a `/admin/*`.
- **Context (`AuthContext`)**: Manejo de estado en memoria (Client-side). Para mostrar los datos del usuario logueado (`user.name`, avatar) y ocultar/mostrar botones según su rol (`admin`, `professional`, `receptionist`).



Simula un pequeño delay de red (300-500ms): Si retornas PROFESIONALS_DATA inmediatamente, nunca podrás ver si tus isLoading, skeletons o spinners de React Query funcionan. Simúlalo así:

ts
getProfesionales: async (): Promise<Professional[]> => {
    // Simular 400ms de latencia de red
    await new Promise((resolve) => setTimeout(resolve, 400));
    
    // const { data } = await apiClient.get<Professional[]>('/profesionales');
    // return data;
    return PROFESIONALS_DATA;
},
