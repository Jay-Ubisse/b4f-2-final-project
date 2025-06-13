import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { About, Home } from "./pages";
import { MainLayout } from "./layouts/main-layout";
import { CheckoutPage } from "./pages/checkout";
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
        path: "/checkout",
        element: <CheckoutPage />,
      },
    ],
  },
]);

export function Routes() {
  return <RouterProvider router={router} />;
}
