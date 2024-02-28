import express from "express"
import { ExpensesController } from "../controller/ExpensesController"
import { ExpensesBusiness } from "../business/ExpensesBusiness"
import { ExpensesDatabase } from "../database/ExpensesDatabase"


export const expensesRouter = express.Router()


const newExpensesController = new ExpensesController(
    new ExpensesBusiness(
        new ExpensesDatabase()
    )
)

expensesRouter.get('/', newExpensesController.getAllExpenses)
expensesRouter.get('/fixed', newExpensesController.getExpenseFixed)
expensesRouter.get('/variable', newExpensesController.getExpenseVariable)
expensesRouter.get('/expenses-all', newExpensesController.getExpenseFixedVariable)
