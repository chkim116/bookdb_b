import mongoose from "mongoose";
import Review from "../model/review";
import User from "../model/user";

export const getReview = async (req, res) => {
    try {
        const reviews = await Review.find({}).sort({ _id: -1 });
        res.status(200).json(reviews);
    } catch (err) {
        console.log(err);
        res.status(400).json(err.message);
    }
};

export const getReviewById = async (req, res) => {
    const { id } = req.params;
    try {
        const review = await Review.findById(id);
        review.count += 1;
        review.save();
        res.status(200).json(review);
    } catch (err) {
        console.log(err);
        res.status(400).json(err.message);
    }
};

export const postReview = async (req, res) => {
    const {
        title,
        content,
        regDate,
        selectedBook,
        rating,
        id,
        nickname,
    } = req.body;
    const notUser = mongoose.Types.ObjectId("4edd40c86762e0fb12000003");
    try {
        const user = await User.findById(id);
        const review = await Review.create({
            title,
            content,
            regDate,
            selectedBook,
            rating,
            creator: id ? id : notUser,
            userId: nickname ? nickname : "익명",
            count: 0,
        });
        if (user) {
            user.review.push(review._id);
            user.save();
        }
        res.status(200).json(review);
    } catch (err) {
        console.log(err);
        res.status(400).json(err.message);
    }
};

export const updateReview = async (req, res) => {
    const { title, content, id } = req.body;
    try {
        await Review.findByIdAndUpdate(
            { _id: id },
            {
                title,
                content,
            }
        );
        res.status(200).json({ message: "update clear!" });
    } catch (err) {
        console.log(err);
        res.status(400).json(err.message);
    }
};

export const delReview = async (req, res) => {
    const { id } = req.params;
    try {
        await Review.findByIdAndDelete({ _id: id });
        res.status(200).json({ message: "delete clear" });
    } catch (err) {
        console.log(err);
        res.status(400).json(err.message);
    }
};

export const postImg = (req, res) => {
    const {
        file: { location },
    } = req;
    try {
        res.status(200).json(location);
    } catch (err) {
        console.log(err);
        res.status(400).json(err.message);
    }
};
