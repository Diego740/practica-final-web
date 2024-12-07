"use client";

const DeliveryNoteList = ({ deliveryNotes, onDelete, onView }) => {
  return (
    <ul className="space-y-4">
      {deliveryNotes.map((note) => (
        <li key={note._id} className="bg-white p-4 rounded-lg shadow-md">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="font-semibold text-lg text-gray-800">{note.material}</h2>
              <p className="text-gray-600">Horas: {note.hours}</p>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => onView(note._id)}
                className="text-blue-600 hover:text-blue-800"
              >
                Ver Más
              </button>
              <button
                onClick={() => onDelete(note._id)}
                className="text-red-600 hover:text-red-800"
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
