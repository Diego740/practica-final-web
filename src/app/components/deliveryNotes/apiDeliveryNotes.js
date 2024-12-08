// utils/apiDeliveryNotes.js

const API_URL = "https://bildy-rpmaya.koyeb.app/api/deliverynote";

// Helper to get JWT token
const getToken = () => {
  return localStorage.getItem("jwt");
};

// Fetch all delivery notes
export const fetchDeliveryNotes = async () => {
  const token = getToken();
  try {
    const response = await fetch(API_URL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.ok) {
      return await response.json();
    } else {
      throw new Error("Error al obtener los albaranes");
    }
  } catch (err) {
    console.error("Error en la conexión", err);
    throw err;
  }
};

// Add a new delivery note
export const addDeliveryNote = async (values) => {
  const token = getToken();
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(values),
    });
    if (response.ok) {
      return await response.json();
    } else {
      throw new Error("Error al agregar el albarán");
    }
  } catch (err) {
    console.error("Error en la conexión", err);
    throw err;
  }
};

// Delete a delivery note
export const deleteDeliveryNote = async (id) => {
  const token = getToken();
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.ok) {
      return { success: true };
    } else {
      throw new Error("Error al eliminar el albarán");
    }
  } catch (err) {
    console.error("Error en la conexión", err);
    throw err;
  }
};

// Download delivery note PDF
export const downloadPDF = async (id) => {
  const token = getToken();
  try {
    const response = await fetch(`${API_URL}/pdf/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.ok) {
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `albaran-${id}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
    } else {
      throw new Error("Error al descargar el PDF");
    }
  } catch (err) {
    console.error("Error en la conexión", err);
    throw err;
  }
};
