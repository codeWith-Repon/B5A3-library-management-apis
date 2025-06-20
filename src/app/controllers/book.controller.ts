import { NextFunction, Request, Response } from "express";
import Book from "../models/book.model";
import { SortOrder } from "mongoose";


const registerBook = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const payload = req.body

        const book = new Book(payload)
        const data = await book.save()

        res.status(201).json({
            "success": true,
            "message": "Book created successfully",
            "data": data
        })
    } catch (error: any) {
        next(error)
    }
};

const getAllBooks = async (req: Request, res: Response, next: NextFunction) => {
    try {

        const genre = req.query.filter
        const sortBy = req.query.sortBy
        const sortOrder = req.query.sort
        const limit = Number(req.query.limit) || 10

        const filterBygenre = genre ? { genre: genre } : {}

        const sortByCondition: { [key: string]: SortOrder; } = sortBy ? { [String(sortBy)]: sortOrder === "asc" ? "asc" : "desc" } : {}

        const data = await Book.find(filterBygenre).sort(sortByCondition).limit(limit)

        res.status(200).json({
            "success": true,
            "message": "Books retrieved successfully",
            "data": data
        })

    } catch (error) {
        next(error)
    }
}

const getBookById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { bookId } = req.params
        const data = await Book.findById(bookId)

        if (!data) {
            res.status(404).json({
                success: false,
                message: "Book not found",
                data: null
            })
            return
        }

        res.status(200).json({
            "success": true,
            "message": "Book retrieved successfully",
            "data": data
        })

    } catch (error) {
        next(error)
    }
}

const updateBook = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { bookId } = req.params
        const payload = req.body

        const data = await Book.findByIdAndUpdate(bookId, payload, { new: true })

        if (!data) {
            res.status(404).json({
                success: false,
                message: "Book not found",
                data: null,
            });
            return
        }

        res.status(200).json({
            "success": true,
            "message": "Book updated successfully",
            "data": data
        })
    } catch (error) {
        next(error)
    }
}

const deleteBook = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { bookId } = req.params

        const data = await Book.findByIdAndDelete(bookId)

        if (!data) {
            res.status(404).json({
                success: false,
                message: "Book not found",
                data: null,
            });
            return
        }

        res.status(200).json({
            "success": true,
            "message": "Book deleted successfully",
            "data": null
        })
    } catch (error) {
        next(error)
    }
}

export {
    registerBook,
    getAllBooks,
    getBookById,
    updateBook,
    deleteBook
}