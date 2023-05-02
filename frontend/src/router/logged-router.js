import { createBrowserRouter, redirect } from "react-router-dom";
import Home from "../pages/Home/Home";
import MyProducts from "../pages/MyProducts/MyProducts";
import Layout from "../components/Layout/Layout";
import Favorite from "../pages/Favorite/Favorite";

const loggedRouter = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/favorite",
        element: <Favorite />,
      },
      {
        path: "/my-products",
        element: <MyProducts />,
      },
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "*",
        loader: function () {
          redirect("/");
          return null;
        },
      },
    ],
  },
]);

export default loggedRouter;
