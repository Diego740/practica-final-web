"use client";

const ClientFilter = ({ clients, onFilterChange }) => {
  const handleClientChange = (e) => {
    onFilterChange(e.target.value);
  };

  return (
    <div className="mb-6 p-4 bg-white rounded-lg shadow-md">
      <label
        htmlFor="clientFilter"
        className="font-semibold text-gray-800 block mb-2"
      >
        Filtrar por Cliente:
      </label>
      <select
        id="clientFilter"
        onChange={handleClientChange}
        className="w-full p-3 border border-gray-300 rounded-lg text-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-300"
      >
        <option value="all">Todos los clientes</option>
        {clients.map((client) => (
          <option key={client._id} value={client._id}>
            {client.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ClientFilter;
