import Board from "../model/board";
import mongoose from "mongoose";

export const getBoard = async (req, res) => {
    try {
        const board = await Board.find({}).sort({ _id: -1 });
        res.status(200).json(board);
    } catch (err) {
        console.log(err);
        res.status(400).json(err.message);
    }
};

export const getBoardById = async (req, res) => {
    const { id } = req.params;
    try {
        const board = await Board.findById(id);
        board.count += 1;
        board.save();
        res.status(200).json(board);
    } catch (err) {
        console.log(err);
        res.status(400).json(err.message);
    }
};

export const postBoard = async (req, res) => {
    const { title, content, regDate } = req.body;
    const id = mongoose.Types.ObjectId("4edd40c86762e0fb12000003");
    let thumb;
    if (content.includes("<img src=")) {
        thumb = content.split('<img src="')[1].split('">')[0];
    } else {
        thumb = false;
    }
    try {
        const board = await Board.create({
            title,
            content,
            regDate,
            thumb: thumb ? thumb : "",
            creator: id,
            userId: "익명",
            count: 0,
        });
        res.status(200).json(board);
    } catch (err) {
        console.log(err);
        res.status(400).json(err.message);
    }
};

export const updateBoard = async (req, res) => {
    const { title, content, id } = req.body;
    try {
        await Board.findByIdAndUpdate(
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

export const delBoard = async (req, res) => {
    const { id } = req.params;
    try {
        await Board.findByIdAndDelete({ _id: id });
        res.status(200).json({ message: "delete clear" });
    } catch (err) {
        console.log(err);
        res.status(400).json(err.message);
    }
};
