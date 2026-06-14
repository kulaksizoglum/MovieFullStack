import mongoose from "mongoose";

const movieSchema = new mongoose.Schema({
    genres: {
        type: Array
    },
    cast: {
        type: Array
    },
    title: {
        type: String,
        required: true
    },
    poster: {
        type: String,
    }

}, { strict: false });

const Movie = mongoose.model("Movie", movieSchema,);

export default Movie;   