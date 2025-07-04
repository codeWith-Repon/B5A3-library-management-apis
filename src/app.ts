import express, { Application, Request, Response } from 'express'
import cors from 'cors'
import bookRouter from './app/routes/book.router'
import errorHandler from './app/middlewares/errorHandler.middleware'
import borrowBooksRouter from './app/routes/borrowBooks.router'

export const app: Application = express()
app.use(cors({
    origin: ["http://localhost:5173", "https://library-management-client-mu.vercel.app"]
}))
app.use(express.json())

app.use("/api/books", bookRouter);
app.use("/api/borrow", borrowBooksRouter);

app.get('/', (req: Request, res: Response) => {
    res.end("Welcome to library management")
})

app.use(errorHandler)

export default app