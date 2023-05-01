import { RouterProvider } from "react-router-dom";
import loggedRouter from "./router/logged-router";
import guestRouter from "./router/guest-router";
import { useContext } from "react";
import AuthContext from "./store/auth-context";

function App() {
  const { user } = useContext(AuthContext);

  return (
    <>
      <RouterProvider router={user ? loggedRouter : guestRouter} />
    </>
  );
}

export default App;
