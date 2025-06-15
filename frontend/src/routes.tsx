import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { About, Home, OrdersUser, CheckoutPage, AdminPage, ErrorPage, Products, Details, ContactPage } from "./pages";
import { MainLayout } from "./layouts/main-layout";




const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />
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
        path: "/admin",
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