import { Router } from "express";
import { borrowBook, borrowedBookSummary } from "../controllers/borrowBook.controller";

const borrowBooksRouter = Router()

borrowBooksRouter.post("/", borrowBook)
borrowBooksRouter.get("/", borrowedBookSummary)

export default borrowBooksRouter