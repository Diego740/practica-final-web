"use client";

import { useFormik } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import "./register.css"

const Register = () => {
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .min(3, "El nombre debe tener al menos 3 caracteres")
        .required("El nombre es obligatorio"),
      email: Yup.string()
        .email("El correo electrónico no es válido")
        .required("El correo electrónico es obligatorio"),
      password: Yup.string()
        .min(6, "La contraseña debe tener al menos 6 caracteres")
        .required("La contraseña es obligatoria"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Las contraseñas no coinciden")
        .required("La confirmación de la contraseña es obligatoria"),
    }),
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      try {
        const response = await fetch(
          "https://bildy-rpmaya.koyeb.app/api/user/register",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name: values.name,
              email: values.email,
              password: values.password,
            }),
          }
        );

        if (response.ok) {
          router.push("/"); //Redirigir al login después del registro
        } else {
          const error = await response.json();
          setErrors({ apiError: error.message || "Error al registrar usuario" });
        }
      } catch (error) {
        setErrors({ apiError: "Error en la conexión con el servidor" });
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div className="register-container">
      <div className="register-card">
        <h3 className="register-title">Registro</h3>
        <form onSubmit={formik.handleSubmit}>
          {/* Campo de nombre */}
          <div className="form-group">
            <label htmlFor="name" className="form-label">
              Nombre
            </label>
            <input
              type="text"
              name="name"
              id="name"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.name}
              className="form-input"
            />
            {formik.touched.name && formik.errors.name && (
              <div className="form-error">{formik.errors.name}</div>
            )}
          </div>

          {/* Campo de correo electrónico */}
          <div className="form-group">
            <label htmlFor="email" className="form-label">
              Correo Electrónico
            </label>
            <input
              type="email"
              name="email"
              id="email"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.email}
              className="form-input"
            />
            {formik.touched.email && formik.errors.email && (
              <div className="form-error">{formik.errors.email}</div>
            )}
          </div>

          {/* Campo de contraseña */}
          <div className="form-group">
            <label htmlFor="password" className="form-label">
              Contraseña
            </label>
            <input
              type="password"
              name="password"
              id="password"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.password}
              className="form-input"
            />
            {formik.touched.password && formik.errors.password && (
              <div className="form-error">{formik.errors.password}</div>
            )}
          </div>

          {/* Confirmar contraseña */}
          <div className="form-group">
            <label htmlFor="confirmPassword" className="form-label">
              Confirmar Contraseña
            </label>
            <input
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.confirmPassword}
              className="form-input"
            />
            {formik.touched.confirmPassword && formik.errors.confirmPassword && (
              <div className="form-error">
                {formik.errors.confirmPassword}
              </div>
            )}
          </div>

          {/* Mensaje de error de la API */}
          {formik.errors.apiError && (
            <div className="form-error">{formik.errors.apiError}</div>
          )}

          {/* Botón de envío */}
          <button
            type="submit"
            className="form-button"
            disabled={formik.isSubmitting}
          >
            {formik.isSubmitting ? "Cargando..." : "Registrarse"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
