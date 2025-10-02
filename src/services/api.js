const API_KEY = "a187f109d53d7998ebda4d935a4d5d22";
const BASE_URL = "https://api.themoviedb.org/3"

export const getPopularMovies = async () => {
    const response = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}`);
    const data = await response.json()

    return data.results
}



export const searchMovies = async (query) => {
    const response = await fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURI(query)}`);
    const data = await response.json()

    return data.results
}