import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import { router } from './routes/user.route.ts'

const app = express()
dotenv.config()
app.use(express.json())

const host = process.env.HOST || 'http://localhost'
const port = process.env.PORT || 3000

app.use('/users', router)



mongoose.connect(process.env.BD_URI as string)
  .then(() => console.log('BD conectado com sucesso!'))
  .catch((error) =>
    console.log('Ocorreu um erro ao contectar com a DB: ', error)
  )

app.listen(port, () => console.log(`Server running on ${host}:${port}`))
