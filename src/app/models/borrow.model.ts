import mongoose, { model, Schema } from "mongoose";
import { IBorrow } from "../interfaces/borrow.interface";

const borrowBookSchema = new Schema<IBorrow>({
    book: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Book",
        required: [true, "Book ID is required"],
    },
    quantity: {
        type: Number,
        required: [true, "Quantity is required"],
        min: [1, "Quantity must be an integer"]
    },
    dueDate: {
        type: Date,
        required: [true, "Due date is required"]
    }
}, {
    timestamps: true,
    versionKey: false
})


const BorrowBook = model<IBorrow>("BorrowBook", borrowBookSchema)
export default BorrowBook