import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import { productRoute } from "./routes/product.route.ts";
import { deletedProduct } from "./routes/product.route.ts";
import { getProductIdRoute } from "./routes/product.route.ts";
dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());
app.post("/", productRoute);
app.delete("/:id", deletedProduct);
app.get("/:id", productRoute);

const host = process.env.HOST || "http://localhost";
const port = process.env.PORT || 3000;

mongoose
  .connect(process.env.BD_URI as string)
  .then(() => console.log("BD conectado com sucesso!"))
  .catch((error) =>
    console.log("Ocorreu um erro ao contectar com a DB: ", error)
  );

app.listen(port, () => console.log(`Server running on ${host}:${port}`));
