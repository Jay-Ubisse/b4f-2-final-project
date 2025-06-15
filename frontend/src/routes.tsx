import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { About, Home, OrdersUser, CheckoutPage, AdminPage, ErrorPage, Products,Login, Register , Account } from "./pages";
import { MainLayout } from "./layouts/main-layout";
import {Details} from "./pages/details"
import {ContactPage} from "./pages/contact"




const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Home />,
        errorElement: <ErrorPage />,
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
       {

        path: "/checkout",
        element: <CheckoutPage />,
      },
      {
        path: "/products",
        element: <Products />,
      },
      {
        path: "/details/:id",
        element: <Details />,
      },
      {
        path: "/account/orders",
        element: <OrdersUser />,
      },
      {
        path: "/account/admin",
        element: <AdminPage />,
      },
      {
        path: "/products",
        element: <Products />,
      },
      {
        path: "/contacts",
        element: <ContactPage />,
      },
    ]


  }


]);

export function Routes() {
  return <RouterProvider router={router} />;
}