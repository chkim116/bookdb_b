import User from "../model/user";
import bcrypt from "bcrypt";
import passport from "passport";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const postRegister = async (req, res, next) => {
    const {
        body: { email, password, nickname },
    } = req;
    const salt = await bcrypt.genSalt(10); // hash
    const hashPassword = await bcrypt.hash(password, salt);
    try {
        const user = await User({
            email,
            password: hashPassword,
            nickname,
            isAdmin: false,
        });
        await User.register(user, password);
        next();
    } catch (err) {
        console.log(err);
        res.status(400).json(err);
    }
};

export const postLogin = (req, res, next) => {
    passport.authenticate("local", (err, user, info) => {
        if (err) return res.json({ message: err }).next(err);
        if (!user) {
            res.status(400).json({
                message: "아이디나 비밀번호를 다시 입력해 주세요.",
            });
        } else {
            req.logIn(user, (err) => {
                if (err) {
                    return next(err);
                }
                const token = jwt.sign(
                    { userID: user._id },
                    process.env.JWT_SECRET
                );
                user.token = token;
                user.save((err, user) => {
                    if (err) {
                        return res.status(400).json(err);
                    }
                    const options = process.env.NODE_ENV === "production" && {
                        maxAge: 1000 * 60 * 60 * 24 * 7,
                        httpOnly: true,
                        secure: true,
                        sameSite: "none",
                    };
                    return res
                        .cookie("x_auth", user.token, options)
                        .status(200)
                        .json(user._id);
                });
            });
        }
    })(req, res, next);
};

export const userAuth = (req, res, next) => {
    const token = req.cookies.x_auth;
    if (token === undefined || token === "") {
        return;
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(500).json({ message: "token decode 실패" });
        }
        User.findOne({ _id: decoded.userID }, (err, user) => {
            if (err) {
                return res.json({ message: "Not found" });
            }
            if (!user) {
                return res
                    .status(400)
                    .json({ message: "token과 맞는 유저가 없습니다." });
            }
            if (user) {
                req.token = token;
                req.user = user;
            }
            next();
        });
    });
};

export const logout = (req, res) => {
    req.token = "";

    return res.clearCookie("x_auth").status(200).json({ message: "clear!" });
};

export const userPost = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User.findById(id)
            .populate("review")
            .populate("board");
        console.log(user);
        res.status(200).json(user);
    } catch (err) {
        console.log(err);
        res.status(400).json(err);
    }
};
