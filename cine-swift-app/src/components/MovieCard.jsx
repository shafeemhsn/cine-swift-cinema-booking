import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/authContext";
import { toast } from "react-toastify";

const MovieCard = ({ movie }) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleBooking = () => {
    if (!user) {
      toast.info("Please log in to book seats.");
      navigate("/login");
      return;
    }
    navigate("/seat-layout");
  };

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <img
        src={movie.poster}
        alt={movie.title}
        className="w-full h-[420px] object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold">{movie.title}</h3>
        <p className="text-sm text-gray-600">{movie.genre}</p>
        <p className="text-sm text-yellow-500 font-medium">⭐ {movie.rating}</p>

        <button
          onClick={handleBooking}
          className="mt-3 w-full bg-[#1A4158] text-white py-2 rounded hover:bg-[#25516A] transition"
        >
          Book Seats
        </button>
      </div>
    </div>
  );
};

export default MovieCard;
