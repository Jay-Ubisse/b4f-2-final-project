import cors from "cors";

import orderRoute from "./routes/orders.route.ts";
import { productRoute } from "./routes/product.route.ts";
import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { router } from "./routes/user.route.ts";
import { authRouter } from "./routes/auth.route.ts";
import categoryRoute from "./routes/category.route.ts";


const app = express();
app.use(express.json());
app.use(cors({origin: "http://localhost:4000"}));
dotenv.config();

const host = process.env.HOST || "http://localhost";
const port = process.env.PORT || 3000;

app.use("/orders", orderRoute);
app.use("/products", productRoute);
<<<<<<< HEAD
=======
app.use("/api/products", router);
//app.use("/categories", categoryRoute);
app.use("/auth", authRouter);
app.use("/users", router);
>>>>>>> feature/frontend-catalog
app.use("/categories", categoryRoute);
app.use("/login", authRouter);
app.use("/register", router);
app.use("/me",router)
<<<<<<< HEAD
=======

>>>>>>> feature/frontend-catalog

mongoose
  .connect(process.env.BD_URI as string)
  .then(() => console.log("BD conectado com sucesso!"))
  .catch((error) =>
    console.log("Ocorreu um erro ao contectar com a DB: ", error)
  );

app.listen(port, () => console.log(`Server running on ${host}:${port}`));