import { useState, useEffect, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import MovieCard from "../components/MovieCard";
import { API_ENDPOINTS } from "../config/api";
import VideoPlayer from "../components/VideoPlayer";
import { Helmet } from "react-helmet-async";
import { Spin } from "antd";
import { CaretLeftOutlined } from "@ant-design/icons";
const MovieDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [similarMovies, setSimilarMovies] = useState([]);
  const [selectedServer, setSelectedServer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]); // chứa phim tương tự
  // Fetch chi tiết phim
  useEffect(() => {
    const fetchMovieDetail = async () => {
      try {
        const response = await axios.get(API_ENDPOINTS.MOVIE_DETAIL(slug));
        const movieData = response.data.movie;

        setMovie(movieData);
        setSimilarMovies(response.data.related || []);
        setLoading(false);

        if (
          movieData.episodes?.length > 0 &&
          movieData.episodes[0].server_data.length > 0
        ) {
          const firstServer = movieData.episodes[0].server_data[0];
          setSelectedServer(firstServer);
        }
      } catch (error) {
        console.error("Error fetching movie detail:", error);
        setLoading(false);
      }
    };

    fetchMovieDetail();
  }, [slug]);

  // Fetch phim tương tự từ thể loại
  useEffect(() => {
    const fetchMoviesByAllCategories = async () => {
      if (!movie?.categories) return;

      try {
        const results = await Promise.all(
          movie.categories.map((category) =>
            axios
              .get(API_ENDPOINTS.CATEGORY_MOVIES(category.slug, 1))
              .then((res) => res.data.movies)
              .catch(() => [])
          )
        );

        const merged = results.flat().filter((item) => item.slug !== slug);

        // Loại bỏ phim trùng slug
        const uniqueMovies = Array.from(
          new Map(merged.map((item) => [item.slug, item])).values()
        );

        setMovies(uniqueMovies);
      } catch (error) {
        console.error("Error fetching similar movies:", error);
      }
    };

    fetchMoviesByAllCategories();
  }, [movie]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  const handleActorClick = (actorName) => {
    navigate(`/actor?name=${encodeURIComponent(actorName)}`);
  };

  const { code, title } = useMemo(() => {
    if (typeof movie?.name === "string") {
      const [code, ...titleParts] = movie.name.split("_");
      return {
        code,
        title: titleParts.join("_"),
      };
    }
    return { code: "", title: "" };
  }, [movie]);

  if (loading)
    return (
      <Spin
        className="py-10"
        spinning={loading}
        tip="Đang tải phim..."
        size="large"
      />
    );
  if (!movie) return <p className="text-white p-5">Không tìm thấy phim</p>;

  return (
    <>
      <Helmet>
        <title>{movie.name} - Xem phim HD</title>
        <meta name="description" content={movie.content.slice(0, 150)} />
        <meta property="og:title" content={movie.name} />
        <meta property="og:image" content={movie.thumb_url} />
        <meta property="og:description" content={movie.content.slice(0, 150)} />
        <meta property="og:type" content="video.movie" />
      </Helmet>
      <hr />
      <div className=" text-white">
        <div className="flex items-center">
          <h1 className="text-2xl font-bold ">
            <CaretLeftOutlined
              onClick={() => navigate("/")}
              className="text-2xl"
            />{" "}
            {title}
          </h1>
        </div>

        {/* Video Player */}
        {selectedServer && (
          <div className="mb-4">
            <VideoPlayer link={selectedServer?.link} />
          </div>
        )}

        {/* Info */}
        <div className="flex flex-col md:flex-row gap-5">
          <img
            src={movie.thumb_url}
            alt={movie.name}
            className="w-full h-full md:h-[300px] object-cover rounded-lg shadow-lg"
          />
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-5">
              <strong>Diễn viên:</strong>{" "}
              <div className="flex flex-wrap gap-2 ">
                {movie.actors?.map((actor, index) => (
                  <button
                    key={index}
                    onClick={() => handleActorClick(actor)}
                    className="bg-gray-700 hover:bg-blue-600 text-white px-3 py-1 rounded-full text-sm transition-colors"
                  >
                    {actor}
                  </button>
                ))}
              </div>
            </div>
            <span>
              <strong>Code:</strong> {code}
            </span>
            <span>
              <strong>Thời lượng:</strong> {movie.time}
            </span>
            <span>
              <strong>Chất lượng:</strong> {movie.quality}
            </span>

            <span>
              <strong>Quốc gia:</strong> {movie.country?.name}
            </span>

            <div>
              <span className="font-semibold block mb-2">Thể loại:</span>
              <div className="flex flex-wrap gap-2">
                {movie.categories?.map((category) => (
                  <span
                    key={category.id}
                    className="bg-gray-700 text-white px-3 py-1 cursor-pointer rounded-full text-sm"
                    onClick={() => navigate(`/category/${category.slug}`)}
                  >
                    {category.name}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-gray-700 p-2 rounded-lg">
              <span className="text-justify  block">{movie.content}</span>
            </div>

            {/* Danh sách tập */}
          </div>
        </div>

        {/* Phim tương tự */}
        {movies.length > 0 && (
          <div className="mt-10">
            <h2 className="text-xl font-bold mb-4">Phim Tương Tự</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {movies.slice(0, 12).map((item) => (
                <MovieCard key={item.slug} movie={item} />
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default MovieDetail;
