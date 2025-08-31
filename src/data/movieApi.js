const API_KEY = "65e95374";
const BASE_URL = "http://www.omdbapi.com/";

// Search movies by title
export const searchMovies = async (query) => {
  try {
    const res = await fetch(`${BASE_URL}?apikey=${API_KEY}&s=${encodeURIComponent(query)}`);
    const data = await res.json();
    return data.Search || [];
  } catch (error) {
    console.error("Error fetching movies:", error);
    return [];
  }
};

// Get movie details by IMDb ID
export const getMovieDetails = async (id) => {
  try {
    const res = await fetch(`${BASE_URL}?apikey=${API_KEY}&i=${id}&plot=full`);
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching movie details:", error);
    return null;
  }
};
