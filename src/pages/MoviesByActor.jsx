import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import { API_ENDPOINTS } from "../config/api";
import MovieCard from "../components/MovieCard";
import Search from "../components/Search";
import { Spin } from "antd";

const MoviesByActor = () => {
  const [searchParams] = useSearchParams();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const actorName = searchParams.get("name") || "";
  console.log(searchParams);
  const fetchMoviesByActor = async (pageNum) => {
    try {
      const response = await axios.get(API_ENDPOINTS.LATEST_MOVIES(pageNum));
      const allMovies = response.data.movies || [];

      const filteredMovies = allMovies.filter((movie) =>
        (movie.actors || []).some((actor) =>
          actor.toLowerCase().includes(actorName.toLowerCase())
        )
      );

      setMovies(filteredMovies);
    } catch (error) {
      console.error("Lỗi khi tải phim:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (actorName) {
      setLoading(true);
      fetchMoviesByActor(page);
    }
  }, [actorName, page]);

  return (
    <div className="">
      {loading ? (
        <Spin
          className=" flex justify-center items-center"
          spinning={loading}
          tip="Đang tải phim..."
          size="large"
        />
      ) : actorName ? (
        <>
          {movies.length > 0 ? (
            <>
              <h2 className="text-xl font-semibold text-white mb-4">
                Kết quả tìm kiếm cho diễn viên: {actorName}
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {movies.map((movie) => (
                  <MovieCard key={movie._id} movie={movie} />
                ))}
              </div>
            </>
          ) : (
            <div className="text-center text-white">
              Không tìm thấy phim nào có diễn viên "{actorName}"
            </div>
          )}
        </>
      ) : (
        <div className="text-center text-white">
          Vui lòng nhập tên diễn viên để tìm kiếm
        </div>
      )}
    </div>
  );
};

export default MoviesByActor;
