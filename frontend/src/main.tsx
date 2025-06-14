import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { Routes } from "./routes.tsx";
import { CartProvider } from "./provider/cartprovider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <CartProvider>
      <Routes />
    </CartProvider>
  </StrictMode>
);