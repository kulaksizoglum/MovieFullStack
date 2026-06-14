import Movie from "../models/Movie.js"

export const getMovies = async (req, res) => {
    try {
        console.log("get movies")
        const term = req.query.term
        const page = req.query.page || 1
        const limit = req.query.limit || 15
        const pageNumber = Number(page)
        const limitNumber = Number(limit)
        const skip = (pageNumber - 1) * limitNumber
        console.log("page", page, "skip", skip)

        const query = {};
        if (term) {
            query.$or = [
                { title: { $regex: term, $options: "i" } },
                { plot: { $regex: term, $options: "i" } },
                { genres: { $regex: term, $options: "i" } },
            ];
        }

        const movies = await Movie.find(query)
            .skip(skip)
            .limit(limitNumber)
        const totalMovies = await Movie.countDocuments(query);

        res.status(200).json({
            movies,
            totalPages: Math.ceil(totalMovies / limitNumber),
            totalMovies,
        });
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
        const newMovie = await Movie.create(req.body)
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