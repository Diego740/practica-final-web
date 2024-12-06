"use client";

import { useState } from "react";

const ClientList = ({ clients, onEdit, onDelete }) => {
  const [expandedClientId, setExpandedClientId] = useState(null);

  const handleExpand = (id) => {
    setExpandedClientId(id === expandedClientId ? null : id);
  };

  return (
    <ul className="space-y-4">
      {clients.map((client) => (
        <li key={client._id} className="bg-white p-4 rounded-lg shadow-md">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="font-semibold text-lg text-gray-800">{client.name}</h2>
              <p className="text-gray-600">{client.cif}</p>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => handleExpand(client._id)}
                className="text-blue-600 hover:text-blue-800"
              >
                {expandedClientId === client._id ? "Cerrar" : "Ver Más"}
              </button>
              <button
                onClick={() => onEdit(client)}
                className="text-yellow-600 hover:text-yellow-800"
              >
                Editar
              </button>
              <button
                onClick={() => onDelete(client._id)}
                className="text-red-600 hover:text-red-800"
              >
                Eliminar
              </button>
            </div>
          </div>
          {expandedClientId === client._id && (
            <div className="mt-4 text-gray-700">
              <p><strong>Dirección:</strong> {client.address.street}, {client.address.number}, {client.address.city}</p>
              <p><strong>Código Postal:</strong> {client.address.postal}</p>
              <p><strong>Provincia:</strong> {client.address.province}</p>
            </div>
          )}
        </li>
      ))}
    </ul>
  );
};

export default ClientList;
