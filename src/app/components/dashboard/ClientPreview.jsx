"use client";

const ClientPreview = ({ clients }) => {
  return (
    <div className="space-y-4">
      {clients.length > 0 ? (
        clients.slice(0, 3).map((client) => (
          <div
            key={client._id}
            className="bg-white p-6 rounded-lg shadow-lg border border-gray-200 hover:shadow-xl transition-all"
          >
            <h2 className="font-semibold text-lg text-gray-800">{client.name}</h2>
            <p className="text-gray-600">{client.cif}</p>
            <p className="text-gray-500">
              {client.address.street}, {client.address.city}
            </p>
          </div>
        ))
      ) : (
        <p className="text-gray-600">No hay clientes registrados</p>
      )}
    </div>
  );
};

export default ClientPreview;
