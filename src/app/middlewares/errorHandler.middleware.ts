
import { Request, Response, NextFunction, ErrorRequestHandler } from "express";
import mongoose from "mongoose";

const errorHandler:ErrorRequestHandler  = (error: any, req: Request, res: Response, next: NextFunction) => {
    if (error instanceof mongoose.Error.ValidationError) {
        const formatteErrors: any = {}

        for (const field in error.errors) {
            const err = error.errors[field]

            if (err.name === "ValidatorError") {
                formatteErrors[field] = {
                    message: err.message,
                    name: err.name,
                    properties: err.properties,
                    kind: err.kind,
                    path: err.path,
                    value: err.value
                }
            }
        }

        return res.status(400).json({
            message: "Validation failed",
            success: false,
            error: {
                name: error.name,
                errors: formatteErrors
            }
        })
    }

    res.status(500).json({
        message: "Internal server error",
        success: false,
        error: error.message || error
    })
}

export default errorHandler
