
import { useEffect, useState } from "react";
import api from "../api/axios.js";
import MovieCard from "../components/MovieCard.jsx";
import { useAuthContext } from "../hooks/useAuthContext.jsx";


const Movies = () => {
    const { user } = useAuthContext()
    const [movies, setMovies] = useState([])
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const res = await api.get("/movies", {
                    headers: {
                        'Authorization': `Bearer ${user.token}`
                    }
                })
                setMovies(res.data)
                console.log(res)
            } catch (error) {
                console.log(error)
            } finally {
                setLoading(false)
            }
        }
        fetchMovies()
    }, [])

    return (
        <div className="min-h-screen bg-slate-100 ">
            <div className="p-6 rounded-4xl font-serif ml-10 mr-10 ">
                <div className="bg-[url('/backend.webp')] bg-cover bg-center] h-70 rounded-3xl">
                    <div className="pt-20 pl-40 text-white">
                        <h4 className="text-5xl"> Welcome. </h4>
                        <h2 className="text-3xl">Millions of movies, TV shows and people to discover. Explore now.</h2>
                    </div>
                </div>

                <section>
                    <div className="m-10 text-xl font-bold text-slate-900">
                        <h2>Recent Movies</h2>
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