import { FaFilm } from "react-icons/fa";

function Header() {
  return (
    <header className="bg-[#1A4158] text-white shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <FaFilm className="text-white text-2xl" />
          <span className="text-xl font-bold tracking-wide">CineSwift</span>
        </div>

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

        {/* Buttons */}
        <div className="flex space-x-3">
          <button className="bg-white text-[#1A4158] px-4 py-1 rounded hover:bg-gray-200 transition font-medium">
            Sign In
          </button>
          <button className="bg-yellow-400 text-[#1A4158] px-4 py-1 rounded hover:bg-yellow-500 transition font-medium">
            Join Now
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
