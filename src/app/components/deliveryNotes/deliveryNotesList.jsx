"use client";

const DeliveryNoteList = ({ deliveryNotes, onDelete, onView, clients }) => {


  const getClientName = (clientId) => {
    const client = clients.find((client) => client._id === clientId);
    return client ? client.name : "Cliente desconocido";
  };

  return (
    <ul className="space-y-4">
      {deliveryNotes.map((note) => (
        <li key={note._id} className="bg-white p-4 rounded-lg shadow-md">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="font-semibold text-lg text-gray-800">{note.description}</h2>
              <p className="text-gray-600">Horas: {note.hours}</p>
              <p className="text-gray-600">Cliente: {getClientName(note.clientId)}</p>
            </div>
            <div className="flex space-x-4">
              <button
                onClick={() => onView(note._id)}
                className="py-2 px-4 bg-blue-600 text-white rounded-lg hover:text-blue-800"
              >
                Descargar PDF
              </button>
              <button
                onClick={() => onDelete(note._id)}
                className="py-2 px-4 bg-red-600 text-white rounded-lg hover:text-red-800"
              >
                Eliminar
              </button>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default DeliveryNoteList;
