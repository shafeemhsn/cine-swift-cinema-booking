import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./pages/Root";
import MovieList from "./pages/MovieList";
import Cinema from "./components/seating-v2/Cinema";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <MovieList /> },

      { path: "cinema", element: <Cinema /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
