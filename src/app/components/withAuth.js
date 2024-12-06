"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getCookie } from "../utils/cookiesUtils";

const withAuth = (WrappedComponent) => {
  const AuthenticatedComponent = (props) => {
    const router = useRouter();

    useEffect(() => {
      const token = localStorage.getItem("jwt");
      //const token = getCookie("jwt");

      if (!token) {
        // Si no hay token, redirige al login
        router.push("/components/login");
      }
    }, [router]);

    // Si no hay redirección, renderiza el componente envuelto
    return <WrappedComponent {...props} />;
  };

  return AuthenticatedComponent;
};

export default withAuth;
