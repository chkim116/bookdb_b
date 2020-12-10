import mongoose from "mongoose";
import autoIncrement from "mongoose-auto-increment";

const connection = mongoose.createConnection("mongodb://localhost:27017/board");
autoIncrement.initialize(connection);

const BoardSchema = mongoose.Schema({
    title: String,
    content: String,
    regDate: String,
    thumb: String,
    userId: String,
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    password: String,
    count: Number,
});

BoardSchema.plugin(autoIncrement.plugin, {
    model: "Board",
    field: "num",
    startAt: 1,
    increment: 1,
});

const model = mongoose.model("Board", BoardSchema);

export default model;
