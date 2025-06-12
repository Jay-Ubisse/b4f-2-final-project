import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { About, Home, Counter} from "./pages";


import { CartProvider } from "./contexts/cartContext";
import { MainLayout } from "./layouts/main-layout";


const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <CartProvider>
        <MainLayout />
      </CartProvider>
    ),
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "counter",
        element: <Counter />,
      },
    ],
  },
]);

export function Routes() {
  return <RouterProvider router={router} />;
}
