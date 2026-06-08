import Movie from "../models/Movie.js"

export const getMovies = async (req, res) => {
    try {
        console.log("getmovies trigerred")
        const movies = await Movie.find().limit(10)
        res.status(200).json(movies)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

export const getMovieById = async (req, res) => {

    try {
        const movie = await Movie.findById(req.params.id)
        if (!movie) {
            return res.status(404).json({ message: "Movie not found" })
        }
        res.json(movie)

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const createMovie = async (req, res) => {

    try {
        const { title } = req.body
        const newMovie = await Movie.create({ title })

        res.status(201).json(newMovie);

    } catch (error) {
        res.status(400).json({ message: error.message });

    }
}

export const deleteMovie = async (req, res) => {
    try {
        const movie = await Movie.findByIdAndDelete(req.params.id)
        if (!movie) {
            return res.status(404).json({ message: "Movie not found" })
        }
        res.status(200).json({ message: "Movie deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

export const updateMovie = async (req, res) => {
    try {
        const updatedMovie = await Movie.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true,
            }
        );

        if (!updatedMovie) {
            return res.status(404).json({ message: "Movie not found" });
        }

        res.status(200).json(updatedMovie);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}