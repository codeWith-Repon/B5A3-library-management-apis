import { Router } from "express";
import {
    deleteBook,
    getAllBooks,
    getBookById,
    registerBook,
    updateBook
} from "../controllers/book.controller";

const bookRouter = Router()

bookRouter.post("/", registerBook)
bookRouter.get("/", getAllBooks)
bookRouter.get("/:bookId", getBookById)
bookRouter.put("/:bookId", updateBook)
bookRouter.delete("/:bookId", deleteBook)


export default bookRouter