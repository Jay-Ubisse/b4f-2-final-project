import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import categoryRoute from "./routes/category.route.ts";
import { productRoute } from "./routes/product.route.ts";

const app = express();
dotenv.config();
app.use(express.json());
app.use(cors());

const host = process.env.HOST || "http://localhost";
const port = process.env.PORT || 3000;

app.use("/categories", categoryRoute);
app.use("/product", productRoute);

const uri = process.env.BD_URI as string;

if (!uri) {
  throw new Error("BD_URI not set in .env");
}
mongoose.connect(uri)
  .then(() => console.log("Conectado ao MongoDB"))
  .catch((err) => console.error("Erro ao conectar ao MongoDB:", err));

app.listen(port, () => console.log(`Server running on ${host}:${port}`));
