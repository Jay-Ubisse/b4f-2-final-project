import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Home } from "./pages/home";
import { CartProvider } from "./contexts/cartContext";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <CartProvider>
        <Home />
      </CartProvider>
    ),
  },
]);

export function Routes() {
  return <RouterProvider router={router} />;
}
