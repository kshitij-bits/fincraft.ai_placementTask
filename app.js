import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import {dbConnection} from './database/dbConnection.js';
import fileUpload from 'express-fileupload';
import router from "./router.js";

const app = express();


app.use(cors({
    origin: [], 
    methods: ["GET", "PUT", "DELETE", "POST"],
    credentials: true
}))

app.use(express.json());
//app.use(express.urlencoded({ extended : true }));
app.use(fileUpload());

app.use("/user", router);

dbConnection();

export default app;