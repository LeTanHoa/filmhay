import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SearchOutlined } from "@ant-design/icons"; // Assuming you have an icon library installed
const Search = ({ className = "" }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchType, setSearchType] = useState("movie"); // 'movie' or 'actor'
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim() === "") return;

    if (searchType === "movie") {
      navigate(`/search?q=${searchQuery.trim()}`);
    } else {
      navigate(`/actor?name=${searchQuery.trim()}`);
    }
    setSearchQuery("");
  };

  return (
    <form onSubmit={handleSearch}  className={`flex  gap-2 ${className}`}>
      <div className="flex-1 flex gap-2">
        <select
          value={searchType}
          onChange={(e) => setSearchType(e.target.value)}
          className="p-2  bg-gray-700 text-white rounded-lg border border-gray-600 focus:outline-none focus:border-blue-500"
        >
          <option value="movie">Tìm phim</option>
          <option value="actor">Tìm diễn viên</option>
        </select>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={
            searchType === "movie"
              ? "Tìm kiếm phim..."
              : "Tìm kiếm diễn viên..."
          }
          className="flex-1 p-2  rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-blue-500"
        />
      </div>
      <button
        type="submit"
        className="w-full bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
      >
        <SearchOutlined />
      </button>
    </form>
  );
};

export default Search;
