import cookieParser from "cookie-parser";
import express from "express";
import morgan from "morgan";
import cors from "cors";
import passport from "passport";
import helmet from "helmet";
import dotenv from "dotenv";
dotenv.config();

// util
import "./db";
import "./passport";

// router
import userRouter from "./router/userRouter";
import crawlingRouter from "./router/crawlingRouter";
import reviewRouter from "./router/reviewRouter";
import boardRouter from "./router/boardRouter";
import searchRouter from "./router/searchRouter";

const app = express();

app.use(helmet());
app.use(cors({ origin: true, credentials: true }));
app.use(morgan("dev"));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(passport.initialize());
app.use(passport.session());

app.use("/", userRouter);
app.use("/crawling", crawlingRouter);
app.use("/review", reviewRouter);
app.use("/board", boardRouter);
app.use("/search", searchRouter);

app.listen(process.env.PORT, () => {
    console.log(`server on http://localhost:${process.env.PORT}`);
});
