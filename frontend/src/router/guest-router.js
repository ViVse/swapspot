import { redirect, createBrowserRouter } from "react-router-dom";

import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Layout from "../components/Layout/Layout";
import Search from "../pages/Search/Search";
import SignUp from "../pages/SignUp/SignUp";

const guestRouter = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/search",
        element: <Search />,
      },
      {
        path: "/",
        element: <Home />,
      },
      { path: "/login", element: <Login /> },
      { path: "/signup", element: <SignUp /> },
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
