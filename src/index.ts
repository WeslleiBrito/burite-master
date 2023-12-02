import express from 'express'
import cors from 'cors'
import dontenv from 'dotenv'
import { invoicingRouter } from './router/invoicingRouter'
dontenv.config()

const app = express()
app.use(cors())
app.use(express.json())

app.listen(Number(process.env.PORT || 3003), () => {
    console.log(`Servidor rodando na porta ${process.env.PORT}`)
})

app.use('/invoicing', invoicingRouter)