"use client";

import Link from "next/link";
import { useEffect, useState } from "react";



export default function Navbar() {
   

  return (
    <div className="flex flex-col h-screen w-64 bg-gray-800 text-white fixed">
      <div className="p-4">

      </div>
      <nav className="flex flex-col mt-4 space-y-2">
        <Link href="/components/dashboard" className="hover:bg-gray-700 px-4 py-2 rounded">
          Inicio
        </Link>
        <Link href="/components/clients" className="hover:bg-gray-700 px-4 py-2 rounded">
          Clientes
        </Link>
        <Link href="/components/projects" className="hover:bg-gray-700 px-4 py-2 rounded">
          Proyectos
        </Link>
        <Link href="/components/deliveryNotes" className="hover:bg-gray-700 px-4 py-2 rounded">
          Albaranes
        </Link>
        
      </nav>
    </div>
  );
}
