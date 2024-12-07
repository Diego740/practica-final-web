"use client";

import { useEffect, useState } from "react";
import DeliveryNoteForm from "./deliveryNotesForm";
import DeliveryNoteList from "./deliveryNotesList";
import { useRouter } from "next/navigation";
import withAuth from "../withAuth";


const DeliveryNotes = () => {
  const [deliveryNotes, setDeliveryNotes] = useState([]);
  const [isAdding, setIsAdding] = useState(false);
  const router = useRouter();

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

  // Función para agregar albarán
  const addDeliveryNote = async (values) => {
    const token = localStorage.getItem("jwt");
    try {
      const response = await fetch("https://bildy-rpmaya.koyeb.app/api/deliverynote", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          clientId: values.clientId,
          projectId: values.projectId,
          format: values.format,
          material: values.material,
          hours: values.hours,
          description: values.description,
          workdate: values.workdate,
        }),
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

  useEffect(() => {
    fetchDeliveryNotes();
  }, []);

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100 rounded-xl">
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Lista de Albaranes</h1>

        <DeliveryNoteList deliveryNotes={deliveryNotes} />

        <button
          onClick={() => setIsAdding(true)}
          className="py-2 px-6 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Agregar Albarán
        </button>

        {isAdding && (
          <div className="mt-6 p-6 bg-white rounded-lg shadow-md">
            <h3 className="text-2xl font-bold mb-4 text-gray-800">Agregar Nuevo Albarán</h3>
            <DeliveryNoteForm onSubmit={addDeliveryNote} />
          </div>
        )}
      </div>
    </div>
  );
};

export default withAuth(DeliveryNotes);
