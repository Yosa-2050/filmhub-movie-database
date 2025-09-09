import searchIcon from "../assets/search.png";

const SearchBar = ({ value, onChange }) => {
  return (
    <div
      style={{
        marginBottom: "1rem",
        maxWidth: 520,
        position: "relative",
        marginLeft: "auto", // center horizontally
        marginRight: "auto", // center horizontally
      }}
    >
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
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search by title, genre, director, actors, or year…"
        aria-label="Search movies"
        style={{
          width: "100%",
          backgroundColor: "#374151", // gray-700
          color: "white",
          padding: "8px 8px 8px 36px", // space for the icon
          borderRadius: "8px",
          border: "none",
          outline: "none",
          fontSize: "14px",
        }}
      />
    </div>
  );
};

export default SearchBar;
