"use client"

import { useState, useEffect } from "react";
import withAuth from "../withAuth";
import ChangePassword from "./changePassword";
import ChangeAddress from "./changeAdress";

const Settings = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const getToken = () => {
    return localStorage.getItem("jwt");
  };

  const fetchUserInfo = async () => {
    try {
      const response = await fetch("https://bildy-rpmaya.koyeb.app/api/user", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`,
        },
      });

      if (response.ok) {
        console.log("TTODO correcto");
        
        const data = await response.json();
        setUserInfo(data);
        console.log(data);
      } else {
        setErrorMessage("Error al obtener la información del usuario.");
      }
    } catch (err) {
      setErrorMessage("Error en la conexión.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleChangePassword = async (values) => {
    try {
      const response = await fetch("https://bildy-rpmaya.koyeb.app/api/user/password", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}}`,
        },
        body: JSON.stringify({ password: values.password }),
      });

      if (response.ok) {
        setSuccessMessage("Contraseña cambiada correctamente.");
        setErrorMessage("");
      } else {
        const error = await response.json();
        setErrorMessage(error.message || "Error al cambiar la contraseña.");
      }
    } catch (err) {
      setErrorMessage("Error en la conexión.");
    }
  };

  const handleAddAddress = async (values) => {
    try {
      const response = await fetch("https://bildy-rpmaya.koyeb.app/api/user/address", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`,
        },
        body:  JSON.stringify(values),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setSuccessMessage("Dirección actualizada correctamente.");
        setErrorMessage("");
        fetchUserInfo(); 
      } else {
        const error = await response.json();
        setErrorMessage(error.message || "Error al actualizar la dirección.");
      }
    } catch (err) {
    console.error(err);
      setErrorMessage("Error en la conexión.");
    }
  };

  useEffect(() => {
    fetchUserInfo();
  }, []);

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100 rounded-xl text-gray-700">
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Perfil del Usuario</h1>

        {errorMessage && <div className="text-red-500 mb-4">{errorMessage}</div>}
        {successMessage && <div className="text-green-500 mb-4">{successMessage}</div>}

        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Información del Usuario</h2>
          <p><strong>Nombre:</strong> {userInfo.name}</p>
          <p><strong>Email:</strong> {userInfo.email}</p>
          <p><strong>Dirección:</strong> {userInfo.address ? `${userInfo.address.street}, ${userInfo.address.city}, ${userInfo.address.province}` : "No disponible"}</p>
        </div>

        <ChangePassword handleChangePassword={handleChangePassword} />
        <ChangeAddress handleAddAddress={handleAddAddress} /> 
      </div>
    </div>
  );
};

export default withAuth(Settings);
