import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ChevronLeftImg from "../assets/chevron_left.png";
import ChevronRightImg from "../assets/chevron_right.png";
import PlayIconImg from "../assets/play.png";
import StarImg from "../assets/star.png";
import "../App.css";

const MovieCarousel = ({ movies, autoplaySpeed = 5000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (!movies || movies.length <= 1 || isHovering) return;
    const interval = setInterval(() => {
      if (!isAnimating) goToNext();
    }, autoplaySpeed);
    return () => clearInterval(interval);
  }, [movies, autoplaySpeed, isHovering, isAnimating]);

  const goToPrevious = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev === 0 ? movies.length - 1 : prev - 1));
    setTimeout(() => setIsAnimating(false), 500);
  };

  const goToNext = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev + 1) % movies.length);
    setTimeout(() => setIsAnimating(false), 500);
  };

  if (!movies || movies.length === 0) return null;

  const getMovieIndex = (index) => {
    let actualIndex = index % movies.length;
    if (actualIndex < 0) actualIndex += movies.length;
    return actualIndex;
  };

  return (
    <div
      style={{ marginBottom: "3rem", paddingTop: "2rem" }}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Title + Controls */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "1.5rem",
          alignItems: "center",
        }}
      >
        <h2 style={{ fontSize: "1.5rem", fontWeight: "bold", color: "white" }}>
          Latest Releases
        </h2>
        <div style={{ display: "flex", gap: "8px" }}>
          <button
            onClick={goToPrevious}
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              backgroundColor: "#1f2937",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
            }}
            disabled={isAnimating}
          >
            <img
              src={ChevronLeftImg}
              alt="Previous"
              style={{ height: "20px", width: "20px" }}
            />
          </button>
          <button
            onClick={goToNext}
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              backgroundColor: "#1f2937",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
            }}
            disabled={isAnimating}
          >
            <img
              src={ChevronRightImg}
              alt="Next"
              style={{ height: "20px", width: "20px" }}
            />
          </button>
        </div>
      </div>

      {/* Carousel */}
      <div style={{ position: "relative", height: "24rem", overflow: "hidden" }}>
        <div style={{ position: "relative", height: "100%" }}>
          {[-2, -1, 0, 1, 2].map((offset) => {
            const movieIndex = getMovieIndex(currentIndex + offset);
            const movie = movies[movieIndex];
            const isCurrent = offset === 0;
            const isVisible = offset >= -2 && offset <= 2;

            let translateX = `${offset * 25}%`;
            let scale = isCurrent ? 1.2 : 1;
            let zIndex = isCurrent ? 20 : 10 - Math.abs(offset);
            let opacity = isCurrent ? 1 : 0.7;

            return (
              <div
                key={`${movie.imdbID}-${offset}`}
                style={{
                  position: "absolute",
                  top: 0,
                  width: "16rem",
                  height: "100%",
                  transform: `translateX(calc(50% + ${translateX})) scale(${scale})`,
                  left: "50%",
                  marginLeft: "-8rem",
                  zIndex,
                  opacity,
                  display: isVisible ? "block" : "none",
                  transition: "all 0.5s ease-in-out",
                }}
              >
                <Link
                  to={`/movie/${movie.imdbID}`}
                  style={{ display: "block", height: "100%" }}
                  onClick={(e) => {
                    if (!isCurrent) {
                      e.preventDefault();
                      offset < 0 ? goToPrevious() : goToNext();
                    }
                  }}
                >
                  <div
                    style={{
                      position: "relative",
                      borderRadius: "10px",
                      overflow: "hidden",
                      height: "100%",
                      backgroundColor: "#1f2937",
                      boxShadow: "0 6px 15px rgba(0,0,0,0.5)",
                    }}
                  >
                    {/* Poster */}
                    <div
                      style={{
                        height: "83%",
                        overflow: "hidden",
                        position: "relative",
                      }}
                    >
                      <img
                        src={
                          movie.Poster && movie.Poster !== "N/A"
                            ? movie.Poster
                            : "/assets/placeholder.png"
                        }
                        alt={`${movie.Title} poster`}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                      />
                      {/* Hover overlay */}
                      <div
                        style={{
                          position: "absolute",
                          inset: 0,
                          background:
                            "linear-gradient(to top, rgba(0,0,0,0.8), transparent)",
                          opacity: 0,
                          transition: "opacity 0.3s",
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.opacity = 1)}
                        onMouseLeave={(e) => (e.currentTarget.style.opacity = 0)}
                      >
                        <div
                          style={{
                            position: "absolute",
                            bottom: 0,
                            left: 0,
                            padding: "0.75rem",
                            width: "100%",
                            display: "flex",
                            justifyContent: "center",
                          }}
                        >
                          <button
                            style={{
                              backgroundColor: "#dc2626",
                              color: "white",
                              borderRadius: "50%",
                              width: "48px",
                              height: "48px",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              cursor: "pointer",
                            }}
                          >
                            <img
                              src={PlayIconImg}
                              alt="Play"
                              style={{ height: "24px", width: "24px" }}
                            />
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Info */}
                    <div style={{ padding: "0.75rem", height: "17%" }}>
                      <h3
                        style={{
                          fontSize: "1rem",
                          fontWeight: isCurrent ? "bold" : "500",
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          color: "white",
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
                        <div style={{ display: "flex", alignItems: "center" }}>
                          <img
                            src={StarImg}
                            alt="Star"
                            style={{
                              height: "14px",
                              width: "14px",
                              marginRight: "4px",
                            }}
                          />
                          <span
                            style={{ fontSize: "0.9rem", color: "white" }}
                          >
                            {movie.imdbRating || "N/A"}
                          </span>
                        </div>
                        <span
                          style={{
                            fontSize: "0.75rem",
                            color: "#9ca3af",
                          }}
                        >
                          {movie.Year}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </div>

      {/* Indicators */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "1.5rem",
          gap: "8px",
        }}
      >
        {movies.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              if (!isAnimating) {
                setIsAnimating(true);
                setCurrentIndex(index);
                setTimeout(() => setIsAnimating(false), 500);
              }
            }}
            style={{
              height: "8px",
              borderRadius: "9999px",
              transition: "all 0.3s",
              backgroundColor:
                index === currentIndex ? "white" : "#6b7280",
              width: index === currentIndex ? "24px" : "8px",
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default MovieCarousel;
