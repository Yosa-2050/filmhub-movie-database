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
  }, [movies, autoplaySpeed, isHovering, isAnimating])

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
      style={{
        marginBottom: "3rem",
        paddingTop: "2rem",
        position: "relative",
        background:
          "radial-gradient(1200px 400px at 50% -100px, rgba(96,165,250,0.15), rgba(0,0,0,0))",
        borderRadius: "16px",
      }}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Title + Controls */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "1.25rem",
          alignItems: "center",
          padding: "0 0.25rem",
        }}
      >
        <h2
          style={{
            fontSize: "1.5rem",
            fontWeight: 800,
            color: "white",
            letterSpacing: "0.2px",
            margin: 0,
          }}
        >
          Latest Releases
        </h2>

        <div style={{ display: "flex", gap: "10px" }}>
          <button
            onClick={goToPrevious}
            style={{
              width: "42px",
              height: "42px",
              borderRadius: "9999px",
              background:
                "linear-gradient(180deg, rgba(31,41,55,0.8), rgba(17,24,39,0.8))",
              border: "1px solid rgba(255,255,255,0.08)",
              backdropFilter: "blur(6px)",
              WebkitBackdropFilter: "blur(6px)",
              boxShadow: "0 6px 20px rgba(0,0,0,0.35)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              transition: "transform 0.2s ease, background 0.2s ease, box-shadow 0.2s ease",
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow = "0 10px 24px rgba(0,0,0,0.45)";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 6px 20px rgba(0,0,0,0.35)";
            }}
            disabled={isAnimating}
          >
            <img
              src={ChevronLeftImg}
              alt="Previous"
              style={{ height: "18px", width: "18px", opacity: 0.9 }}
            />
          </button>
          <button
            onClick={goToNext}
            style={{
              width: "42px",
              height: "42px",
              borderRadius: "9999px",
              background:
                "linear-gradient(180deg, rgba(31,41,55,0.8), rgba(17,24,39,0.8))",
              border: "1px solid rgba(255,255,255,0.08)",
              backdropFilter: "blur(6px)",
              WebkitBackdropFilter: "blur(6px)",
              boxShadow: "0 6px 20px rgba(0,0,0,0.35)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              transition: "transform 0.2s ease, background 0.2s ease, box-shadow 0.2s ease",
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow = "0 10px 24px rgba(0,0,0,0.45)";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 6px 20px rgba(0,0,0,0.35)";
            }}
            disabled={isAnimating}
          >
            <img
              src={ChevronRightImg}
              alt="Next"
              style={{ height: "18px", width: "18px", opacity: 0.9 }}
            />
          </button>
        </div>
      </div>

      {/* Carousel */}
      <div
        style={{
          position: "relative",
          height: "clamp(18rem, 50vh, 26rem)",
          overflow: "hidden",
          borderRadius: "16px",
        }}
      >
        <div style={{ position: "relative", height: "100%" }}>
          {[-2, -1, 0, 1, 2].map((offset) => {
            const movieIndex = getMovieIndex(currentIndex + offset);
            const movie = movies[movieIndex];
            const isCurrent = offset === 0;
            const isVisible = offset >= -2 && offset <= 2;

            let translateX = `${offset * 25}%`;
            let scale = isCurrent ? 1.16 : 0.98;
            let zIndex = isCurrent ? 20 : 10 - Math.abs(offset);
            let opacity = isCurrent ? 1 : 0.85;
            return (
              <div
                key={`${movie.imdbID}-${offset}`}
                style={{
                  position: "absolute",
                  top: 0,
                  width: "17rem",
                  height: "100%",
                  transform: `translateX(calc(50% + ${translateX})) scale(${scale})`,
                  left: "50%",
                  marginLeft: "-8.5rem",
                  zIndex,
                  opacity,
                  display: isVisible ? "block" : "none",
                  transition:
                    "transform 500ms cubic-bezier(0.22, 1, 0.36, 1), opacity 500ms ease, box-shadow 300ms ease",
                  filter: isCurrent ? "none" : "saturate(0.9)",
                }}
              >
                <Link
                  to={`/movie/${movie.imdbID}`}
                  style={{ display: "block", height: "100%", textDecoration: "none" }}
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
                      borderRadius: "14px",
                      overflow: "hidden",
                      height: "100%",
                      background:
                        "linear-gradient(180deg, rgba(31,41,55,0.9), rgba(17,24,39,0.95))",
                      boxShadow: isCurrent
                        ? "0 24px 48px rgba(0,0,0,0.55)"
                        : "0 12px 28px rgba(0,0,0,0.4)",
                      transform: "translateZ(0)",
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
                          transform: "scale(1.02)",
                          transition: "transform 400ms ease",
                        }}
                        onLoad={(e) => (e.currentTarget.style.transform = "scale(1)")}
                      />

                      {/* Soft vignette */}
                      <div
                        style={{
                          position: "absolute",
                          inset: 0,
                          background:
                            "linear-gradient(180deg, rgba(0,0,0,0.05), rgba(0,0,0,0.55) 85%)",
                          pointerEvents: "none",
                        }}
                      />
                      {/* Hover overlay */}
                      <div
                        style={{
                          position: "absolute",
                          inset: 0,
                          background:
                            "linear-gradient(to top, rgba(0,0,0,0.85), rgba(0,0,0,0.25))",
                          opacity: 0,
                          transition: "opacity 250ms ease",
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.opacity = 1)}
                        onMouseLeave={(e) => (e.currentTarget.style.opacity = 0)}
                      >
                        <div
                          style={{
                            position: "absolute",
                            bottom: 12,
                            left: 0,
                            width: "100%",
                            display: "flex",
                            justifyContent: "center",
                          }}
                        >
                          <button
                            style={{
                              background:
                                "radial-gradient(circle at 30% 30%, #ef4444, #dc2626)",
                              color: "white",
                              border: "1px solid rgba(255,255,255,0.1)",
                              boxShadow: "0 12px 24px rgba(220,38,38,0.35)",
                              borderRadius: "9999px",
                              width: "56px",
                              height: "56px",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              cursor: "pointer",
                              transition: "transform 180ms ease, box-shadow 180ms ease",
                            }}
                            onMouseOver={(e) => {
                              e.currentTarget.style.transform = "scale(1.05)";
                              e.currentTarget.style.boxShadow =
                                "0 16px 28px rgba(220,38,38,0.45)";
                            }}
                            onMouseOut={(e) => {
                              e.currentTarget.style.transform = "scale(1)";
                              e.currentTarget.style.boxShadow =
                                "0 12px 24px rgba(220,38,38,0.35)";
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
                    <div
                      style={{
                        padding: "0.75rem 0.9rem",
                        height: "17%",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        gap: "6px",
                      }}
                    >
                      <h3
                        style={{
                          fontSize: "1rem",
                          fontWeight: isCurrent ? 800 : 600,
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          color: "white",
                          margin: 0,
                          letterSpacing: "0.2px",
                        }}
                      >
                        {movie.Title}
                      </h3>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
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
                              marginRight: "6px",
                              filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.35))",
                            }}
                          />
                          <span style={{ fontSize: "0.95rem", color: "white" }}>
                            {movie.imdbRating && movie.imdbRating !== "N/A" ? movie.imdbRating : "N/A"}
                          </span>
                        </div>

                        <span
                          style={{
                            fontSize: "0.8rem",
                            color: "rgba(229,231,235,0.8)",
                            letterSpacing: "0.3px",
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
          marginTop: "1.25rem",
          gap: "10px",
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
              height: "9px",
              borderRadius: "9999px",
              transition: "all 220ms ease",
              backgroundColor: index === currentIndex ? "white" : "rgba(156,163,175,0.45)",
              width: index === currentIndex ? "26px" : "9px",
              boxShadow:
                index === currentIndex
                  ? "0 8px 18px rgba(255,255,255,0.25)"
                  : "0 4px 10px rgba(0,0,0,0.25)",
              border: "1px solid rgba(255,255,255,0.08)",
              cursor: "pointer",
            }}
            onMouseOver={(e) => (e.currentTarget.style.transform = "translateY(-1px)")}
            onMouseOut={(e) => (e.currentTarget.style.transform = "translateY(0)")}
          />
        ))}
      </div>
    </div>
  );
};

export default MovieCarousel;
