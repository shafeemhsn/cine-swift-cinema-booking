import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./pages/Root";
import MovieList from "./pages/MovieList";
import SeatLayout from "./components/seat-layout/SeatLayout";

import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <MovieList /> },

      { path: "seat-layout", element: <SeatLayout /> },
      { path: "login", element: <Login /> },
      { path: "signup", element: <Signup /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
