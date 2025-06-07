import { FaFilm } from "react-icons/fa";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="bg-[#1A4158] text-white shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3">
        {/* Logo */}
        <Link to="/">
          <div className="flex items-center space-x-2">
            <FaFilm className="text-white text-2xl" />
            <span className="text-xl font-bold tracking-wide">CineSwift</span>
          </div>
        </Link>

        {/* Nav Links */}
        <nav className="hidden md:flex space-x-6 font-medium">
          <a href="#" className="hover:text-yellow-300 transition">
            Movies
          </a>
          <a href="#" className="hover:text-yellow-300 transition">
            Bookings
          </a>
          <a href="#" className="hover:text-yellow-300 transition">
            About
          </a>
        </nav>

        {/* Auth Links */}
        <div className="flex space-x-3">
          <Link to="/login">
            <button className="bg-white text-[#1A4158] px-4 py-1 rounded hover:bg-gray-200 transition font-medium">
              Login
            </button>
          </Link>
          <Link to="/signup">
            <button className="bg-yellow-400 text-[#1A4158] px-4 py-1 rounded hover:bg-yellow-500 transition font-medium">
              Signup
            </button>
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Header;
