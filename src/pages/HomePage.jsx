import React, { useEffect, useState, useMemo } from "react";
import MovieCarousel from "../components/MovieCarousel";
import MovieGrid from "../components/MovieGrid";

const API_KEY = "65e95374"; // OMDb API key
const SAMPLE_MOVIE_IDS = [
  "tt1375666", // Inception
  "tt0133093", // The Matrix
  "tt0816692", // Interstellar
  "tt0109830", // Forrest Gump
  "tt0137523", // Fight Club
  "tt0468569", // The Dark Knight
];

const HomePage = ({ searchQuery }) => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        const promises = SAMPLE_MOVIE_IDS.map((id) =>
          fetch(`https://www.omdbapi.com/?i=${id}&apikey=${API_KEY}`)
            .then((res) => res.json())
        );
        const results = await Promise.all(promises);
        setMovies(results.filter((m) => m.Response === "True"));
      } catch (err) {
        console.error("Failed to fetch movies:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  
  const latestMovies = useMemo(() => {
    return [...movies]
      .sort((a, b) => parseInt(b.Year) - parseInt(a.Year))
      .slice(0, 5);
  }, [movies]);


  const filteredMovies = useMemo(() => {
    if (!searchQuery) return movies;
    const query = searchQuery.toLowerCase();
    return movies.filter(
      (movie) =>
        movie.Title.toLowerCase().includes(query) ||
        (movie.Genre && movie.Genre.toLowerCase().includes(query)) ||
        (movie.Director && movie.Director.toLowerCase().includes(query)) ||
        (movie.Actors && movie.Actors.toLowerCase().includes(query))
    );
  }, [movies, searchQuery]);

  if (loading) {
    return (
      <div style={{ textAlign: "center", padding: "64px" }}>
        <h2 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "16px" }}>
          Loading movies...
        </h2>
      </div>
    );
  }

  return (
    <div style={{ padding: "1rem 2rem" }}>
      {/*  show carousel only when not searching */}
      {!searchQuery && <MovieCarousel movies={latestMovies} autoplaySpeed={6000} />}

      <div style={{ marginBottom: "2rem" }}>
        <h1 style={{ fontSize: "2rem", fontWeight: "700", marginBottom: "0.5rem" }}>
          {searchQuery ? "Search Results" : "All Movies"}
        </h1>
        <p style={{ color: "#9ca3af" }}>
          {searchQuery
            ? `Showing results for "${searchQuery}"`
            : "Explore our collection of films"}
        </p>
      </div>

      {/*  pass filtered movies into grid */}
      <MovieGrid movies={filteredMovies} />
    </div>
  );
};

export default HomePage;
