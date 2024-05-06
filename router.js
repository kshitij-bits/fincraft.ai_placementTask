import express from 'express';

import { uploadFile, deleteTransaction, getAllTransactions, updateTransaction, getSingleTransaction } from "./controller.js";

const router = express.Router();

router.post("/fileUpload", uploadFile);

router.delete("/deleteTransaction/:transactionId", deleteTransaction);

router.get("/singleTransaction/:transactionId", getSingleTransaction);

router.get("/allTransactions", getAllTransactions);

router.put("/updateTransaction/:transactionId", updateTransaction);

export default router;