import { createContext } from "react";

const AuthContext = createContext({
  user: {},
  logout: () => {},
  login: (user) => {},
  changeFavorites: (productId) => {},
});

export default AuthContext;
