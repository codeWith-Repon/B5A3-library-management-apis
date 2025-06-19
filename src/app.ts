import express, { Application, Request, Response } from 'express'
import cors from 'cors'

export const app: Application = express()
app.use(cors())
app.use(express.json())


app.get('/', (req: Request, res: Response) => {
    res.end("Welcome to library management")
})


export default app