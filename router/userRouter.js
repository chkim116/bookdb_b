import express from "express";
import {
    logout,
    postLogin,
    postRegister,
    userAuth,
    userPost,
} from "../controller/userController";

const userRouter = express.Router();

userRouter.post("/register", postRegister, postLogin);
userRouter.post("/login", postLogin);

userRouter.get("/auth", userAuth, async (req, res) => {
    console.log(req.headers);

    res.status(200).json({
        id: req.user._id,
        email: req.user.email,
        isAdmin: req.user.isAdmin,
        board: req.user.board,
        review: req.user.review,
        nickname: req.user.nickname,
    });
});

userRouter.get("/userpost/:id", userPost);

userRouter.get("/logout", userAuth, logout);

export default userRouter;
