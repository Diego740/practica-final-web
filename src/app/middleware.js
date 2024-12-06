// app/middleware.js

import { NextResponse } from "next/server";
import { cookies } from "next/headers";

// Middleware para verificar la autenticación
export function middleware(request) {
  // Obtenemos el token de las cookies
  const token = cookies().get('jwt')?.value;

  // Si el token no existe, redirigir a la página de login
  if (!token) {
    return NextResponse.redirect(new URL("/components/login", request.url));
  }

  // Si el token existe, permitimos que continúe la petición
  return NextResponse.next();
}

// Configuración para las rutas que deben ser protegidas
export const config = {
  matcher: [
    "/dashboard/*",       // Rutas que requieren autenticación
    "/clients/*",         // Rutas que requieren autenticación
    "/projects/*",        // Rutas que requieren autenticación
    "/deliverynotes/*",   // Rutas que requieren autenticación
  ],
};
