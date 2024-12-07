"use client";

import { useFormik } from "formik";
import * as Yup from "yup";

const ProjectForm = ({ onSubmit, onCancel, initialValues = {}, clients }) => {
  // Aseguramos que `initialValues` tenga un objeto vacío para `address` en caso de que no se pase.
  const formik = useFormik({
    initialValues: {
      name: initialValues.name || "",
      projectCode: initialValues.projectCode || "",
      email: initialValues.email || "",
      clientId: initialValues.clientId || "",
      address: {
        street: initialValues.address?.street || "",
        number: initialValues.address?.number || "",
        postal: initialValues.address?.postal || "",
        city: initialValues.address?.city || "",
        province: initialValues.address?.province || "",
      },
      code: initialValues.code || "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("El nombre del proyecto es obligatorio"),
      projectCode: Yup.string().required("El código del proyecto es obligatorio"),
      email: Yup.string().email("Correo electrónico inválido").required("El correo electrónico es obligatorio"),
      clientId: Yup.string().required("Selecciona un cliente"),
      address: Yup.object({
        street: Yup.string().required("La calle es obligatoria"),
        number: Yup.string().required("El número es obligatorio"),
        postal: Yup.string().required("El código postal es obligatorio"),
        city: Yup.string().required("La ciudad es obligatoria"),
        province: Yup.string().required("La provincia es obligatoria"),
      }),
      code: Yup.string().required("El código interno es obligatorio"),
    }),
    onSubmit,
  });

  return (
    <form onSubmit={formik.handleSubmit} className="p-6 bg-white rounded-lg shadow-md">
      <div>
        <label htmlFor="name" className="block text-gray-700">Nombre del Proyecto</label>
        <input
          type="text"
          name="name"
          id="name"
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="block w-full mb-4 border rounded-lg p-2 text-gray-700"
        />
        {formik.errors.name && formik.touched.name && <div className="text-red-500 text-sm">{formik.errors.name}</div>}
      </div>

      <div>
        <label htmlFor="projectCode" className="block text-gray-700">Código del Proyecto</label>
        <input
          type="text"
          name="projectCode"
          id="projectCode"
          value={formik.values.projectCode}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="block w-full mb-4 border rounded-lg p-2 text-gray-700"
        />
        {formik.errors.projectCode && formik.touched.projectCode && <div className="text-red-500 text-sm">{formik.errors.projectCode}</div>}
      </div>

      <div>
        <label htmlFor="email" className="block text-gray-700">Correo Electrónico</label>
        <input
          type="email"
          name="email"
          id="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="block w-full mb-4 border rounded-lg p-2 text-gray-700"
        />
        {formik.errors.email && formik.touched.email && <div className="text-red-500 text-sm">{formik.errors.email}</div>}
      </div>

      <div>
        <label htmlFor="clientId" className="block text-gray-700">Cliente Asociado</label>
        <select
          name="clientId"
          id="clientId"
          value={formik.values.clientId}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="block w-full mb-4 border rounded-lg p-2 text-gray-700"
        >
          <option value="">Selecciona un cliente</option>
          {clients.map((client) => (
            <option key={client._id} value={client._id}>
              {client.name} - {client.cif}
            </option>
          ))}
        </select>
        {formik.errors.clientId && formik.touched.clientId && <div className="text-red-500 text-sm">{formik.errors.clientId}</div>}
      </div>

      {/* Dirección */}
      <div>
        <label htmlFor="address.street" className="block text-gray-700">Calle</label>
        <input
          type="text"
          name="address.street"
          id="address.street"
          value={formik.values.address.street}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="block w-full mb-4 border rounded-lg p-2 text-gray-700"
        />
        {formik.errors.address?.street && formik.touched.address?.street && <div className="text-red-500 text-sm">{formik.errors.address?.street}</div>}
      </div>

      <div>
        <label htmlFor="address.number" className="block text-gray-700">Número</label>
        <input
          type="number"
          name="address.number"
          id="address.number"
          value={formik.values.address.number}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="block w-full mb-4 border rounded-lg p-2 text-gray-700"
        />
        {formik.errors.address?.number && formik.touched.address?.number && <div className="text-red-500 text-sm">{formik.errors.address?.number}</div>}
      </div>

      <div>
        <label htmlFor="address.postal" className="block text-gray-700">Código Postal</label>
        <input
          type="number"
          name="address.postal"
          id="address.postal"
          value={formik.values.address.postal}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="block w-full mb-4 border rounded-lg p-2 text-gray-700"
        />
        {formik.errors.address?.postal && formik.touched.address?.postal && <div className="text-red-500 text-sm">{formik.errors.address?.postal}</div>}
      </div>

      <div>
        <label htmlFor="address.city" className="block text-gray-700">Ciudad</label>
        <input
          type="text"
          name="address.city"
          id="address.city"
          value={formik.values.address.city}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="block w-full mb-4 border rounded-lg p-2 text-gray-700"
        />
        {formik.errors.address?.city && formik.touched.address?.city && <div className="text-red-500 text-sm">{formik.errors.address?.city}</div>}
      </div>

      <div>
        <label htmlFor="address.province" className="block text-gray-700">Provincia</label>
        <input
          type="text"
          name="address.province"
          id="address.province"
          value={formik.values.address.province}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="block w-full mb-4 border rounded-lg p-2 text-gray-700"
        />
        {formik.errors.address?.province && formik.touched.address?.province && <div className="text-red-500 text-sm">{formik.errors.address?.province}</div>}
      </div>

      <div>
        <label htmlFor="code" className="block text-gray-700">Código Interno</label>
        <input
          type="text"
          name="code"
          id="code"
          value={formik.values.code}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="block w-full mb-4 border rounded-lg p-2 text-gray-700"
        />
        {formik.errors.code && formik.touched.code && <div className="text-red-500 text-sm">{formik.errors.code}</div>}
      </div>

      <div className="flex justify-end space-x-4">
        <button
          type="button"
          onClick={onCancel}
          className="py-2 px-4 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition"
        >
          Cancelar
        </button>
        <button
          type="submit"
          className="py-2 px-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
        >
          Guardar
        </button>
      </div>
    </form>
  );
};

export default ProjectForm;
