import express, { Application, Request, Response } from 'express'
import cors from 'cors'
import bookRouter from './app/routes/book.router'

export const app: Application = express()
app.use(cors())
app.use(express.json())

app.use("/api/books", bookRouter);

app.get('/', (req: Request, res: Response) => {
    res.end("Welcome to library management")
})


export default app