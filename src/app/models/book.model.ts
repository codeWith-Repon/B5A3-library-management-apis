import { model, Schema } from "mongoose";
import { IBook, IBookDocument } from "../interfaces/book.interface";


const bookSchema = new Schema<IBookDocument>({
    title: {
        type: String,
        required: [true, "title is required"],
        trim: true
    },
    author: {
        type: String,
        required: [true, "author is required"],
    },
    genre: {
        type: String,
        enum: {
            values: [
                "FICTION",
                "NON_FICTION",
                "SCIENCE",
                "HISTORY",
                "BIOGRAPHY",
                "FANTASY"
            ],
            message: "{VALUE} is not supported"
        },
        required: [true, "genre is required"],
        trim: true
    },
    isbn: {
        type: String,
        unique: [true, "isbn must be nuiqe"],
        required: [true, "isbn is required"]
    },
    description: {
        type: String
    },
    copies: {
        type: Number,
        required: [true, "copies is required"],
        min: [0, "copies cannot be negative"]
    },
    available: {
        type: Boolean,
        default: true
    },
}, {
    versionKey: false,
    timestamps: true
}
)
bookSchema.methods.borrow = function (quantity: number) {
    if (this.copies < quantity) {
        throw new Error("Not enough copies available")
    }
    this.copies -= quantity;
    if (this.copies === 0) this.available = false
    return this.save()
}

const Book = model<IBookDocument>("Book", bookSchema)
export default Book
