import express from "express";
import {
    searchNaver,
    interviewSearch,
    steadySearch,
    bestSearch,
} from "../controller/searchController";

const searchRouter = express.Router();

searchRouter.post("/", searchNaver);

searchRouter.get("/interview", interviewSearch);
searchRouter.get("/steady", steadySearch);
searchRouter.get("/best/:id", bestSearch);

export default searchRouter;
