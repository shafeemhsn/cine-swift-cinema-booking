import MovieCard from "../components/MovieCard";

const movies = [
  {
    id: 1,
    title: "Inception",
    genre: "Sci-Fi",
    rating: "8.8",
    slug: "inception",
    poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_FMjpg_UX1000_.jpg",
  },
  {
    id: 2,
    title: "Avengers: Endgame",
    genre: "Action",
    rating: "8.4",
    slug: "avengers-endgame",
    poster: "https://m.media-amazon.com/images/I/81zN3O6SiCL.jpg",
  },
  {
    id: 3,
    title: "Interstellar",
    genre: "Adventure",
    rating: "8.6",
    slug: "interstellar",
    poster:
      "https://resizing.flixster.com/-XZAfHZM39UwaGJIFWKAE8fS0ak=/v3/t/assets/p10543523_p_v8_as.jpg",
  },
  {
    id: 4,
    title: "The Dark Knight",
    genre: "Action",
    rating: "9.0",
    slug: "the-dark-knight",
    poster:
      "https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_FMjpg_UX1000_.jpg",
  },
  {
    id: 5,
    title: "The Matrix",
    genre: "Sci-Fi",
    rating: "8.7",
    slug: "the-matrix",
    poster: "https://m.media-amazon.com/images/I/51EG732BV3L.jpg",
  },
  {
    id: 6,
    title: "Joker",
    genre: "Drama",
    rating: "8.4",
    slug: "joker",
    poster:
      "https://m.media-amazon.com/images/M/MV5BNzY3OWQ5NDktNWQ2OC00ZjdlLThkMmItMDhhNDk3NTFiZGU4XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
  },
  {
    id: 7,
    title: "Spider-Man: No Way Home",
    genre: "Action",
    rating: "8.2",
    slug: "spider-man-no-way-home",
    poster:
      "https://upload.wikimedia.org/wikipedia/en/thumb/7/70/Spider-Man_No_Way_Home_%E2%80%93_The_More_Fun_Stuff_Version_poster.jpeg/250px-Spider-Man_No_Way_Home_%E2%80%93_The_More_Fun_Stuff_Version_poster.jpeg",
  },
  {
    id: 8,
    title: "Titanic",
    genre: "Romance",
    rating: "7.9",
    slug: "titanic",
    poster: "https://m.media-amazon.com/images/I/811lT7khIrL.jpg",
  },
  {
    id: 9,
    title: "Frozen II",
    genre: "Animation",
    rating: "6.8",
    slug: "frozen-ii",
    poster:
      "https://lumiere-a.akamaihd.net/v1/images/p_frozen2_19644_4c4b423d.jpeg",
  },
  {
    id: 10,
    title: "Black Panther",
    genre: "Action",
    rating: "7.3",
    slug: "black-panther",
    poster:
      "https://upload.wikimedia.org/wikipedia/en/d/d6/Black_Panther_%28film%29_poster.jpg",
  },
  {
    id: 11,
    title: "Dune",
    genre: "Sci-Fi",
    rating: "8.0",
    slug: "dune",
    poster:
      "https://upload.wikimedia.org/wikipedia/en/thumb/8/8e/Dune_%282021_film%29.jpg/250px-Dune_%282021_film%29.jpg",
  },
  {
    id: 12,
    title: "Top Gun: Maverick",
    genre: "Action",
    rating: "8.3",
    slug: "top-gun-maverick",
    poster:
      "https://upload.wikimedia.org/wikipedia/en/thumb/1/13/Top_Gun_Maverick_Poster.jpg/250px-Top_Gun_Maverick_Poster.jpg",
  },
];

const MovieList = () => {
  return (
    <section className="bg-gray-100 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Now Showing</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default MovieList;
