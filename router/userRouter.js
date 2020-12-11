import express from "express";
import {
    logout,
    postLogin,
    postRegister,
    userAuth,
} from "../controller/userController";

const userRouter = express.Router();

userRouter.post("/register", postRegister, postLogin);
userRouter.post("/login", postLogin);

userRouter.get("/auth", userAuth, async (req, res) => {
    console.log(req.user);
    res.status(200).json({
        id: req.user._id,
        email: req.user.email,
        isAdmin: req.user.isAdmin,
        board: req.user.board,
        review: req.user.review,
        nickname: req.user.nickname,
    });
});

userRouter.get("/logout", userAuth, logout);

export default userRouter;
