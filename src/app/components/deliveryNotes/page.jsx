"use client";

import { useEffect, useState } from "react";
import DeliveryNoteForm from "./deliveryNotesForm";
import DeliveryNoteList from "./deliveryNotesList";
import { useRouter } from "next/navigation";
import withAuth from "../withAuth";
import {
  fetchDeliveryNotes,
  addDeliveryNote,
  deleteDeliveryNote,
  downloadPDF,
} from "./apiDeliveryNotes"; // Importar funciones desde apiDeliveryNotes.js

const DeliveryNotes = () => {
  const [deliveryNotes, setDeliveryNotes] = useState([]);
  const [clients, setClients] = useState([]);
  const [projects, setProjects] = useState([]);
  const [isAdding, setIsAdding] = useState(false);
  const router = useRouter();

  // Fetch all delivery notes
  const fetchAllDeliveryNotes = async () => {
    try {
      const data = await fetchDeliveryNotes();
      setDeliveryNotes(data);
    } catch (error) {
      console.error("Error fetching delivery notes:", error);
    }
  };

  // Fetch clients and projects
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

  // Add a new delivery note
  const addNewDeliveryNote = async (values) => {
    try {
      await addDeliveryNote(values);
      fetchAllDeliveryNotes(); // Refresh the list after adding
      setIsAdding(false);
    } catch (error) {
      console.error("Error adding delivery note:", error);
    }
  };

  // Delete a delivery note
  const deleteDeliveryNoteHandler = async (id) => {
    try {
      await deleteDeliveryNote(id);
      fetchAllDeliveryNotes(); // Refresh the list after deletion
    } catch (error) {
      console.error("Error deleting delivery note:", error);
    }
  };

  // Download a PDF
  const downloadPDFHandler = async (id) => {
    try {
      await downloadPDF(id);
    } catch (error) {
      console.error("Error downloading PDF:", error);
    }
  };

  useEffect(() => {
    fetchAllDeliveryNotes();
    fetchClientsAndProjects();
  }, []);

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100 rounded-xl">
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Lista de Albaranes</h1>

        <DeliveryNoteList
          deliveryNotes={deliveryNotes}
          onDelete={deleteDeliveryNoteHandler}
          onView={downloadPDFHandler}
          clients={clients}
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
            <DeliveryNoteForm onSubmit={addNewDeliveryNote} clients={clients} projects={projects} />
          </div>
        )}
      </div>
    </div>
  );
};

export default withAuth(DeliveryNotes);
