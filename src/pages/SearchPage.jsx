import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import MovieCard from '../components/MovieCard';
import { API_ENDPOINTS } from '../config/api';

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('q') || '';
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAndFilterMovies = async () => {
      setLoading(true);
      try {
        const response = await axios.get(API_ENDPOINTS.LATEST_MOVIES());
        const allMovies = response.data.movies;

        const filteredMovies = allMovies.filter(movie =>
          movie.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setMovies(filteredMovies);
      } catch (error) {
        console.error('Error fetching and filtering movies:', error);
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
    <div className="container mx-auto py-8 text-white">
      <h1 className="text-3xl font-bold mb-6">
        Kết quả tìm kiếm cho: "{searchQuery}"
      </h1>
      {loading ? (
        <p>Đang tải...</p>
      ) : movies.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
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