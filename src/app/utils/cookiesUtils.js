// Función para obtener una cookie por su nombre
export const getCookie = (name) => {
    if (typeof window !== "undefined") {
      // Obtener todas las cookies
      const cookies = document.cookie;
      const cookieArray = cookies.split("; ");
      
      // Buscar la cookie por su nombre
      for (let i = 0; i < cookieArray.length; i++) {
        const cookie = cookieArray[i].split("=");
        if (cookie[0] === name) {
          return cookie[1];
        }
      }
    }
    return null; // Si la cookie no existe
  };
  
  // Función para establecer una cookie
  export const setCookie = (name, value, days = 7) => {
    if (typeof window !== "undefined") {
      const date = new Date();
      date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000); // Expira en 'days' días
      const expires = `expires=${date.toUTCString()}`;
      // Establecer la cookie
      document.cookie = `${name}=${value}; ${expires}; path=/; Secure; HttpOnly; SameSite=Strict`;
    }
  };
  
  // Función para eliminar una cookie
  export const deleteCookie = (name) => {
    setCookie(name, "", -1); // Establecer una fecha de expiración pasada para eliminarla
  };
  