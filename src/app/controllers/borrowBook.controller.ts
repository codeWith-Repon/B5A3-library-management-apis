import { NextFunction, Request, Response } from "express";
import Book from "../models/book.model";
import BorrowBook from "../models/borrow.model";

const borrowBook = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { book, quantity } = req.body
        const borrow = new BorrowBook(req.body)

        const getBook = await Book.findById(book)
        if (!getBook) {
            res.status(404).json({
                "success": false,
                "message": "Book can not found",
            })
            return
        }

        if (getBook.copies < quantity) {
            res.status(400).json({
                success: false,
                message: "Not enough copies available",
            });
            return
        }
        await getBook.borrow(quantity)

        const borrowBook = await borrow.save()

        res.status(201).json({
            "success": true,
            "message": "Book borrowed successfully",
            "data": borrowBook
        })
    } catch (error: any) {
        next(error)
    }
};

const borrowedBookSummary = async (req: Request, res: Response, next: NextFunction) => {
    try {

        const booksSummary = await BorrowBook.aggregate([
            { $group: { _id: "$book", totalQuantity: { $sum: "$quantity" } } },
            {
                $lookup: {
                    from: "books",
                    localField: "_id",
                    foreignField: "_id",
                    as: "book"
                }
            },
            { $unwind: "$book" },
            { $project: { _id: 0, totalQuantity: 1, "book.title": 1, "book.isbn": 1 } }
        ])

        res.status(201).json({
            "success": true,
            "message": "Borrowed books summary retrieved successfully",
            "data": booksSummary
        })
    } catch (error: any) {
        next(error)
    }
};



export {
    borrowBook,
    borrowedBookSummary
}