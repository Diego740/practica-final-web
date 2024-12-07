"use client";

import { useState, useEffect } from "react";
import ProjectList from "./projectList";
import ProjectForm from "./projectForm";
import ClientFilter from "./clientFilter"; // Importamos el filtro de clientes
import { fetchClients } from "../clients/apiClients";
import { fetchProjects, addProject, editProject, deleteProject } from "./apiProjects";
import Link from "next/link";
import withAuth from "../withAuth";

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [clients, setClients] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [isAdding, setIsAdding] = useState(false);
  const [editingProject, setEditingProject] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [fetchedClients, fetchedProjects] = await Promise.all([
          fetchClients(),
          fetchProjects(),
        ]);

        setClients(fetchedClients);
        setProjects(fetchedProjects);
        setFilteredProjects(fetchedProjects); // Inicialmente, mostramos todos los proyectos
      } catch (error) {
        console.error("Error al cargar datos:", error);
      }
    };

    fetchData();
  }, []);

  const handleAddProject = async (values) => {
    try {
      const newProject = await addProject(values);
      setProjects((prevProjects) => [...prevProjects, newProject]);
      setFilteredProjects((prevFiltered) => [...prevFiltered, newProject]);
      setIsAdding(false);
    } catch (error) {
      console.error("Error al agregar proyecto:", error);
    }
  };

  const handleEditProject = async (values) => {
  try {
    console.log("Valores antes de editar:", values); // Verificar datos enviados
    const updatedProject = await editProject(values);

    // Actualizar proyectos en el estado
    setProjects((prevProjects) =>
      prevProjects.map((proj) =>
        proj._id === updatedProject._id ? updatedProject : proj
      )
    );
    setEditingProject(null);
    alert("Proyecto actualizado correctamente.");
  } catch (error) {
    console.error("Error al editar proyecto:", error);
    alert("Hubo un error al editar el proyecto.");
  }
};


  const handleDeleteProject = async (projectId) => {
    try {
      const success = await deleteProject(projectId); // Llamada a la API para eliminar el proyecto
      if (success) {
        // Actualizar los estados locales `projects` y `filteredProjects`
        setProjects((prevProjects) =>
          prevProjects.filter((proj) => proj._id !== projectId)
        );
        setFilteredProjects((prevFiltered) =>
          prevFiltered.filter((proj) => proj._id !== projectId)
        );
  
        alert("Proyecto eliminado correctamente.");
      } else {
        alert("No se pudo eliminar el proyecto.");
      }
    } catch (error) {
      console.error("Error al eliminar proyecto:", error);
      alert("Hubo un error al intentar eliminar el proyecto.");
    }
  };
  

  // Función para filtrar los proyectos según el cliente
  const handleClientFilterChange = (clientId) => {
    if (clientId === "all") {
      setFilteredProjects(projects); // Mostrar todos los proyectos
    } else {
      const filtered = projects.filter((project) => project.clientId === clientId);
      setFilteredProjects(filtered); // Filtrar los proyectos del cliente seleccionado
    }
  };

  if (clients.length === 0) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100 rounded-xl">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4 text-gray-700">No hay clientes disponibles</h1>
          <p className="mb-6 text-gray-700">Primero necesitas crear un cliente para asociar proyectos.</p>
          <Link
            href="/components/clients"
            className="py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Ir a Clientes
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100 rounded-xl">
      <div className="container mx-auto p-6 bg-gray-100 rounded-xl h-screen">
            <h1 className="text-3xl font-bold mb-6 text-gray-700">Gestión de Proyectos</h1>

            
            <ClientFilter clients={clients} onFilterChange={handleClientFilterChange} />

            {editingProject ? (
              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-4 text-gray-700">Editar Proyecto</h2>
                <ProjectForm
                  onSubmit={handleEditProject}
                  onCancel={() => setEditingProject(null)}
                  initialValues={editingProject}
                  clients={clients}
                />
              </div>
            ) : (
              <>
                <ProjectList
                  projects={filteredProjects}
                  onEdit={setEditingProject}
                  onDelete={handleDeleteProject}
                />
                {!isAdding && (
                  <button
                    onClick={() => setIsAdding(true)}
                    className="py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                  >
                    Agregar Proyecto
                  </button>
                )}
              </>
            )}

            {isAdding && (
              <div className="mt-6">
                <h2 className="text-xl font-semibold mb-4 text-gray-700">Agregar Nuevo Proyecto</h2>
                <ProjectForm
                  onSubmit={handleAddProject}
                  onCancel={() => setIsAdding(false)}
                  clients={clients}
                />
              </div>
            )}
          </div>
    </div>
    
  );
};

export default withAuth(Projects);
