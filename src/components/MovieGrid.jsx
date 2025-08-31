import React from "react";
import MovieCard from "./MovieCard";
import '../App.css';


export default function MovieGrid({ movies }) {
  if (!movies || movies.length === 0) {
    return <p>No movies found.</p>;
  }

  return (
    
    <div className="movie-grid">
      {movies.map((movie) => (
        <MovieCard key={movie.imdbID} movie={movie} />
      ))}
    </div>
  );
}
