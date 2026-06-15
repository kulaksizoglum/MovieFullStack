
import { useEffect, useState } from "react";
import api from "../api/axios.js";
import MovieCard from "../components/MovieCard.jsx";


const Dashboard = () => {
    const [movies, setMovies] = useState([])
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const res = await api.get("/movies?limit=9")
                setMovies(res.data.movies)
            } catch (error) {
                console.error(error)
            } finally {
                setLoading(false)
            }
        }
        fetchMovies()
    }, [])

    return (
        <div className="min-h-screen bg-slate-100">
            <div className="max-w-7xl mx-auto px-6 py-6">
                <div className="bg-[url('/backend.webp')] bg-cover bg-center rounded-2xl h-72 flex items-center mb-10">
                    <div className="px-8 py-12 text-white">
                        <h1 className="text-5xl font-bold mb-2">Welcome</h1>
                        <h2 className="text-2xl">Millions of movies, TV shows and people to discover</h2>
                    </div>
                </div>
                {loading && (
                    <div className="flex justify-center py-12">
                        <span className="loading loading-spinner loading-lg"></span>
                    </div>
                )}

                {!loading &&
                    <section>
                        <div className="mb-8">
                            <h2 className="text-3xl font-bold text-slate-900">Featured Movies</h2>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                            {movies.map((movie) => (
                                <MovieCard key={movie._id} movie={movie} />
                            ))}
                        </div>
                    </section>
                }

            </div>
        </div>
    );
};

export default Dashboard;