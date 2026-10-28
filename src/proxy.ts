import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { NextRequest, NextResponse } from "next/server";

const intlMiddleware = createMiddleware(routing);

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("auth_token")?.value;

  const isAdminRoute = pathname.includes("/admin");
  const isAuthRoute = pathname.includes("/signin") || pathname.includes("/signup");

  // 1. Si intenta entrar a /admin sin token -> Redirige a /signin
  if (isAdminRoute && !token) {
    const signInUrl = new URL("/signin", request.url);
    return NextResponse.redirect(signInUrl);
  }

  // 2. Si ya está logueado e intenta ir a login/registro -> Redirige a /admin
  if (isAuthRoute && token) {
    const adminUrl = new URL("/admin", request.url);
    return NextResponse.redirect(adminUrl);
  }

  // 3. Continuar con la internacionalización
  return intlMiddleware(request);
}

export const config = {
  matcher: ["/((?!api/|_next|_vercel|.*\\..*).*)"],
};
