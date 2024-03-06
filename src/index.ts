import express from 'express'
import cors from 'cors'
import dontenv from 'dotenv'
import { invoicingRouter } from './router/invoicingRouter'
import { expensesRouter } from './router/expensesRouter'
import { updateTotalValuesRouter } from './router/updateTotalValuesRouter'
import { subgroupResumeRouter } from './router/subgroupResumeRouter'
import { priceFormationRouter } from './router/priceFormationRouter'
dontenv.config()

const app = express()
app.use(cors())
app.use(express.json())

app.listen(Number(process.env.PORT || 3003), () => {
    console.log(`Servidor rodando na porta ${process.env.PORT}`)
})

app.use('/invoicing', invoicingRouter)
app.use('/expenses', expensesRouter)
app.use('/total-value', updateTotalValuesRouter)
app.use('/subgroup', subgroupResumeRouter)
app.use('/price-formation', priceFormationRouter)