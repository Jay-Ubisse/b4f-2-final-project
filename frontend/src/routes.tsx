import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Home } from "./pages";
import { AdminPage } from "./pages";
import { OrdersUser } from "./pages/orders-user";
  


const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/page",
    element: < AdminPage/>,
  },
  {
    path: "/orders-user",
    element: < OrdersUser/>,
  },
]);

export function Routes() {
  return <RouterProvider router={router} />;
}
