import React, { useEffect, useMemo, useState, useDeferredValue } from "react";
import MovieCarousel from "../components/MovieCarousel";
import MovieGrid from "../components/MovieGrid";
import SearchBar from "../components/Search";


const API_KEY = "65e95374"; // OMDb API key
const SAMPLE_MOVIE_IDS = [
  "tt1375666", // Inception
  "tt0133093", // The Matrix
  "tt0816692", // Interstellar
  "tt0109830", // Forrest Gump
  "tt0137523", // Fight Club
  "tt0468569", // The Dark Knight
  
];

const normalize = (v) => (typeof v === "string" ? v.toLowerCase() : "");
const firstYear = (y) => {
  if (!y) return NaN;
  const m = String(y).match(/\d{4}/); // handles "2010–2014"
  return m ? parseInt(m[0], 10) : NaN;
};

const HomePage = ({ searchQuery: externalSearchQuery }) => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);


  const [localSearch, setLocalSearch] = useState(externalSearchQuery || "");
  useEffect(() => {
    setLocalSearch(externalSearchQuery || "");
  }, [externalSearchQuery]);

  const deferredSearch = useDeferredValue(localSearch);
  const activeSearch = (externalSearchQuery ?? "").length > 0
    ? externalSearchQuery
    : deferredSearch;

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        const promises = SAMPLE_MOVIE_IDS.map((id) =>
          fetch(`https://www.omdbapi.com/?i=${id}&apikey=${API_KEY}`).then((r) => r.json())
        );
        const results = await Promise.all(promises);
        setMovies(results.filter((m) => m?.Response === "True"));
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
      .sort((a, b) => firstYear(b?.Year) - firstYear(a?.Year))
      .slice(0, 5);
  }, [movies]);

  const filteredMovies = useMemo(() => {
    if (!activeSearch) return movies;
    const q = normalize(activeSearch);

    return movies.filter((m) => {
      const title = normalize(m?.Title);
      const genre = normalize(m?.Genre);
      const director = normalize(m?.Director);
      const actors = normalize(m?.Actors);
      const yearStr = String(m?.Year || "");
      
      return (
        title.includes(q) ||
        genre.includes(q) ||
        director.includes(q) ||
        actors.includes(q) ||
        yearStr.includes(q)
      );
    });
  }, [movies, activeSearch]);

  if (loading) {
    return (
      <div style={{ textAlign: "center", padding: "64px" }}>
        <h2 style={{ fontSize: 24, fontWeight: "bold", marginBottom: 16 }}>
          Loading movies...
        </h2>
      </div>
    );
  }

  const isSearching = Boolean(activeSearch);
  const showCount = filteredMovies.length;
  return (
    <div style={{ padding: "1rem 2rem" }}>
      
<SearchBar value={localSearch} onChange={setLocalSearch} />
      
      
     
{!isSearching && <MovieCarousel movies={latestMovies} autoplaySpeed={6000} />}
<div style={{ margin: "1.5rem 0 2rem" }}>
        <h1 style={{ fontSize: "2rem", fontWeight: 700, marginBottom: "0.25rem" }}>
          {isSearching ? "Search Results" : "All Movies"}
        </h1>
        <p style={{ color: "#6b7280" }}>
          {isSearching
            ? `Showing ${showCount} result${showCount === 1 ? "" : "s"} for “${activeSearch}”`
            : "Explore our collection of films"}
        </p>
      </div>
{filteredMovies.length === 0 ? (
        <div style={{ padding: "2rem 0", color: "#6b7280" }}>
          No matches. Try another title, person, genre, or year.
        </div>
      ) : (
        <MovieGrid movies={filteredMovies} />
      )}
    </div>
  );
};

export default HomePage;
