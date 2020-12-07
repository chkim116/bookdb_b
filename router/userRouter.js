import express from "express";
import {
    postLogin,
    postRegister,
    userAuth,
} from "../controller/userController";

const userRouter = express.Router();

userRouter.post("/login", postLogin);

userRouter.post("/register", postRegister);

userRouter.get("/auth", userAuth);

userRouter.get("/", (req, res) => {
    res.send("heeo");
});

export default userRouter;
