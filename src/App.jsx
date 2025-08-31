import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import FavoritesPage from "./pages/FavoritesPage";
import DetailsPage from "./pages/DetailsPage";
import "./App.css";

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [movies, setMovies] = useState([]);

  // ✅ Fetch movies from OMDb API
  const fetchMovies = async (query) => {
    try {
      const url = query
        ? `https://www.omdbapi.com/?apikey=YOUR_API_KEY&s=${query}`
        : `https://www.omdbapi.com/?apikey=YOUR_API_KEY&s=avengers`; // default
      const res = await fetch(url);
      const data = await res.json();
      if (data.Search) {
        setMovies(data.Search);
      } else {
        setMovies([]);
      }
    } catch (err) {
      console.error("Error fetching movies:", err);
      setMovies([]);
    }
  };

  // ✅ Fetch default movies on mount
  useEffect(() => {
    fetchMovies();
  }, []);

  // ✅ Fetch movies whenever searchQuery changes
  useEffect(() => {
    if (searchQuery.trim() !== "") {
      fetchMovies(searchQuery);
    }
  }, [searchQuery]);

  return (
    <Router>
      <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <div className="p-4" style={{ backgroundColor: "#1c1848" }}>
        <Routes>
          <Route path="/" element={<HomePage movies={movies} />} />
          <Route path="/favorites" element={<FavoritesPage />} />
          <Route path="/movie/:id" element={<DetailsPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
