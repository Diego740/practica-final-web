"use client";

import Link from 'next/link';
import { useFormik } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import "./Login.css";
import { setCookie } from '@/app/utils/cookiesUtils';


const Login = () => {
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("El correo electrónico no es válido")
        .required("El correo electrónico es obligatorio"),
      password: Yup.string()
        .min(6, "La contraseña debe tener al menos 6 caracteres")
        .required("La contraseña es obligatoria"),
    }),
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      try {
        const response = await fetch(
          "https://bildy-rpmaya.koyeb.app/api/user/login",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(values),
          }
        );

        if (response.ok) {
          const { token } = await response.json();
          localStorage.setItem("jwt", token); // Guardar el token en localStorage
          //document.cookie = `jwt=${token}; path=/; Secure; SameSite=Strict`;
          //setCookie("jwt", token);
          console.log(token);

          router.push("/components/dashboard"); // Redirigir al dashboard
          window.location.reload();
          router.push("/components/dashboard");


        } else if (response.status === 401) {
          setErrors({ apiError: "La contraseña no es correcta." });
        } else if (response.status === 404) {
          setErrors({ apiError: "El usuario no se ha encontrado." });
        } else {
          const error = await response.json();
          setErrors({ apiError: error.message || "Error al iniciar sesión" });
        }
      } catch (error) {
        console.error(error);
        setErrors({ apiError: "Error en la conexión con el servidor" });
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div className="login-container">
      <div className="login-card">
        <h3 className="login-title">Iniciar Sesión</h3>
        <form onSubmit={formik.handleSubmit}>

          {/* Campo de correo electrónico */}
          <div className="form-group">
            <label htmlFor="email" className="form-label">
              Correo Electrónico
            </label>
            <input
              type="email"
              name="email"
              id="email"
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
              onChange={formik.handleChange}
              value={formik.values.password}
              className="form-input"
            />
            {formik.touched.password && formik.errors.password && (
              <div className="form-error">{formik.errors.password}</div>
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
            {formik.isSubmitting ? "Cargando..." : "Iniciar Sesión"}
          </button>
        </form>
        <p className="register-text">¿No estás registrado?</p>
        <Link className="register-link" href="/register">Regístrate</Link>
      </div>
    </div>
  );
};

export default Login;
