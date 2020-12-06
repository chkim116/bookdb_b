import cookieParser from "cookie-parser";
import express from "express";
import morgan from "morgan";
import "./db";

import userRouter from "./router/userRouter";

const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/", userRouter);

app.listen((process.env.PORT, () => {
    console.log("server on", `http://localhost:${process.env.PORT}`);
});
