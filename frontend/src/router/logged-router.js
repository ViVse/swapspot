import { Navigate, createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home/Home";
import MyProducts from "../pages/MyProducts/MyProducts";
import Layout from "../components/Layout/Layout";

const loggedRouter = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/my-products",
        element: <MyProducts />,
      },
      {
        path: "/",
        element: <Home />,
      },
      { path: "/login", element: <Navigate to="/" replace={true} /> },
    ],
  },
]);

export default loggedRouter;
