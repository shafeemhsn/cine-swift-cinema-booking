const MovieCard = ({ movie }) => {
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <img
        src={movie.poster}
        alt={movie.title}
        className="w-full h-[420px] object-cover" // Increased height
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold">{movie.title}</h3>
        <p className="text-sm text-gray-600">{movie.genre}</p>
        <p className="text-sm text-yellow-500 font-medium">⭐ {movie.rating}</p>
        <button className="mt-3 w-full bg-[#1A4158] text-white py-2 rounded hover:bg-[#25516A] transition">
          Book Now
        </button>
      </div>
    </div>
  );
};

export default MovieCard;
