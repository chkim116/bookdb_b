import mongoose from "mongoose";

const BoardScheme = mongoose.Schema({
    title: String,
    content: String,
    regDate: Date,
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    password: String,
});

const model = mongoose.model("Board", BoardScheme);

export default model;
