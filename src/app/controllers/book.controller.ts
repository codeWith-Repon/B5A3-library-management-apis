import { Request, Response } from "express";
import Book from "../models/book.model";
import mongoose from "mongoose";

const registerBook = async (req: Request, res: Response) => {
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

        if (error instanceof mongoose.Error.ValidationError) {
            const formatteErrors: any = {}

            for (const field in error.errors) {
                const err = error.errors[field]
                if (err.name === 'ValidatorError')
                    formatteErrors[field] = {
                        message: err.message,
                        name: err.name,
                        properties: err.properties,
                        kind: err.kind,
                        path: err.path,
                        value: err.value
                    }
            }

            return res.status(400).json({
                "message": "Validation failed",
                "success": false,
                error: {
                    name: error.name,
                    errors: formatteErrors
                }
            })
        }

        res.status(500).json({
            message: "Internal Server Error",
            success: false,
            error: error.message || error,
        });
    }
}

export {
    registerBook
}