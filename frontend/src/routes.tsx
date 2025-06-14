import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { About, Home, OrdersUser, } from "./pages";
import { MainLayout } from "./layouts/main-layout";
import { CheckoutPage } from "./pages/checkout";
import { AdminPage } from "./pages/admin";




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
        path: "/admin",
        element: <AdminPage />,
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
