import express from "express";
import {
    delReview,
    getReview,
    postReview,
    updateReview,
} from "../controller/reviewController";

const reviewRouter = express.Router();

reviewRouter.get("/", getReview);
reviewRouter.post("/post", postReview);
reviewRouter.put("/put", updateReview);
reviewRouter.delete("/del", delReview);

export default reviewRouter;
