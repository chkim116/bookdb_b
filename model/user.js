import mongoose from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";

const UserSchema = mongoose.Schema({
    email: String,
    password: String,
    nickname: String,
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
    isAdmin: { type: Boolean, default: false },
});

UserSchema.plugin(passportLocalMongoose, {
    usernameField: "email",
    passwordField: "password",
});

const model = mongoose.model("User", UserSchema);

export default model;
