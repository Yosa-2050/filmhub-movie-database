import { Link } from "react-router-dom";
import { useFavorites } from "../context/FavoritesContext";
import StarIconImg from "../assets/star.png";
import HeartIconImg from "../assets/favorite.png";

const MovieCard = ({ movie }) => {
  const { favorites, toggleFavorite } = useFavorites();
  const isFavorite = favorites.includes(movie.imdbID);

  return (
    <div
      style={{
        backgroundColor: "#1f2937",
        borderRadius: "10px",
        overflow: "hidden",
        boxShadow: "0 4px 10px rgba(0,0,0,0.5)",
        transition: "transform 0.3s ease",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.02)")}
      onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
    >
      <Link to={`/movie/${movie.imdbID}`} style={{ display: "block" }}>
        <div style={{ position: "relative", height: "16rem", overflow: "hidden" }}>
          <img
            src={movie.Poster !== "N/A" ? movie.Poster : "/assets/placeholder.png"}
            alt={`${movie.Title} poster`}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(to top, rgba(0,0,0,0.7), transparent)",
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              padding: "1rem",
              width: "100%",
            }}
          >
            <h3
              style={{
                fontSize: "1.1rem",
                fontWeight: 600,
                color: "white",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {movie.Title}
            </h3>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "0.25rem",
                alignItems: "center",
              }}
            >
              <span style={{ fontSize: "0.9rem", color: "#d1d5db" }}>{movie.Year}</span>
              <div style={{ display: "flex", alignItems: "center" }}>
                <img
                  src={StarIconImg}
                  alt="Star"
                  style={{ height: "16px", width: "16px", marginRight: "4px" }}
                />
                <span style={{ fontSize: "0.9rem", color: "white" }}>
                  {movie.imdbRating || "N/A"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </Link>

      {/* Favorite Button */}
      <div
        style={{
          padding: "0.75rem",
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
        }}
      >
        <button
          onClick={(e) => {
            e.preventDefault();
            toggleFavorite(movie.imdbID);
          }}
          style={{
            padding: "6px",
            borderRadius: "50%",
            background: "transparent",
            cursor: "pointer",
          }}
          aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
        >
          <img
            src={HeartIconImg}
            alt="Favorite"
            style={{
              height: "16px",
              width: "16px",
              filter: isFavorite
                ? "invert(34%) sepia(97%) saturate(7471%) hue-rotate(355deg) brightness(95%) contrast(102%)"
                : "grayscale(1) brightness(0.7)",
            }}
          />
        </button>
      </div>
    </div>
  );
};

export default MovieCard;
