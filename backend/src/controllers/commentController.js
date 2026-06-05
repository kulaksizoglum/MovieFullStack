import Comment from "../models/Comment.js"
import mongoose from "mongoose"

export const getComments = async (req, res) => {
    try {
        const comments = await Comment.find().limit(10)
        res.status(200).json(comments)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

export const getCommentByMovieId = async (req, res) => {

    try {
        console.log(req.params.movieId)
        const comment = await Comment.find({ movie_id: new mongoose.Types.ObjectId(req.params.movieId) })
        if (comment.length === 0) {
            return res.status(404).json({ message: "Comment not found" })
        }
        console.log(comment)
        res.json(comment)

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


export const deleteComment = async (req, res) => {
    try {
        const comment = await Comment.findByIdAndDelete(req.params.id)
        if (!comment) {
            return res.status(404).json({ message: "Comment not found" })
        }
        console.log(comment)
        res.status(200).json({ message: "Comment deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

