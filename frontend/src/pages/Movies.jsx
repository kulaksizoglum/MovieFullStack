
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
                console.log(page)
                const res = await api.get(`/movies?page=${page}&term=${encodeURIComponent(term)}`)
                setMovies(res.data.movies)
                setTotalPage(res.data.totalPages)
                console.log(res)
            } catch (error) {
                console.log(error)
            } finally {
                setLoading(false)
            }
        }

        fetchMovies()
    }, [page, term])

    return (
        <div className="min-h-screen bg-slate-100 ">
            <div className="p-6 rounded-4xl font-serif ml-10 mr-10 ">
                <div className="relative bg-[url('/movies_background.jpg')] bg-cover bg-center] h-72 rounded-3xl">
                    <div className="absolute inset-0 bg-black/70"></div>
                    <div className="relative pt-20 pl-40 text-white">
                        <h4 className="text-5xl"> Explore Movies. </h4>
                        <h2 className="text-3xl">Search, browse and discover movies from the database.</h2>
                    </div>
                </div>

                <section>
                    <div className="m-10 text-xl font-bold text-slate-900">
                        <h2>All Movies</h2>
                    </div>
                    <form onSubmit={handleSearch} className="flex gap-3 mb-8">
                        <input
                            type="text"
                            value={searchInput}
                            onChange={(e) => { setSearchInput(e.target.value) }}
                            placeholder="Search movies..."
                            className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-900"
                        />

                        <button
                            type="submit"
                            className="px-6 py-3 rounded-xl bg-slate-900 text-white font-medium hover:bg-slate-800"
                        >
                            Search
                        </button>
                    </form>
                    <div className="flex gap-4 mt-10 mb-10">

                        <button
                            onClick={() => setPage(prev => prev - 1)}
                            disabled={page === 1}
                            className="px-4 py-2 rounded-lg bg-slate-900 text-white font-medium hover:bg-slate-800 disabled:bg-slate-400 disabled:cursor-not-allowed"

                        >
                            Previous
                        </button>
                        <p className="text-slate-700 font-medium">
                            Page <span className="font-bold">{page}</span> of{" "}
                            <span className="font-bold">{totalPage}</span>
                        </p>

                        <button
                            onClick={() => setPage((prev) => prev + 1)}
                            disabled={page === totalPage}
                            className="px-4 py-2 rounded-lg bg-slate-900 text-white font-medium hover:bg-slate-800 disabled:bg-slate-400 disabled:cursor-not-allowed"
                        >
                            Next
                        </button>
                    </div>
                    {!loading && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                            {movies.map((movie) => (
                                <MovieCard key={movie._id} movie={movie} />
                            ))}
                        </div>
                    )}

                </section>

            </div>
        </div>
    );
};

export default Movies;