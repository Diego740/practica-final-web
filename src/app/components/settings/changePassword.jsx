"use client"


import { useFormik } from "formik";
import * as Yup from "yup";

const ChangePassword = ({ handleChangePassword }) => {
  const passwordFormik = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      password: Yup.string()
        .min(6, "La contraseña debe tener al menos 6 caracteres")
        .required("La contraseña es obligatoria"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Las contraseñas no coinciden")
        .required("La confirmación de la contraseña es obligatoria"),
    }),
    onSubmit: handleChangePassword,
  });

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">Cambiar Contraseña</h2>
      <form onSubmit={passwordFormik.handleSubmit}>
        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-700">Nueva Contraseña</label>
          <input
            type="password"
            id="password"
            name="password"
            value={passwordFormik.values.password}
            onChange={passwordFormik.handleChange}
            className="w-full p-2 border border-gray-300 rounded-lg"
          />
          {passwordFormik.errors.password && passwordFormik.touched.password && (
            <div className="text-red-500 text-sm">{passwordFormik.errors.password}</div>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="confirmPassword" className="block text-gray-700">Confirma la Contraseña</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={passwordFormik.values.confirmPassword}
            onChange={passwordFormik.handleChange}
            className="w-full p-2 border border-gray-300 rounded-lg"
          />
          {passwordFormik.errors.confirmPassword && passwordFormik.touched.confirmPassword && (
            <div className="text-red-500 text-sm">{passwordFormik.errors.confirmPassword}</div>
          )}
        </div>
        <button
          type="submit"
          className="py-2 px-6 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Cambiar Contraseña
        </button>
      </form>
    </div>
  );
};

export default ChangePassword;
