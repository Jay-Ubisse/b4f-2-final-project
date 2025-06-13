import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Home } from "./pages";
import { AdminPage } from "./pages";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/page",
    element: < AdminPage/>,
  },
]);

export function Routes() {
  return <RouterProvider router={router} />;
}
