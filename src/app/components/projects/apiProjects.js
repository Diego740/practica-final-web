const API_URL = "https://bildy-rpmaya.koyeb.app/api/project";

const getToken = () => {
  return localStorage.getItem("jwt");
};

export const fetchProjects = async () => {
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
      console.log(data);
      return data;
    } else {
      throw new Error("Error al obtener proyectos");
    }
  } catch (err) {
    console.error("Error en la conexión", err);
    throw err;
  }
};

export const addProject = async (values) => {
    const token = getToken();
  
    try {
      console.log(values);
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: values.name,
          projectCode: values.projectCode,
          email: values.email,
          address: {
            street: values.address.street,
            number: parseInt(values.address.number, 10), // Convertir a número
            postal: parseInt(values.address.postal, 10), // Convertir a número
            city: values.address.city,
            province: values.address.province,
          },
          code: values.code,
          clientId: values.clientId,
        }),
      });
  
      if (response.ok) {
        const data = await response.json();
        //console.log(data);
        return data;
      } else {
        const error = await response.json();
        throw new Error("Hubo un error al agregar el proyecto: " + error.message);
      }
    } catch (err) {
      console.error("Error en la conexión", err);
      throw err;
    }
  };
  


export const editProject = async (values) => {
  const token = localStorage.getItem("jwt");

  try {
    const response = await fetch(`${API_URL}/${values._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: values.name,
        projectCode: values.projectCode,
        email: values.email,
        address: {
          street: values.address.street,
          number: values.address.number,
          postal: values.address.postal,
          city: values.address.city,
          province: values.address.province,
        },
        code: values.code,
        clientId: values.clientId,
      }),
    });

    if (response.ok) {
      const data = await response.json();
      console.log("Proyecto actualizado:", data);
      return data;
    } else {
      const error = await response.json();
      throw new Error("Hubo un error al actualizar el proyecto: " + error.message);
    }
  } catch (err) {
    console.error("Error al actualizar proyecto:", err);
    throw err;
  }
};

export const deleteProject = async (projectId) => {
  const token = getToken();

  try {
    const response = await fetch(`${API_URL}/${projectId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.ok) {
      return { success: true };
    } else {
      throw new Error("Error al eliminar proyecto");
    }
  } catch (err) {
    console.error("Error al eliminar proyecto:", err);
    throw err;
  }
};
