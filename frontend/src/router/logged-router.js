import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home/Home";
import { loadAllProducts } from "../loaders/productLoader";

const loggedRouter = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    loader: loadAllProducts,
  },
]);

export default loggedRouter;
