import { Link } from "react-router";

const MovieCard = ({ movie }) => {
    const poster =
        movie.poster ||
        "https://placehold.co/400x600?text=No+Poster";

    return (
        <div className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition">
            <img
                src={poster}
                alt={movie.title}
                className="w-full h-56 object-cover"
            />

            <div className="p-4">
                <h3 className="font-bold text-slate-900 line-clamp-2">
                    {movie.title}
                </h3>

                <p className="text-sm text-slate-500 mt-1">
                    {movie.year || "Unknown year"}
                </p>

                <div className="flex flex-wrap gap-2 mt-3">
                    {movie.genres?.slice(0, 3).map((genre) => (
                        <span
                            key={genre}
                            className="text-xs bg-indigo-100 text-indigo-700 px-2 py-1 rounded-full"
                        >
                            {genre}
                        </span>
                    ))}
                </div>

                <div className="flex items-center justify-between mt-4">
                    <p className="text-sm font-semibold text-slate-800">
                        ⭐ {movie.imdb?.rating || "N/A"}
                    </p>

                    <Link
                        to={`/movies/${movie._id}`}
                        className="text-sm text-blue-600 hover:underline"
                    >
                        Details
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default MovieCard;