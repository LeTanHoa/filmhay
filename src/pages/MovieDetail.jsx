import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import MovieCard from "../components/MovieCard";
import { API_ENDPOINTS } from "../config/api";
import VideoPlayer from "../components/VideoPlayer";

const MovieDetail = () => {
  const { slug } = useParams();
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

  if (loading) return <p className="text-white p-5">Loading...</p>;
  if (!movie) return <p className="text-white p-5">Movie not found</p>;

  return (
    <div className="max-w-6xl mx-auto py-8 text-white">
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
          <p>
            <strong>Thời lượng:</strong> {movie.time}
          </p>
          <p>
            <strong>Chất lượng:</strong> {movie.quality}
          </p>
          <p>
            <strong>Quốc gia:</strong> {movie.country?.name}
          </p>
          <p>
            <strong>Trạng thái:</strong> {movie.status}
          </p>

          <div>
            <p className="font-semibold mb-2">Thể loại:</p>
            <div className="flex flex-wrap gap-2">
              {movie.categories?.map((category) => (
                <span
                  key={category.id}
                  className="bg-gray-700 text-white px-3 py-1 rounded-full text-sm"
                >
                  {category.name}
                </span>
              ))}
            </div>
          </div>

          <div className="bg-gray-700 p-4 rounded-lg">
            <p className="text-justify">{movie.content}</p>
          </div>

          {/* Danh sách tập */}
          {movie.episodes && movie.episodes.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold mb-3">Danh sách tập:</h2>
              {movie.episodes.map((episode, index) => (
                <div key={index} className="mb-4">
                  <h3 className="text-lg font-medium mb-2">
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
        </div>
      </div>

      {/* Phim tương tự */}
      {movies.length > 0 && (
        <div className="mt-10">
          <h2 className="text-xl font-bold mb-4">Phim Tương Tự</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {movies.map((item) => (
              <MovieCard key={item.slug} movie={item} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieDetail;
