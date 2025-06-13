import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { About, Home, Login, Register , Account} from "./pages";
import { MainLayout } from "./layouts/main-layout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/login",
        element: <Login />,
      },
       {
        path: "/register",
        element: <Register />,
      },
       {
        path: "/account",
        element: <Account />,
      },
    ],
  },
]);

export function Routes() {
  return <RouterProvider router={router} />;
}
