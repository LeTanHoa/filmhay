import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { API_ENDPOINTS } from "../config/api";

const Navbar = () => {
  const [categories, setCategories] = useState([]);
  const [showCategoriesMenu, setShowCategoriesMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(API_ENDPOINTS.LATEST_MOVIES());
        const allCategories = response.data.movies.flatMap(
          (movie) => movie.categories || []
        );
        const uniqueCategories = Array.from(
          new Map(allCategories.map((cat) => [cat.id, cat])).values()
        );
        setCategories(uniqueCategories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    if (event.key === "Enter" && searchQuery.trim() !== "") {
      navigate(`/search?q=${searchQuery.trim()}`);
      setSearchQuery(""); // Clear search query after submission
    }
  };

  return (
    <nav className="bg-gray-800 p-4  fixed w-full z-10 top-0">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-3xl font-bold">
          CWB
        </Link>

        <div className="flex items-center space-x-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Tìm kiếm phim..."
              value={searchQuery}
              onChange={handleSearchChange}
              onKeyPress={handleSearchSubmit}
              className="bg-gray-700 w-[200px] text-white px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <span className="absolute inset-y-0 right-0 pr-3 flex items-center">
              {/* <SearchIcon className="text-gray-400" /> */}
            </span>
          </div>

          <div className="relative">
            {showCategoriesMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-gray-700 rounded-md shadow-lg py-1 z-20">
                {categories.map((category) => (
                  <Link
                    key={category.id}
                    to={`/category/${category.slug}`}
                    onClick={() => setShowCategoriesMenu(false)}
                    className="block px-4 py-2 text-white hover:bg-gray-600"
                  >
                    {category.name}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
