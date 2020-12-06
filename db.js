import mongoose from "mongoose";

mongoose.connect(process.env.MONGO, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
});

const db = mongoose.connection;

db.once("open", () => {
    console.log("CONNECT DB");
});

console.log("주석 처리하세요");
