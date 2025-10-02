import MovieCard from "../components/MovieCard"
import { useState, useEffect } from "react"
import { searchMovies, getPopularMovies } from '../services/api'
import '../css/Home.css'

function Home() {

    const [seacrhQuery, setSearchQuery] = useState("")

    const [movies, setMovies] = useState([])
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const loadPopularMovies = async () => {
            try {
                const popularMovies = await getPopularMovies()
                setMovies(popularMovies)
            } catch (err) {
                console.log(err)
                setError("Failed to load movies.. ")
            }
            finally {
                setLoading(false)
            }
        }


        loadPopularMovies()
    }, [])

    const handleSearch = async (e) => {
        e.preventDefault()
        if(!seacrhQuery.trim()) return
        if(loading) return
        setLoading(true)
        try{
            const searchResults = await searchMovies(seacrhQuery)
            setMovies(searchResults)
            setError(null)
        }catch(err){
            console.log(err)
            setError(`Failed to search movies....`)
        }finally{
            setLoading(false)
        }

    }

    return (
        <div className="home">
            <form onSubmit={handleSearch} className="search-from">
                <input type="text" placeholder="Search for Movies..."
                    className="search-input"
                    value={seacrhQuery}
                    onChange={(e) => setSearchQuery(e.target.value)} />
                <button type="submit" className="search-button">Search</button>
            </form>

            {error && <div className="error-message">{error}</div>}

            {loading ? <div className="loading">Loading...</div> : <div className="movies-grid">
                {movies.map(movie => (
                    <MovieCard movie={movie} key={movie.id}></MovieCard>
                ))}
            </div>}

        </div>
    )
}

export default Home