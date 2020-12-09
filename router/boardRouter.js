import express from "express";
import {
    delBoard,
    getBoard,
    getBoardById,
    postBoard,
    updateBoard,
} from "../controller/boardController";

const boardRouter = express.Router();

// board

boardRouter.post("/post", postBoard);
boardRouter.put("/edit", updateBoard);
boardRouter.get("/:id", getBoardById);
boardRouter.get("/", getBoard);
boardRouter.delete("/del/:id", delBoard);

export default boardRouter;
