"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";


export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Estado para el inicio de sesión
  const router = useRouter();

  useEffect(() => {
    // Verificar si el token está presente en localStorage
    const token = localStorage.getItem("jwt");
    setIsLoggedIn(!!token); // Actualizar el estado según la presencia del token
  }, []);

  const handleLogout = () => {
    // Eliminar el token de localStorage
    localStorage.removeItem("jwt");

    setIsLoggedIn(false); // Actualizar el estado
    router.push("/"); // Redirigir al usuario a la página de inicio
  };

  return (
    <div className="flex flex-col h-screen w-64 bg-gray-800 text-white fixed">
      <div className="p-4">
        <h1 className="text-2xl font-bold">Gestión App</h1>
      </div>
      <nav className="flex flex-col mt-4 space-y-2">
        <Link href="/components/dashboard" className="hover:bg-gray-700 px-4 py-2 rounded">
          Inicio
        </Link>
        <Link href="/components/clients" className="hover:bg-gray-700 px-4 py-2 rounded">
          Clientes
        </Link>
        <Link href="/projects" className="hover:bg-gray-700 px-4 py-2 rounded">
          Proyectos
        </Link>
        <Link href="/deliverynotes" className="hover:bg-gray-700 px-4 py-2 rounded">
          Albaranes
        </Link>
        <Link href="/settings" className="hover:bg-gray-700 px-4 py-2 rounded">
          Ajustes
        </Link>

        {!isLoggedIn ? (
          <Link href="/components/login" className="hover:bg-gray-700 px-4 py-2 rounded">
            LogIn
          </Link>
        ) : (
          <button
            onClick={handleLogout}
            className="text-left hover:bg-gray-700 px-4 py-2 rounded"
          >
            Cerrar Sesión
          </button>
        )}
      </nav>
    </div>
  );
}
