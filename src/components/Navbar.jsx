import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { API_ENDPOINTS } from "../config/api";
import Search from "./Search";

const Navbar = () => {
  const [categories, setCategories] = useState([]);
  const [showCategoriesMenu, setShowCategoriesMenu] = useState(false);

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

  return (
    <nav className="bg-black p-4 fixed w-full z-10 top-0">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row  gap-5 justify-between items-center">
        <Link to="/" className="text-white text-3xl font-bold">
          CWB
        </Link>

        <div className="flex items-center space-x-4">
          <Search className="w-[400px]" />

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
