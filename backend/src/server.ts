import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import userschema, { User } from "./models/user.model.ts"


const app = express();
dotenv.config();
app.use(express.json());
app.use(cors());



const host = process.env.HOST || "http://localhost";
const port = process.env.PORT || 3000;

app.use(express.json());


mongoose
  .connect(process.env.BD_URI as string)
  .then(() => console.log("BD conectado com sucesso!"))
  .catch((error) =>
    console.log("Ocorreu um erro ao contectar com a DB: ", error)
  );

app.post("/user", async (req, res) => {
  try{
    const newUser = await User.create(req, body);
    res.json(newUser);
    } catch (error) {
      res.json({ error: error})

  }
});
app.listen(port, () => console.log(`Server running on ${host}:${port}`));
