import { createBrowserRouter } from "react-router-dom";

import Home from "../pages/Home/Home";

const loggedRouter = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
]);

export default loggedRouter;
