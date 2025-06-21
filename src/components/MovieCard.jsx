import { useNavigate } from "react-router-dom";

const MovieCard = ({ movie }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (movie.slug) {
      navigate(`/movie/${movie.slug}`);
    }
  };

  return (
    <div
      className="bg-gray-700 border border-gray-600  rounded-lg shadow-lg overflow-hidden cursor-pointer h-full flex flex-col"
      onClick={handleClick}
    >
      <img
        src={movie.thumb_url}
        //      src='https://example.com/default-movie-image.jpg' // Placeholder image
        alt={movie.name}
        className="w-full h-[180px] object-cover"
      />
      <div className="p-3 flex-grow flex flex-col justify-between">
        <h3 className="text-[14px] font-semibold text-white  line-clamp-2">
          {movie.name}
        </h3>

        {/* Optionally add more movie info here */}
      </div>
    </div>
  );
};

export default MovieCard;
