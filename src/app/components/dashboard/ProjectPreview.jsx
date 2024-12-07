"use client";

const ProjectPreview = ({ projects }) => {
  return (
    <div className="space-y-4">
      {projects.length > 0 ? (
        projects.slice(0, 3).map((project) => (
          <div
            key={project._id}
            className="bg-white p-6 rounded-lg shadow-lg border border-gray-200 hover:shadow-xl transition-all"
          >
            <h2 className="font-semibold text-lg text-gray-800">{project.name}</h2>
            <p className="text-gray-600">{project.description}</p>
          </div>
        ))
      ) : (
        <p className="text-gray-600">No hay proyectos registrados</p>
      )}
    </div>
  );
};

export default ProjectPreview;
