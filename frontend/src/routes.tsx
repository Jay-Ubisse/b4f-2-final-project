import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { About, Home, Details, ErrorPage, ContactPage } from "./pages";

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
        path: "/details",
        element: <Details />,
      },
      {
        path: "/contact",
        element: <ContactPage />,
      },
    ],
  },
]);

export function Routes() {
  return <RouterProvider router={router} />;
}
