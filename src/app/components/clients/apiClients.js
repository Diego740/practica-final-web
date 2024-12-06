const API_URL = "https://bildy-rpmaya.koyeb.app/api/client";

const getToken = () => {
  return localStorage.getItem("jwt");
};

export const fetchClients = async () => {
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
      const data = await response.json();
      return data;
    } else {
      throw new Error("Error al obtener clientes");
    }
  } catch (err) {
    console.error("Error en la conexión", err);
    throw err;
  }
};

export const addClient = async (values) => {
  const token = getToken();

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: values.name,
        cif: values.cif,
        address: {
          street: values.street,
          number: values.number,
          postal: values.postal,
          city: values.city,
          province: values.province,
        },
      }),
    });

    if (response.ok) {
      return { success: true };
    } else {
      const error = await response.json();
      throw new Error("Hubo un error al agregar el cliente: ", error.message);
    }
  } catch (err) {
    console.error("Error en la conexión", err);
    throw err;
  }
};

export const editClient = async (values) => {
  const token = getToken();

  try {
    const response = await fetch(`${API_URL}/${values._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: values.name,
        cif: values.cif,
        address: {
          street: values.street,
          number: values.number,
          postal: values.postal,
          city: values.city,
          province: values.province,
        },
      }),
    });

    if (response.ok) {
      return { success: true };
    } else {
      const error = await response.json();
      throw new Error("Hubo un error al actualizar el cliente: ", error.message);
    }
  } catch (err) {
    console.error("Error al actualizar cliente", err);
    throw err;
  }
};

export const deleteClient = async (clientId) => {
  const token = getToken();

  try {
    const response = await fetch(`${API_URL}/${clientId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.ok) {
      return { success: true };
    } else {
      throw new Error("Error al eliminar cliente");
    }
  } catch (err) {
    console.error("Error al eliminar cliente:", err);
    throw err;
  }
};
