
import cors from "cors";
import { productRoute } from "./routes/product.route.ts";
import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import { router } from './routes/user.route.ts'
import { authRouter } from './routes/auth-route.ts'


const app = express()
dotenv.config()
app.use(express.json())

const host = process.env.HOST || 'http://localhost'
const port = process.env.PORT || 3000

import categoryRoute from "./routes/category.route.ts";
import { productRoute } from "./routes/product.route.ts";

import { router } from "./routes/products.route.ts";



const app = express();
app.use(express.json());
app.use(cors());


const host = process.env.HOST || "http://localhost";
const port = process.env.PORT || 3000;

app.use("/products", productRoute);
app.use("/api/products", router);
app.use("/categories", categoryRoute);
app.use("/product", productRoute);
app.use('/auth', authRouter)
app.use('/users', router)

mongoose.connect(process.env.BD_URI as string)
  .then(() => console.log('BD conectado com sucesso!'))
  .catch((error) =>
    console.log('Ocorreu um erro ao contectar com a DB: ', error)
  );

app.listen(port, () => console.log(`Server running on ${host}:${port}`))


