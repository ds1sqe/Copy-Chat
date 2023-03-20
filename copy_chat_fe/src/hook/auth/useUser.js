import { useState } from "react";

export default function useUser() {
  const getUser = () => {
    const user = JSON.parse(sessionStorage.getItem("user"));
    console.log("useUser>getUser:user", user);
    return user;
  };

  const [user, setUser] = useState(getUser());

  const saveUser = (user) => {
    sessionStorage.setItem("user", JSON.stringify(user));
    console.log("useUser>saveUser:user", user);
    setUser(user);
  };

  return {
    setUser: saveUser,
    user: user,
  };
}
