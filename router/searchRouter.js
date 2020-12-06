import express from "express";
import { searchNaver } from "../controller/searchController";

const searchRouter = express.Router();

searchRouter.post("/", searchNaver);

export default searchRouter;
