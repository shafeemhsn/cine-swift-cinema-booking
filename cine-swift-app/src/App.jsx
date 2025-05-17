import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./pages/Root";
import MovieList from "./pages/MovieList";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [{ index: true, element: <MovieList /> }],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
