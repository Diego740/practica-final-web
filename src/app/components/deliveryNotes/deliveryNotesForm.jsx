"use client";

import { useFormik } from "formik";
import * as Yup from "yup";

const DeliveryNoteForm = ({ onSubmit, clients, projects }) => {
  const formik = useFormik({
    initialValues: {
      clientId: "",
      projectId: "",
      format: "",
      material: "",
      hours: "",
      description: "",
      workdate: "",
    },
    validationSchema: Yup.object({
      clientId: Yup.string().required("El cliente es obligatorio"),
      projectId: Yup.string().required("El proyecto es obligatorio"),
      format: Yup.string().required("El formato es obligatorio"),
      material: Yup.string().required("El tipo de material es obligatorio"),
      hours: Yup.number().required("Las horas son obligatorias"),
      description: Yup.string().required("La descripción es obligatoria"),
      workdate: Yup.date().required("La fecha de trabajo es obligatoria"),
    }),
    onSubmit,
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Selección de cliente */}
        <div>
          <label htmlFor="clientId" className="block font-medium text-gray-700">
            Cliente
          </label>
          <select
            name="clientId"
            id="clientId"
            value={formik.values.clientId}
            onChange={formik.handleChange}
            className="w-full p-2 border border-gray-300 rounded-lg text-gray-700"
          >
            <option value="">Seleccionar Cliente</option>
            {clients.map((client) => (
              <option key={client._id} value={client._id}>
                {client.name}
              </option>
            ))}
          </select>
          {formik.errors.clientId && formik.touched.clientId && (
            <div className="text-red-500 text-sm">{formik.errors.clientId}</div>
          )}
        </div>

        {/* Selección de proyecto */}
        <div>
          <label htmlFor="projectId" className="block font-medium text-gray-700">
            Proyecto
          </label>
          <select
            name="projectId"
            id="projectId"
            value={formik.values.projectId}
            onChange={formik.handleChange}
            className="w-full p-2 border border-gray-300 rounded-lg text-gray-700"
          >
            <option value="">Seleccionar Proyecto</option>
            {projects.map((project) => (
              <option key={project._id} value={project._id}>
                {project.name}
              </option>
            ))}
          </select>
          {formik.errors.projectId && formik.touched.projectId && (
            <div className="text-red-500 text-sm">{formik.errors.projectId}</div>
          )}
        </div>

        {/* Otros campos */}
        <div>
          <label htmlFor="format" className="block font-medium text-gray-700">
            Formato
          </label>
          <select
            name="format"
            id="format"
            value={formik.values.format}
            onChange={formik.handleChange}
            className="w-full p-2 border border-gray-300 rounded-lg text-gray-700"
          >
            <option value="">Seleccionar formato</option>
            <option value="hours">Horas</option>
            <option value="material">Material</option>
          </select>
          {formik.errors.format && formik.touched.format && (
            <div className="text-red-500 text-sm">{formik.errors.format}</div>
          )}
        </div>

        <div>
          <label htmlFor="material" className="block font-medium text-gray-700">
            Material
          </label>
          <input
            type="text"
            name="material"
            id="material"
            value={formik.values.material}
            onChange={formik.handleChange}
            className="w-full p-2 border border-gray-300 rounded-lg text-gray-700"
          />
          {formik.errors.material && formik.touched.material && (
            <div className="text-red-500 text-sm">{formik.errors.material}</div>
          )}
        </div>

        <div>
          <label htmlFor="hours" className="block font-medium text-gray-700">
            Horas
          </label>
          <input
            type="number"
            name="hours"
            id="hours"
            value={formik.values.hours}
            onChange={formik.handleChange}
            className="w-full p-2 border border-gray-300 rounded-lg text-gray-700"
          />
          {formik.errors.hours && formik.touched.hours && (
            <div className="text-red-500 text-sm">{formik.errors.hours}</div>
          )}
        </div>

        <div>
          <label htmlFor="description" className="block font-medium text-gray-700">
            Descripción
          </label>
          <input
            type="text"
            name="description"
            id="description"
            value={formik.values.description}
            onChange={formik.handleChange}
            className="w-full p-2 border border-gray-300 rounded-lg text-gray-700"
          />
          {formik.errors.description && formik.touched.description && (
            <div className="text-red-500 text-sm">{formik.errors.description}</div>
          )}
        </div>

        <div>
          <label htmlFor="workdate" className="block font-medium text-gray-700">
            Fecha de Trabajo
          </label>
          <input
            type="date"
            name="workdate"
            id="workdate"
            value={formik.values.workdate}
            onChange={formik.handleChange}
            className="w-full p-2 border border-gray-300 rounded-lg text-gray-700"
          />
          {formik.errors.workdate && formik.touched.workdate && (
            <div className="text-red-500 text-sm">{formik.errors.workdate}</div>
          )}
        </div>
      </div>

      <button
        type="submit"
        className="mt-4 py-2 px-6 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
      >
        Guardar Albarán
      </button>
    </form>
  );
};

export default DeliveryNoteForm;
