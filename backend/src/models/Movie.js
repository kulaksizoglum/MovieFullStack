import mongoose from "mongoose";

const movieSchema = new mongoose.Schema({

}, { strict: false });

const Movie = mongoose.model("Movie", movieSchema,);

export default Movie;   