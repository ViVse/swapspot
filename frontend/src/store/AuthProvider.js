import { useEffect, useState } from "react";
import AuthContext from "./auth-context";
import { deleteCookie, getCookie } from "../utils/cookie";
import axios from "../config/axios";

const AuthProvider = (props) => {
  const [user, setUser] = useState();

  useEffect(() => {
    const authToken = getCookie("x-auth-token");
    if (!authToken) return;

    axios
      .get("/api/users/me")
      .then((res) => setUser(res.data.me))
      .catch((err) => console.log(err));
  }, []);

  const logout = () => {
    setUser(null);
    deleteCookie("x-auth-token");
  };

  const login = (user) => {
    setUser(user);
  };

  const context = {
    user,
    logout,
    login,
  };

  return (
    <AuthContext.Provider value={context}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
