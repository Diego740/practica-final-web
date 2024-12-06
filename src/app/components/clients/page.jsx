"use client";

import { useEffect, useState } from "react";
import ClientForm from "./clientsForm";
import ClientList from "./clientsList";
import { fetchClients, addClient, editClient, deleteClient } from "./apiClients";
import withAuth from "../withAuth";

const Clients = () => {
  const [clients, setClients] = useState([]);
  const [isAdding, setIsAdding] = useState(false);
  const [editingClient, setEditingClient] = useState(null);

  const loadClients = async () => {
    try {
      const data = await fetchClients();
      setClients(data);
    } catch (err) {
      console.error("Error al cargar clientes", err);
    }
  };

  const handleAddClient = async (values) => {
    try {
      const result = await addClient(values);
      if (result.success) {
        alert("Cliente agregado correctamente");
        loadClients();
        setIsAdding(false);
      }
    } catch (err) {
      alert("Hubo un error al agregar el cliente");
    }
  };

  const handleEditClient = async (values) => {
    try {
      const result = await editClient(values);
      if (result.success) {
        alert("Cliente actualizado correctamente");
        loadClients();
        setEditingClient(null);
      }
    } catch (err) {
      alert("Hubo un error al actualizar el cliente");
    }
  };

  const handleDeleteClient = async (clientId) => {
    try {
      const result = await deleteClient(clientId);
      if (result.success) {
        alert("Cliente eliminado correctamente");
        loadClients();
      }
    } catch (err) {
      alert("Hubo un error al eliminar el cliente");
    }
  };

  useEffect(() => {
    loadClients();
  }, []);

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100 rounded-xl">
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Gestión de Clientes</h1>

        {editingClient ? (
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Editar Cliente</h2>
            <ClientForm
              onSubmit={handleEditClient}
              initialValues={{
                ...editingClient,
                street: editingClient.address.street,
                number: editingClient.address.number,
                postal: editingClient.address.postal,
                city: editingClient.address.city,
                province: editingClient.address.province,
              }}
            />
          </div>
        ) : (
          <>
            <div className="mb-6">
              <ClientList
                clients={clients}
                onEdit={(client) => setEditingClient(client)}
                onDelete={handleDeleteClient}
              />
            </div>
            <button
              onClick={() => setIsAdding(true)}
              className="py-2 px-6 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Agregar Cliente
            </button>
          </>
        )}

        {isAdding && (
          <div className="mt-6 p-6 bg-white rounded-lg shadow-md">
            <h3 className="text-2xl font-bold mb-4 text-gray-800">Agregar Nuevo Cliente</h3>
            <ClientForm onSubmit={handleAddClient} />
          </div>
        )}
      </div>
    </div>
  );
};

export default withAuth(Clients);
