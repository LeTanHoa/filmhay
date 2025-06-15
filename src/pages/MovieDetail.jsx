import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import MovieCard from "../components/MovieCard";
import { API_ENDPOINTS } from "../config/api";
import VideoPlayer from "../components/VideoPlayer";
import { Helmet } from "react-helmet-async";
import { Spin } from "antd";

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
      <div className=" text-white">
        <h1 className="text-2xl font-bold mb-6">{movie.name}</h1>

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
          <div className="flex flex-col gap-4">
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
            <p>
              <strong>Thời lượng:</strong> {movie.time}
            </p>
            <p>
              <strong>Chất lượng:</strong> {movie.quality}
            </p>
            {movie.episodes && movie.episodes.length > 0 && (
              <div className="flex flex-col md:flex-row items-start md:items-center gap-2">
                <span>
                  <strong className="">Danh sách tập:</strong>
                </span>
                {movie.episodes.map((episode, index) => (
                  <div key={index} className=" flex items-center gap-2">
                    <h3 className="text-lg font-medium">
                      {episode.server_name}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {episode.server_data.map((server, serverIndex) => (
                        <button
                          key={serverIndex}
                          onClick={() => setSelectedServer(server)}
                          className={`px-4 py-2 rounded-md ${
                            selectedServer?.name === server.name
                              ? "bg-blue-600 text-white"
                              : "bg-gray-600 text-gray-200"
                          } hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500`}
                        >
                          {server.name}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
            <p>
              <strong>Quốc gia:</strong> {movie.country?.name}
            </p>

            <div>
              <p className="font-semibold mb-2">Thể loại:</p>
              <div className="flex flex-wrap gap-2">
                {movie.categories?.map((category) => (
                  <span
                    key={category.id}
                    className="bg-gray-700 text-white px-3 py-1 rounded-full text-sm"
                    onClick={() => navigate(`/category/${category.slug}`)}
                  >
                    {category.name}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-gray-700 p-2 rounded-lg">
              <p className="text-justify">{movie.content}</p>
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
