import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { About, Home, AdminPage, OrdersUser, } from "./pages";
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
      {
        path: "/page",
        element: < AdminPage />,
      },
      {
        path: "/orders-user",
        element: < OrdersUser />,
      },
    ],
  },

]);

export function Routes() {
  return <RouterProvider router={router} />;
}
