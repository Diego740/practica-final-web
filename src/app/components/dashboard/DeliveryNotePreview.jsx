"use client";

const DeliveryNotePreview = ({ deliveryNotes }) => {
  return (
    <div className="space-y-4">
      {deliveryNotes.length > 0 ? (
        deliveryNotes.slice(0, 3).map((note) => (
          <div
            key={note._id}
            className="bg-white p-6 rounded-lg shadow-lg border border-gray-200 hover:shadow-xl transition-all"
          >
            <h2 className="font-semibold text-lg text-gray-800">{note.description}</h2>
            <p className="text-gray-600">Proyecto: {note.projectId}</p>
            <p className="text-gray-500">Cliente: {note.clientId}</p>
            <p className="text-gray-500">Fecha: {note.workdate}</p>
          </div>
        ))
      ) : (
        <p className="text-gray-600">No hay albaranes registrados</p>
      )}
    </div>
  );
};

export default DeliveryNotePreview;
