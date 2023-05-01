import { createBrowserRouter } from "react-router-dom";

import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Layout from "../components/Layout/Layout";

const guestRouter = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: "/login", element: <Login /> },
      {
        path: "/",
        element: <Home />,
      },
      { path: "/login", element: <Login /> },
    ],
  },
]);

export default guestRouter;
