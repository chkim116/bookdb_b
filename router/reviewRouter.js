import express from "express";
import {
    delReview,
    getReview,
    getReviewById,
    postImg,
    postReview,
    updateReview,
    recentReview,
} from "../controller/reviewController";

import { uploadImage } from "../multer";

const reviewRouter = express.Router();

// review

reviewRouter.get("/recent", recentReview);
reviewRouter.get("/", getReview);
reviewRouter.get("/:id", getReviewById);
reviewRouter.post("/post", postReview);
reviewRouter.put("/edit", updateReview);
reviewRouter.delete("/del/:id", delReview);
reviewRouter.post("/img", uploadImage, postImg);

export default reviewRouter;
