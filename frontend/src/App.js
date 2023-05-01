import Header from "./components/Layout/Header";
import Footer from "./components/Layout/Footer";
import { RouterProvider } from "react-router-dom";
import loggedRouter from "./router/logged-router";
import guestRouter from "./router/guest-router";
import { useContext } from "react";
import AuthContext from "./store/auth-context";

function App() {
  const { user } = useContext(AuthContext);

  return (
    <>
      <Header />
      <RouterProvider router={user ? loggedRouter : guestRouter} />
      <Footer />
    </>
  );
}

export default App;
