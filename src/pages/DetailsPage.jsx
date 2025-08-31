import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useFavorites } from "../context/FavoritesContext";

import HeartIcon from "../assets/favorite.png";
import StarIcon from "../assets/star.png";
import ClockIcon from "../assets/clock.png";
import PlayIcon from "../assets/play.png";
import ArrowLeftIcon from "../assets/arrow_left.png"; 

const API_KEY = "65e95374"; // OMDb API key

const DetailsPage = () => {
  const { id } = useParams(); // imdbID from URL
  const navigate = useNavigate();
  const { favorites, toggleFavorite } = useFavorites();

  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `http://www.omdbapi.com/?i=${id}&apikey=${API_KEY}`
        );
        const data = await res.json();

        if (data.Response === "True") {
          setMovie(data);
        } else {
          setError(data.Error || "Movie not found");
        }
      } catch (err) {
        setError("Failed to load movie details");
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [id]);

  if (loading) {
    return (
      <div style={{ textAlign: "center", padding: "64px" }}>
        <h2 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "16px" }}>
          Loading...
        </h2>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ textAlign: "center", padding: "64px" }}>
        <p style={{ color: "red", marginBottom: "16px" }}>{error}</p>
        <button
          onClick={() => navigate(-1)}
          style={{
            padding: "8px 16px",
            background: "#444",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          Go Back
        </button>
      </div>
    );
  }

  const isFavorite = favorites.includes(movie.imdbID);

  return (
    <div style={{ padding: "20px" }}>
      <button
        onClick={() => navigate(-1)}
        style={{
          display: "flex",
          alignItems: "center",
          color: "#888",
          marginBottom: "24px",
          background: "none",
          border: "none",
          cursor: "pointer",
        }}
      >
        <img
          src={ArrowLeftIcon}
          alt="Back"
          style={{ width: "16px", height: "16px", marginRight: "8px" }}
        />
        Back
      </button>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: "32px" }}>
        {/* Poster */}
        <div>
          <div
            style={{
              borderRadius: "12px",
              overflow: "hidden",
              boxShadow: "0 4px 12px rgba(0,0,0,0.5)",
            }}
          >
            <img
              src={movie.Poster !== "N/A" ? movie.Poster : "/assets/placeholder.png"}
              alt={`${movie.Title} poster`}
              style={{ width: "100%", objectFit: "cover" }}
            />
          </div>
        </div>

        {/* Details */}
        <div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "start",
              marginBottom: "16px",
            }}
          >
            <div>
              <h1 style={{ fontSize: "28px", fontWeight: "bold", marginBottom: "8px" }}>
                {movie.Title}
              </h1>
              <p style={{ color: "#888" }}>
                {movie.Year} • Directed by {movie.Director}
              </p>
            </div>

            <button
              onClick={() => toggleFavorite(movie.imdbID)}
              style={{
                padding: "8px",
                borderRadius: "50%",
                background: "#222",
                border: "none",
                cursor: "pointer",
              }}
            >
              <img
                src={HeartIcon}
                alt="Favorite"
                style={{
                  width: "24px",
                  height: "24px",
                  filter: isFavorite
                    ? "invert(34%) sepia(88%) saturate(6782%) hue-rotate(356deg) brightness(95%) contrast(101%)"
                    : "invert(60%)",
                }}
              />
            </button>
          </div>

          {/* Genre */}
          {movie.Genre && (
            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "16px" }}>
              {movie.Genre.split(", ").map((genre, index) => (
                <span
                  key={index}
                  style={{
                    padding: "4px 8px",
                    background: "#222",
                    color: "#ccc",
                    fontSize: "12px",
                    borderRadius: "8px",
                  }}
                >
                  {genre}
                </span>
              ))}
            </div>
          )}

          {/* Rating & Runtime */}
          <div style={{ display: "flex", gap: "24px", marginBottom: "16px" }}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <img
                src={StarIcon}
                alt="Star"
                style={{ width: "16px", height: "16px", marginRight: "4px" }}
              />
              <span style={{ fontWeight: "600" }}>{movie.imdbRating}/10</span>
            </div>
            <div style={{ display: "flex", alignItems: "center" }}>
              <img
                src={ClockIcon}
                alt="Runtime"
                style={{ width: "16px", height: "16px", marginRight: "4px" }}
              />
              <span>{movie.Runtime}</span>
            </div>
          </div>

          {/* Synopsis */}
          <div style={{ marginBottom: "24px" }}>
            <h2 style={{ fontSize: "20px", fontWeight: "600", marginBottom: "8px" }}>
              Synopsis
            </h2>
            <p style={{ color: "#ccc", lineHeight: "1.5" }}>{movie.Plot}</p>
          </div>

          {/* Cast */}
          {movie.Actors && (
            <div style={{ marginBottom: "24px" }}>
              <h2 style={{ fontSize: "20px", fontWeight: "600", marginBottom: "8px" }}>
                Cast
              </h2>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                {movie.Actors.split(", ").map((actor, index) => (
                  <span
                    key={index}
                    style={{
                      padding: "4px 8px",
                      background: "#222",
                      color: "#ccc",
                      borderRadius: "8px",
                    }}
                  >
                    {actor}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Watch Trailer (placeholder) */}
          <button
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "12px 24px",
              background: "#e50914",
              color: "#fff",
              borderRadius: "8px",
              border: "none",
              cursor: "pointer",
            }}
          >
            <img
              src={PlayIcon}
              alt="Play"
              style={{ width: "16px", height: "16px", marginRight: "8px" }}
            />
            Watch Trailer
          </button>
        </div>
      </div>
    </div>
  );
};

export default DetailsPage;
