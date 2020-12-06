import express from "express";
import {
    bestCrawling,
    interviewCrawling,
    steadyCrawling,
} from "../controller/crawlingController";

const crawlingRotuer = express.Router();

crawlingRotuer.get("/best", bestCrawling);
crawlingRotuer.get("/steady", steadyCrawling);
crawlingRotuer.get("/interview", interviewCrawling);

export default crawlingRotuer;
