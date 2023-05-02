import { RouterProvider } from "react-router-dom";
import loggedRouter from "./router/logged-router";
import guestRouter from "./router/guest-router";
import { useContext } from "react";
import AuthContext from "./store/auth-context";

function App() {
  const { user } = useContext(AuthContext);

  return (
    <>
      {user && <RouterProvider router={loggedRouter} />}
      {!user && <RouterProvider router={guestRouter} />}
    </>
  );
}

export default App;
