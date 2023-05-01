import Header from "./components/Layout/Header";
import Footer from "./components/Layout/Footer";
import { RouterProvider } from "react-router-dom";
import loggedRouter from "./router/logged-router";
import guestRouter from "./router/guest-router";

function App() {
  const loggedin = false;

  return (
    <>
      <Header />
      <RouterProvider router={loggedin ? loggedRouter : guestRouter} />
      <Footer />
    </>
  );
}

export default App;
