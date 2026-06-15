
import { useEffect, useState } from "react";
import api from "../api/axios.js";
import MovieCard from "../components/MovieCard.jsx";


const Movies = () => {
    const [page, setPage] = useState(1)
    const [totalPage, setTotalPage] = useState(null)
    const [movies, setMovies] = useState([])
    const [loading, setLoading] = useState(true);
    const [searchInput, setSearchInput] = useState("");
    const [term, setTerm] = useState("");


    const handleSearch = (e) => {
        e.preventDefault();
        setPage(1);
        setTerm(searchInput.trim());
    };


    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const res = await api.get(`/movies?page=${page}&term=${encodeURIComponent(term)}`)
                setMovies(res.data.movies)
                setTotalPage(res.data.totalPages)
            } catch (error) {
                console.error(error)
            } finally {
                setLoading(false)
            }
        }

        fetchMovies()
    }, [page, term])

    return (
        <div className="min-h-screen bg-slate-100">
            <div className="max-w-7xl mx-auto px-6 py-6">
                <div className="relative bg-[url('/movies_background.jpg')] bg-cover bg-center rounded-2xl h-72 flex items-center mb-10">
                    <div className="absolute inset-0 bg-black/70 rounded-2xl"></div>
                    <div className="relative px-8 py-12 text-white">
                        <h1 className="text-5xl font-bold mb-2">Explore Movies</h1>
                        <h2 className="text-xl">Search, browse and discover movies from our database</h2>
                    </div>
                </div>
                {loading && (
                    <div className="flex justify-center py-12">
                        <span className="loading loading-spinner loading-lg"></span>
                    </div>
                )}
                {!loading && (
                    <section>
                        <div className="mb-8">
                            <h2 className="text-3xl font-bold text-slate-900">All Movies</h2>
                        </div>
                        <form onSubmit={handleSearch} className="flex gap-3 mb-8">
                            <input
                                type="text"
                                value={searchInput}
                                onChange={(e) => { setSearchInput(e.target.value) }}
                                placeholder="Search movies..."
                                className="input input-bordered flex-1"
                            />

                            <button
                                type="submit"
                                className="btn btn-primary"
                            >
                                Search
                            </button>
                        </form>

                        <div className="flex gap-2 items-center justify-between mb-8 flex-wrap">
                            <button
                                onClick={() => setPage(prev => prev - 1)}
                                disabled={page === 1}
                                className="btn btn-sm"
                            >
                                ← Previous
                            </button>
                            <div className="text-sm text-slate-600">
                                Page <span className="font-bold">{page}</span> of{" "}
                                <span className="font-bold">{totalPage}</span>
                            </div>

                            <button
                                onClick={() => setPage((prev) => prev + 1)}
                                disabled={page === totalPage}
                                className="btn btn-sm"
                            >
                                Next →
                            </button>
                        </div>


                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                            {movies.map((movie) => (
                                <MovieCard key={movie._id} movie={movie} />
                            ))}
                        </div>


                    </section>
                )}

            </div>
        </div>
    );
};

export default Movies;