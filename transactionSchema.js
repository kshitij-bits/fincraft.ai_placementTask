import mongoose from "mongoose";

export const transactionSchema = new mongoose.Schema({
      TransactionID: {
        type: String,
        required: true
      },
      CustomerName: {
        type: String,
        required: true
      },
      TransactionDate: {
        type: Date,
        default: Date.now
      },
      Amount: {
        type: Number,
        required: true
      },
      Status: {
        type: String,
        required: true
      },
      InvoiceURL: {
        type: String,
        required: true
      }
})


export const Transaction = mongoose.model("Transaction", transactionSchema);