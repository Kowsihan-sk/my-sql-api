import dotenv from "dotenv";
dotenv.config();
import express, { json, urlencoded } from "express";

import { connectDB } from "./config/db.js";

import userRouter from "./routes/routes.js";

const app = express();

app.use(json());
app.use(urlencoded({ extended: true }));

connectDB();

app.use('/', userRouter);
app.get('/', (req, res) => {
    res.send("<h1>Api running</h1>");
})

const PORT = process.env.PORT || 5000;
app.listen(PORT, (req, res) => {
    console.log(`Server running in PORT : ${PORT}`);
})