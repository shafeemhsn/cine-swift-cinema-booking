import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./pages/Root";
import MovieList from "./pages/MovieList";
import SeatLayout from "./components/seat-layout/SeatLayout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <MovieList /> },

      { path: "seat-layout", element: <SeatLayout /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
