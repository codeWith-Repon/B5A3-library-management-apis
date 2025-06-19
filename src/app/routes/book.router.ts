import { Router } from "express";
import { registerBook } from "../controllers/book.controller";

const bookRouter = Router()

bookRouter.post("/", registerBook)


export default bookRouter