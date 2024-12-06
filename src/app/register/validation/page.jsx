"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import * as Yup from "yup";
import "./validation.css";

const ValidationCode = ({ onSubmit }) => {
  const [email, setEmail] = useState("");

  const router = useRouter();

  useEffect(() => {
    const storedEmail = localStorage.getItem("emailForValidation");
    if (storedEmail) {
      setEmail(storedEmail); // Recupera el correo del localStorage
    } else {
      setEmail("Correo no encontrado");
      console.error("No se encontró el correo para validar.");
    }
  }, []);

  // Formik para manejar el formulario
  const formik = useFormik({
    initialValues: {
      code: ["", "", "", "", "", ""], // 6 campos para el código
    },
    validationSchema: Yup.object({
      code: Yup.array()
        .of(Yup.string().length(1, "Debe ser un solo dígito").required("Requerido"))
        .min(6, "Debe completar los 6 dígitos")
        .max(6, "Debe completar los 6 dígitos"),
    }),
    onSubmit: async (values) => {
      const completeCode = values.code.join(""); // Unir los 6 dígitos en un solo string
      try {
        const response = await fetch("https://bildy-rpmaya.koyeb.app/api/user/validation", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("jwt")}`, // Token desde localStorage
          },
          body: JSON.stringify({code: completeCode }), // Payload con email y código
        });

        if (response.ok) {
          const data = await response.json();
          alert("Código validado correctamente. ¡Bienvenido!");
          console.log("Validación exitosa:", data);
          router.push("/");

        } else {
          const error = await response.json();
          alert("Hubo un problema con la validación. Verifica tu código.");
          console.error("Error en validación:", error);
        }
      } catch (err) {
        alert("No se pudo conectar con el servidor. Inténtalo nuevamente.");
        console.error("Error al realizar la petición:", err);
      }
    }
  });

  return (
    <div className="validation-container">
      <h3 className="validation-title">Código de Validación</h3>
      <div className="validation-text">
        <p>Se ha enviado un código de validación al correo: {email}</p>
        <p>Revise el correo e ingréselo a continuación</p>
      </div>

      <form onSubmit={formik.handleSubmit} className="validation-form">
        <div className="digit-group">
          {formik.values.code.map((digit, index) => (
            <input
              key={index}
              id={`digit-${index}`}
              type="text"
              inputMode="numeric"
              maxLength="1"
              value={formik.values.code[index]}
              onChange={(e) => {
                const newCode = [...formik.values.code];
                newCode[index] = e.target.value.slice(-1); // Asegura un solo carácter
                formik.setFieldValue("code", newCode);

                // Mover el foco al siguiente campo
                if (e.target.value && index < 5) {
                  document.getElementById(`digit-${index + 1}`).focus();
                }
              }}
              onKeyDown={(e) => {
                // Mover el foco al anterior campo al borrar
                if (e.key === "Backspace" && !formik.values.code[index] && index > 0) {
                  document.getElementById(`digit-${index - 1}`).focus();
                }
              }}
              className={`digit-input ${formik.errors.code && formik.touched.code ? "error" : ""}`}
            />
          ))}
        </div>
        {formik.errors.code && (
          <div className="form-error">Debe completar correctamente los 6 dígitos.</div>
        )}
        <button type="submit" className="validation-button">
          Validar
        </button>
      </form>
    </div>
  );
};

export default ValidationCode;
