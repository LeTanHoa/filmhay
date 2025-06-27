import { useNavigate } from "react-router-dom";

const MovieCard = ({ movie }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    if (movie.slug) {
      navigate(`/movie/${movie.slug}`);
    }
  };
  const [code, ...titleParts] = movie.name.split("_");
  const title = titleParts.join("_");
  return (
    <div
      className="bg-gray-700  border border-gray-600  rounded-lg shadow-lg overflow-hidden cursor-pointer h-full flex flex-col"
      onClick={handleClick}
    >
      <div className="relative">
        <img
          src={movie.thumb_url}
          //      src='https://example.com/default-movie-image.jpg' // Placeholder image
          alt={movie.name}
          className="w-full   h-[180px] object-cover"
        />
      </div>
      <div className="p-2 flex-grow gap-2 flex flex-col justify-between">
        <span className="text-[14px] font-semibold text-white  line-clamp-2">
          {title || movie.name}
        </span>

        {/* Optionally add more movie info here */}
      </div>
    </div>
  );
};

export default MovieCard;
