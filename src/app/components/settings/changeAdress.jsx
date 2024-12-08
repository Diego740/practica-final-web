"use client";

import { useFormik } from "formik";
import * as Yup from "yup";

const ChangeAddress = ({ handleAddAddress }) => {
  const addressFormik = useFormik({
    initialValues: {
      street: "",
      number: "",
      postal: "",
      city: "",
      province: "",
    },
    validationSchema: Yup.object({
      street: Yup.string().required("La calle es obligatoria"),
      number: Yup.number().required("El número es obligatorio"),
      postal: Yup.number().required("El código postal es obligatorio"),
      city: Yup.string().required("La ciudad es obligatoria"),
      province: Yup.string().required("La provincia es obligatoria"),
    }),
    onSubmit: (values) => {
      // Construir el objeto `address` esperado por la API
      const payload = {
        address: {
          street: values.street,
          number: values.number,
          postal: values.postal,
          city: values.city,
          province: values.province,
        },
      };
      handleAddAddress(payload);
    },
  });

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">Actualizar Dirección</h2>
      <form onSubmit={addressFormik.handleSubmit}>
        <div className="mb-4">
          <label htmlFor="street" className="block text-gray-700">Calle</label>
          <input
            type="text"
            id="street"
            name="street"
            value={addressFormik.values.street}
            onChange={addressFormik.handleChange}
            className="w-full p-2 border border-gray-300 rounded-lg"
          />
          {addressFormik.errors.street && addressFormik.touched.street && (
            <div className="text-red-500 text-sm">{addressFormik.errors.street}</div>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="number" className="block text-gray-700">Número</label>
          <input
            type="number"
            id="number"
            name="number"
            value={addressFormik.values.number}
            onChange={addressFormik.handleChange}
            className="w-full p-2 border border-gray-300 rounded-lg"
          />
          {addressFormik.errors.number && addressFormik.touched.number && (
            <div className="text-red-500 text-sm">{addressFormik.errors.number}</div>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="postal" className="block text-gray-700">Código Postal</label>
          <input
            type="number"
            id="postal"
            name="postal"
            value={addressFormik.values.postal}
            onChange={addressFormik.handleChange}
            className="w-full p-2 border border-gray-300 rounded-lg"
          />
          {addressFormik.errors.postal && addressFormik.touched.postal && (
            <div className="text-red-500 text-sm">{addressFormik.errors.postal}</div>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="city" className="block text-gray-700">Ciudad</label>
          <input
            type="text"
            id="city"
            name="city"
            value={addressFormik.values.city}
            onChange={addressFormik.handleChange}
            className="w-full p-2 border border-gray-300 rounded-lg"
          />
          {addressFormik.errors.city && addressFormik.touched.city && (
            <div className="text-red-500 text-sm">{addressFormik.errors.city}</div>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="province" className="block text-gray-700">Provincia</label>
          <input
            type="text"
            id="province"
            name="province"
            value={addressFormik.values.province}
            onChange={addressFormik.handleChange}
            className="w-full p-2 border border-gray-300 rounded-lg"
          />
          {addressFormik.errors.province && addressFormik.touched.province && (
            <div className="text-red-500 text-sm">{addressFormik.errors.province}</div>
          )}
        </div>

        <button
          type="submit"
          className="py-2 px-6 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
        >
          Actualizar Dirección
        </button>
      </form>
    </div>
  );
};

export default ChangeAddress;
