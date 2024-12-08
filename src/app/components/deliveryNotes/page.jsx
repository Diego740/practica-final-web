"use client";

import { useEffect, useState } from "react";
import DeliveryNoteForm from "./deliveryNotesForm";
import DeliveryNoteList from "./deliveryNotesList";
import { useRouter } from "next/navigation";
import withAuth from "../withAuth";

const DeliveryNotes = () => {
  const [deliveryNotes, setDeliveryNotes] = useState([]);
  const [clients, setClients] = useState([]);
  const [projects, setProjects] = useState([]);
  const [isAdding, setIsAdding] = useState(false);
  const router = useRouter();

  
  const fetchClientsAndProjects = async () => {
    const token = localStorage.getItem("jwt");
    try {
      const [clientResponse, projectResponse] = await Promise.all([
        fetch("https://bildy-rpmaya.koyeb.app/api/client", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }),
        fetch("https://bildy-rpmaya.koyeb.app/api/project", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }),
      ]);

      if (clientResponse.ok && projectResponse.ok) {
        setClients(await clientResponse.json());
        setProjects(await projectResponse.json());
      } else {
        console.error("Error al cargar clientes o proyectos");
      }
    } catch (err) {
      console.error("Error en la conexión", err);
    }
  };

  // Fetch all delivery notes
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
        console.error("Error al obtener los albaranes");
      }
    } catch (err) {
      console.error("Error en la conexión", err);
    }
  };

  // Add a new delivery note
  const addDeliveryNote = async (values) => {
    const token = localStorage.getItem("jwt");
    try {
      const response = await fetch("https://bildy-rpmaya.koyeb.app/api/deliverynote", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(values),
      });
      if (response.ok) {
        alert("Albarán creado correctamente");
        fetchDeliveryNotes();
        setIsAdding(false);
      } else {
        alert("Error al agregar el albarán");
      }
    } catch (err) {
      console.error("Error en la conexión", err);
    }
  };

  // Delete a delivery note
  const deleteDeliveryNote = async (id) => {
    const token = localStorage.getItem("jwt");
    try {
      const response = await fetch(`https://bildy-rpmaya.koyeb.app/api/deliverynote/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        alert("Albarán eliminado correctamente");
        fetchDeliveryNotes();
      } else {
        alert("Error al eliminar el albarán");
      }
    } catch (err) {
      console.error("Error en la conexión", err);
    }
  };

  // Download delivery note PDF
  const downloadPDF = async (id) => {
    const token = localStorage.getItem("jwt");
    try {
      const response = await fetch(`https://bildy-rpmaya.koyeb.app/api/deliverynote/pdf/${id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", `albaran-${id}.pdf`);
        document.body.appendChild(link);
        link.click();
        link.parentNode.removeChild(link);
      } else {
        alert("Error al descargar el PDF");
      }
    } catch (err) {
      console.error("Error en la conexión", err);
    }
  };

  useEffect(() => {
    fetchDeliveryNotes();
    fetchClientsAndProjects();
  }, []);

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100 rounded-xl">
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Lista de Albaranes</h1>

        <DeliveryNoteList
          deliveryNotes={deliveryNotes}
          onDelete={deleteDeliveryNote}
          onView={downloadPDF}
          clients = {clients}
        />

        <button
          onClick={() => setIsAdding(true)}
          className="py-2 px-6 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Agregar Albarán
        </button>

        {isAdding && (
          <div className="mt-6 p-6 bg-white rounded-lg shadow-md">
            <h3 className="text-2xl font-bold mb-4 text-gray-800">Agregar Nuevo Albarán</h3>
            <DeliveryNoteForm onSubmit={addDeliveryNote} 
            clients={clients}
            projects={projects}/>
          </div>
        )}
      </div>
    </div>
  );
};

export default withAuth(DeliveryNotes);
