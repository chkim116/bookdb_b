import express from "express";
import { getLogin } from "../controller/userController";

const userRouter = express.Router();

userRouter.post("/login", postLogin);

userRouter.post("/register", postRegister);

userRouter.auth("/auth", userAuth);

export default userRouter;
