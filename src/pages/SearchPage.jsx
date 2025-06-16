import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import MovieCard from "../components/MovieCard";
import { API_ENDPOINTS } from "../config/api";
import { Spin } from "antd";

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("q") || "";
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAndFilterMovies = async () => {
      setLoading(true);
      try {
        const response = await axios.get(API_ENDPOINTS.LATEST_MOVIES());
        const allMovies = response.data.movies;

        const filteredMovies = allMovies.filter((movie) =>
          movie.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setMovies(filteredMovies);
      } catch (error) {
        console.error("Error fetching and filtering movies:", error);
      }
      setLoading(false);
    };

    if (searchQuery) {
      fetchAndFilterMovies();
    } else {
      setMovies([]);
      setLoading(false);
    }
  }, [searchQuery]);

  return (
    <div className="flex min-h-28 flex-col gap-3 text-white">
      <hr />
      <span className="text-xl block font-bold ">
        Kết quả tìm kiếm cho: "{searchQuery}"
      </span>
      {loading ? (
        <Spin
          className=" py-10"
          spinning={loading}
          tip="Đang tải phim..."
          size="large"
        />
      ) : movies.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {movies.map((movie) => (
            <div key={movie._id}>
              <MovieCard movie={movie} />
            </div>
          ))}
        </div>
      ) : (
        <p>Không tìm thấy phim nào phù hợp.</p>
      )}
    </div>
  );
};

export default SearchPage;
