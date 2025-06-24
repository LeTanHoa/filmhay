import { useState, useEffect } from "react";
import axios from "axios";
import MovieCard from "../components/MovieCard";
import { API_ENDPOINTS } from "../config/api";
import { Pagination, Spin } from "antd";

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      try {
        const response = await axios.get(API_ENDPOINTS.LATEST_MOVIES(page));
        setMovies(response.data.movies);
        setTotalPages(response.data.page.total);
      } catch (error) {
        console.error("Error fetching movies:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [page]);

  const handlePageChange = (current) => {
    setPage(current);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [page]);

  return (
    <div className="flex min-h-28 flex-col gap-3 text-white">
      <span className="text-white text-xl font-bold">Phim Mới Cập Nhật</span>

      <Spin
        spinning={loading}
        className="py-10 "
        tip="Đang tải phim..."
        size="large"
      >
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {movies.map((movie) => (
            <div key={movie.id}>
              <MovieCard movie={movie} />
            </div>
          ))}
        </div>
      </Spin>

      {!loading && (
        <div className="flex justify-center mt-8">
          <Pagination
            current={page}
            pageSize={20}
            total={totalPages}
            onChange={handlePageChange}
            showSizeChanger={false}
          />
        </div>
      )}
    </div>
  );
};

export default Home;
