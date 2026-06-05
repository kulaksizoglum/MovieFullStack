import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
    {
        movieId: String,
        userId: String,
        text: String,
        rating: Number,
    },
    {
        timestamps: true,
        collection: "comments",
    }
);

export default mongoose.model("Comment", commentSchema);