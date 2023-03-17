import { useState } from "react";

export default function useAuth() {
  const getAuth = () => {
    const auth = JSON.parse(sessionStorage.getItem("auth"));
    return auth;
  };

  const [auth, setAuth] = useState(getAuth());

  const saveAuth = (userAuth) => {
    sessionStorage.setItem("auth", JSON.stringify(userAuth));
    setAuth(userAuth);
  };

  return {
    setAuth: saveAuth,
    auth,
  };
}
