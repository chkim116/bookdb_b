import mongoose from "mongoose";

const ReviewSchema = mongoose.Schema({
    title: String,
    content: String,
    regDate: String,
    userId: String,
    rating: String,
    count: Number,
    selectedBook: {
        title: String,
        image: String,
        author: String,
        isbn: String,
    },
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    password: String,
});

const model = mongoose.model("Review", ReviewSchema);

export default model;
