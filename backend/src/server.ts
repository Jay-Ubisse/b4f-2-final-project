import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import categoryRoute from "./routes/category.route.ts";

const app = express();
dotenv.config();
app.use(express.json());
app.use(cors());
// Removed invalid categoryRoutes usage

const host = process.env.HOST || "http://localhost";
const port = process.env.PORT || 3000;

app.use("/categories", categoryRoute);
const uri = process.env.MONGODB_URI as string;
mongoose.connect(uri)
  .then(() => console.log("Conectado ao MongoDB"))
  .catch((err) => console.error("Erro ao conectar ao MongoDB:", err));

app.listen(port, () => console.log(`Server running on ${host}:${port}`));
