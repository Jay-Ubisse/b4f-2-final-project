import cors from "cors";

import orderRoute from "./routes/orders.route.ts";
import { productRoute } from "./routes/product.route.ts";
import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { router } from "./routes/user.route.ts";
import { authRouter } from "./routes/auth.route.ts";
import { Getrouter } from "./routes/get-all-products.route.ts";
import categoryRoute from "./routes/category.route.ts";

const app = express();
app.use(express.json());
app.use(cors());
dotenv.config();

const host = process.env.HOST || "http://localhost";
const port = process.env.PORT || 3000;

app.use("/orders", orderRoute);
app.use("/products", productRoute);
app.use("/product", Getrouter); 
app.use("/categories", categoryRoute);
app.use("/auth", authRouter);
app.use("/users", router);




mongoose
  .connect(process.env.BD_URI as string)
  .then(() => console.log("BD conectado com sucesso!"))
  .catch((error) =>
    console.log("Ocorreu um erro ao contectar com a DB: ", error)
  );

app.listen(port, () => console.log(`Server running on ${host}:${port}`));