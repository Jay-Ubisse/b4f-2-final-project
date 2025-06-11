import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Home } from "./pages";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
]);

export function Routes() {
  return <RouterProvider router={router} />;
}
