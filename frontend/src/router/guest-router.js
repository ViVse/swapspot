import { redirect, createBrowserRouter } from "react-router-dom";

import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Layout from "../components/Layout/Layout";

const guestRouter = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      { path: "/login", element: <Login /> },
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

export default guestRouter;
