// TopBar.js
"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const TopBar = () => {
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
    <header className="flex justify-between items-center bg-gray-800 text-white p-4">
      <h2 className="text-2xl font-bold">Gestión albaranes APP</h2>
      <div className="flex space-x-4">
        {/* Condición para mostrar LogIn o Cerrar sesión */}
        {!isLoggedIn ? (
          <Link
            href="/components/login"
            className="hover:bg-gray-700 px-4 py-2 rounded"
          >
            LogIn
          </Link>
        ) : (
          <button
            onClick={handleLogout}
            className="hover:bg-gray-700 px-4 py-2 rounded"
          >
            Cerrar Sesión
          </button>
        )}
        <Link
          href="/settings"
          className="hover:bg-gray-700 px-4 py-2 rounded"
        >
          Ajustes
        </Link>
      </div>
    </header>
  );
};

export default TopBar;
