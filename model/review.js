import mongoose from "mongoose";

const ReviewSchema = mongoose.Schema({
    title: String,
    content: String,
    regDate: Date,
    books: {
        title: String,
        link: String,
        image: String,
        author: String,
        publisher: String,
        pubdate: String,
        description: String,
    },
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    password: String,
});

const model = mongoose.model("Review", ReviewSchema);

export default model;
