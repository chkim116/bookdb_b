import express from "express";
import {
    delReview,
    getReview,
    postImg,
    postReview,
    updateReview,
} from "../controller/reviewController";

import { uploadImage } from "../multer";

const reviewRouter = express.Router();

reviewRouter.get("/", getReview);
reviewRouter.post("/post", postReview);
reviewRouter.put("/put", updateReview);
reviewRouter.delete("/del", delReview);
reviewRouter.post("/img", uploadImage, postImg);

export default reviewRouter;
