import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import { router } from "./routes/products.route.ts";

const app = express();
dotenv.config();
app.use(express.json());
app.use(cors());

const host = process.env.HOST || "http://localhost";
const port = process.env.PORT || 4000;

app.use("/products", router);
//app.use("/category", router)
//app.use("/search", router)

mongoose
  .connect(process.env.BD_URI as string)
  .then(() => console.log("BD conectado com sucesso!"))
  .catch((error) =>
    console.log("Ocorreu um erro ao conectar com a DB: ", error)
  );

app.listen(port, () => console.log(`Server running on ${host}:${port}`));
