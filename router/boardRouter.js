import express from "express";
import {
    delBoard,
    getBoard,
    postBoard,
    updateBoard,
} from "../controller/boardController";

const boardRouter = express.Router();

boardRouter.get("/", getBoard);
boardRouter.post("/post", postBoard);
boardRouter.put("/put", updateBoard);
boardRouter.delete("/del", delBoard);

export default boardRouter;
