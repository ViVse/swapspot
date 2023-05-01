import { createBrowserRouter } from "react-router-dom";

import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import { loadAllProducts } from "../loaders/productLoader";

const guestRouter = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/",
    element: <Home />,
    loader: loadAllProducts,
  },
]);

export default guestRouter;
