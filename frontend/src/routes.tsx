import { createBrowserRouter, RouterProvider } from "react-router-dom";
<<<<<<< HEAD
import { Home } from "./pages/home";
import { CartProvider } from "./contexts/cartContext";
=======
import { About, Home } from "./pages";
import { MainLayout } from "./layouts/main-layout";
>>>>>>> a03d2c6d6a500d7a2d7c5a2b914ad9f99f6ca1da

const router = createBrowserRouter([
  {
    path: "/",
<<<<<<< HEAD
    element: (
      <CartProvider>
        <Home />
      </CartProvider>
    ),
=======
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
    ],
>>>>>>> a03d2c6d6a500d7a2d7c5a2b914ad9f99f6ca1da
  },
]);

export function Routes() {
  return <RouterProvider router={router} />;
}
