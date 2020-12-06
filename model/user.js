import mongoose from "mongoose";

const UserScheme = mongoose.Schema({
    userId: String,
    post: [
        {
            type: String,
            regDate: String,
        },
    ],
});

const model = mongoose.model("User", UserScheme);

export default model;
