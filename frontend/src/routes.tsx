import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { About, Home, Products,ErrorPage,Details} from "./pages";
import { MainLayout } from "./layouts/main-layout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
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
        path: "/products",
        element: <Products />,
      },
      {
        path:"/details",
        element: <Details />,
      },
    
       
    ],
  },
]);

export function Routes() {
  return <RouterProvider router={router} />;
}
