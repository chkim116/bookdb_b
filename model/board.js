import mongoose from "mongoose";
const AutoIncrement = require("mongoose-sequence")(mongoose);

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

BoardSchema.plugin(AutoIncrement, {
    inc_field: "num",
});

const model = mongoose.model("Board", BoardSchema);

export default model;
