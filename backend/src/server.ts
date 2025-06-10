import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import { productRoute, updatedProduct } from "./routes/product.route.ts";
import { deletedProduct } from "./routes/product.route.ts";
import { getProductIdRoute } from "./routes/product.route.ts";


const app = express();
dotenv.config();
app.use(express.json());
app.use(cors());
app.post("/products", productRoute);
app.delete("/products/:id", deletedProduct);
app.get("/products/:id", productRoute);
app.put("/products/:id", updatedProduct);

const host = process.env.HOST || "http://localhost";
const port = process.env.PORT || 3000;

mongoose
  .connect(process.env.BD_URI as string)
  .then(() => console.log("BD conectado com sucesso!"))
  .catch((error) =>
    console.log("Ocorreu um erro ao contectar com a DB: ", error)
  );

app.listen(port, () => console.log(`Server running on ${host}:${port}`));
