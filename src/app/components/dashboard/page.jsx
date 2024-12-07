"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ClientPreview from "./ClientPreview.jsx";
import ProjectPreview from "./ProjectPreview";
import DeliveryNotePreview from "./DeliveryNotePreview.jsx";
import withAuth from "../withAuth.js";

const Dashboard = () => {
  const [clients, setClients] = useState([]);
  const [projects, setProjects] = useState([]);
  const [deliveryNotes, setDeliveryNotes] = useState([]);
  const router = useRouter();

  const fetchClients = async () => {
    const token = localStorage.getItem("jwt");

    try {
      const response = await fetch("https://bildy-rpmaya.koyeb.app/api/client", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setClients(data);
      } else {
        console.error("Error al obtener clientes");
      }
    } catch (err) {
      console.error("Error en la conexión", err);
    }
  };

  const fetchProjects = async () => {
    const token = localStorage.getItem("jwt");

    try {
      const response = await fetch("https://bildy-rpmaya.koyeb.app/api/project", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setProjects(data);
      } else {
        console.error("Error al obtener proyectos");
      }
    } catch (err) {
      console.error("Error en la conexión", err);
    }
  };

  const fetchDeliveryNotes = async () => {
    const token = localStorage.getItem("jwt");

    try {
      const response = await fetch("https://bildy-rpmaya.koyeb.app/api/deliverynote", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setDeliveryNotes(data);
      } else {
        console.error("Error al obtener albaranes");
      }
    } catch (err) {
      console.error("Error en la conexión", err);
    }
  };

  useEffect(() => {
    fetchClients();
    fetchProjects();
    fetchDeliveryNotes();
  }, []);

  return (

    <div className="flex items-center justify-center h-screen bg-gray-100 rounded-xl">
      <div className="p-6 space-y-8">
        <h1 className="text-3xl font-semibold text-gray-800 mb-6">Dashboard</h1>

        {/* Dashboard Preview: Clientes, Proyectos, y Albaranes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* Clientes Preview */}
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-bold text-gray-700 mb-4">CLIENTES</h2>
            <ClientPreview clients={clients} />
          </div>

          {/* Proyectos Preview */}
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-bold text-gray-700 mb-4">PROYECTOS</h2>
            <ProjectPreview projects={projects} />
          </div>

          {/* Albaranes Preview */}
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-bold text-gray-700 mb-4">ALBARANES</h2>
            <DeliveryNotePreview deliveryNotes={deliveryNotes} />
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default withAuth(Dashboard);
