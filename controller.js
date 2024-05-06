import csvParser from 'csv-parser';
import {catchAsyncErrors} from './catchAsyncErrors.js';
import { transactionSchema, Transaction } from './models/transactionSchema.js';
import streamifier from 'streamifier';

export const deleteTransaction = catchAsyncErrors(async (req, res, next) => {
    const { transactionId } = req.params;
    const transaction = await Transaction.findById(transactionId);
    if(!transaction){
        return next(new ErrorHandler("Transaction not found", 404));
    }
    await transaction.deleteOne();
    res.status(200).json({
        success: true,
        message: "Transaction Found and Deleted Successfully"
    });
});

export const getSingleTransaction = catchAsyncErrors(async (req, res, next) => {
    const { transactionId } = req.params;
    const transaction = await Transaction.findById(transactionId);
    if(!transaction){
        return next(new ErrorHandler("Transaction not found", 404));
    }
    res.status(200).json({
        success: true,
        message: "Transaction Found Successfully",
        transaction
    });
});

export const updateTransaction = catchAsyncErrors(async(req, res, next)=> {
    const { transactionId } = req.params;
    let transaction = Transaction.findById(transactionId);
    if(!transaction){
        next( new ErrorHandler("No such Transaction exists", 404));
    }
    const newtransaction = {
        TransactionID: req.body.TransactionID,
        CustomerName: req.body.CustomerName,
        TransactionDate: req.body.TransactionDate,
        Amount: req.body.Amount,
        Status: req.body.Status,
        InvoiceURL: req.body.InvoiceURL
    };

    transaction = await Transaction.findByIdAndUpdate(transactionId, newtransaction, {
        new: true,
        useFindAndModify: false
    })
    res.status(200).json({
        success: true,
        message: "Transaction Updated Successfully",
        transaction
    })
});


export const getAllTransactions = catchAsyncErrors(async(req, res, next)=> {
    const allTransactions = await Transaction.find();
    res.status(200).json({
        success: true,
        allTransactions
    })
});


export const uploadFile = catchAsyncErrors(async(req, res, next)=> {

    if(!req.files || Object.keys(req.files).length===0 ) {
        return next(new ErrorHandler("No files uploaded", 400));
    }

    const file = req.files.file;

    const stream = streamifier.createReadStream(file.data);

    stream.pipe(csvParser())
        .on('data', (data) => {
            const transaction = new Transaction({
                TransactionID: data.TransactionID,
                CustomerName: data.CustomerName,
                TransactionDate: new Date(data.TransactionDate),
                Amount: parseFloat(data.Amount),
                Status: data.Status,
                InvoiceURL: data.InvoiceURL
            });
            transaction.save().then(() => {
                console.log('Transaction Saved Successfully');
            })
            .catch((err) => {
                console.log(err);
            });
        })
        .on('end', () => {
            res.send('File uploaded and data stored in MongoDB');
        });
});


