import { useState } from "react";

const ProjectList = ({ projects, onEdit, onDelete }) => {
  const [expandedProject, setExpandedProject] = useState(null);

  const showMore = (projectId) => {
    setExpandedProject((prev) => (prev === projectId ? null : projectId));
  };

  return (
    <div className="mb-6">
      {projects.map((project) => (
        <div
          key={project._id}
          className="flex justify-between items-center mb-4 p-4 bg-white shadow-md rounded-lg text-gray-700"
        >
          <div>
            <h3 className="text-xl font-bold">{project.name}</h3>
            <p>Código: {project.projectCode}</p>

            {/* Mostrar más detalles si el proyecto está expandido */}
            {expandedProject === project._id && (
              <div className="mt-4 text-gray-600">
                <p>
                  <strong>Correo electrónico:</strong> {project.email}
                </p>
                <p>
                  <strong>Cliente:</strong> {project.clientId}
                </p>
                <p>
                  <strong>Calle:</strong> {project.address?.street}
                </p>
                <p>
                  <strong>Número:</strong> {project.address?.number}
                </p>
                <p>
                  <strong>Código Postal:</strong> {project.address?.postal}
                </p>
                <p>
                  <strong>Ciudad:</strong> {project.address?.city}
                </p>
                <p>
                  <strong>Provincia:</strong> {project.address?.province}
                </p>
              </div>
            )}
          </div>

          <div>
            <button
              onClick={() => onEdit(project)}
              className="mr-4 py-2 px-4 bg-yellow-500 text-white rounded-lg"
            >
              Editar
            </button>
            <button
              onClick={() => onDelete(project._id)}
              className="py-2 px-4 bg-red-600 text-white rounded-lg"
            >
              Eliminar
            </button>
            <button
              onClick={() => showMore(project._id)}
              className={`ml-4 py-2 px-4 ${
                expandedProject === project._id
                  ? "bg-gray-500"
                  : "bg-blue-600"
              } text-white rounded-lg`}
            >
              {expandedProject === project._id
                ? "Ver menos"
                : "Ver más información"}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProjectList;
