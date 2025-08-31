import { Link, useLocation } from "react-router-dom";
import homeIcon from "../assets/home.png";
import favoriteIcon from "../assets/favorite.png";
import searchIcon from "../assets/search.png";

const Header = ({ searchQuery, setSearchQuery }) => {
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 10,
        backgroundColor: "#1f2937", // gray-800
        boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "16px",
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "16px",
        }}
      >
        {/* Logo */}
        <Link
          to="/"
          style={{
            fontSize: "24px",
            fontWeight: "bold",
            color: "#60a5fa", 
            display: "flex",
            alignItems: "center",
            textDecoration: "none",
          }}
        >
          FilmHub
        </Link>

        {/* Search Bar */}
        {isHomePage && (
          <div style={{ position: "relative", width: "100%", maxWidth: "400px" }}>
            <input
              type="text"
              placeholder="Search movies..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: "100%",
                backgroundColor: "#374151", // gray-700
                color: "white",
                padding: "8px 8px 8px 36px",
                borderRadius: "8px",
                border: "none",
                outline: "none",
                fontSize: "14px",
              }}
            />
            <img
              src={searchIcon}
              alt="Search"
              style={{
                position: "absolute",
                left: "10px",
                top: "50%",
                transform: "translateY(-50%)",
                height: "20px",
                width: "20px",
                opacity: 0.7,
              }}
            />
          </div>
        )}

        {/* Navigation */}
        <nav style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <Link
            to="/"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              padding: "6px 12px",
              borderRadius: "6px",
              textDecoration: "none",
              color: "white",
            }}
            onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#374151")}
            onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
          >
            <img src={homeIcon} alt="Home" style={{ height: "20px", width: "20px" }} />
            <span>Home</span>
          </Link>

          <Link
            to="/favorites"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              padding: "6px 12px",
              borderRadius: "6px",
              textDecoration: "none",
              color: "white",
            }}
            onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#374151")}
            onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
          >
            <img src={favoriteIcon} alt="Favorites" style={{ height: "20px", width: "20px" }} />
            <span>Favorites</span>
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
