import mongoose from "mongoose";

const UserScheme = mongoose.Schema({
    email: String,
    password: String,
    nickName: String,
    board: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Board",
        },
    ],
    review: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Review",
        },
    ],
});

const model = mongoose.model("User", UserScheme);

export default model;
