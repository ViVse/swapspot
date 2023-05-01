import { createContext } from "react";

const AuthContext = createContext({
  user: {},
  logout: () => {},
  login: () => {},
});

export default AuthContext;
