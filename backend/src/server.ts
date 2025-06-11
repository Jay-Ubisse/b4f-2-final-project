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
dotenv.config();
app.use(express.json());
app.use(cors());

const host = process.env.HOST || "http://localhost";
const port = process.env.PORT || 4000;


app.use("/api/products", router);


app.use("/categories", categoryRoute);
app.use("/product", productRoute);

const uri = process.env.BD_URI as string;

if (!uri) {
  throw new Error("BD_URI not set in .env");
}
mongoose.connect(uri)
  .then(() => console.log("Conectado ao MongoDB"))
  .catch((err) => console.error("Erro ao conectar ao MongoDB:", err));


app.use('/auth', authRouter)
app.use('/users', router)



mongoose.connect(process.env.BD_URI as string)
  .then(() => console.log('BD conectado com sucesso!'))
  .catch((error) =>
    console.log('Ocorreu um erro ao contectar com a DB: ', error)
  );

app.listen(port, () => console.log(`Server running on ${host}:${port}`))


