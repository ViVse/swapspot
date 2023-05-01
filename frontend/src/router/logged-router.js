import { Navigate, createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home/Home";

const loggedRouter = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  { path: "/login", element: <Navigate to="/" replace={true} /> },
]);

export default loggedRouter;
