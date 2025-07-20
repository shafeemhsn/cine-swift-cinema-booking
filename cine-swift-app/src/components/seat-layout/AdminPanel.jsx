import { useState } from "react";

export const AdminPanel = ({ resetSeats, setSeats, selectedSeats }) => {
  // export const AdminPanel = ({ resetSeats, seats, setSeats, selectedSeats }) => {
  const [seatStatus, setSeatStatus] = useState("available");

  const updateSelectedSeats = () => {
    if (selectedSeats.length === 0) return;

    setSeats((prev) =>
      prev.map((seat) =>
        selectedSeats.includes(seat.seatId)
          ? { ...seat, status: seatStatus }
          : seat
      )
    );
  };

  // const markBrokenSeats = () => {
  //   // Mark 5 random seats as unavailable
  //   const availableSeats = seats.filter((seat) => seat.status === "available");
  //   const randomSeats = [];

  //   for (let i = 0; i < 5; i++) {
  //     if (availableSeats.length === 0) break;

  //     const randomIndex = Math.floor(Math.random() * availableSeats.length);
  //     randomSeats.push(availableSeats[randomIndex].seatId);
  //     availableSeats.splice(randomIndex, 1);
  //   }

  //   setSeats((prev) =>
  //     prev.map((seat) =>
  //       randomSeats.includes(seat.seatId)
  //         ? { ...seat, status: "unavailable" }
  //         : seat
  //     )
  //   );
  // };

  // const handleCancellation = () => {
  //   if (selectedSeats.length === 0) return;

  //   setSeats((prev) =>
  //     prev.map((seat) =>
  //       selectedSeats.includes(seat.seatId)
  //         ? { ...seat, status: "available" }
  //         : seat
  //     )
  //   );
  // };

  return (
    <div className="w-full md:w-1/4">
      <div className="bg-white p-4 rounded-lg shadow">
        <h2 className="text-xl font-bold mb-4">Admin Controls</h2>

        <div className="mb-4">
          <label className="block mb-2">Set Status for Selected Seats:</label>
          <select
            className="w-full p-2 border rounded mb-2"
            value={seatStatus}
            onChange={(e) => setSeatStatus(e.target.value)}
          >
            <option value="available">Available</option>
            <option value="booked">Booked</option>
            <option value="unavailable">Unavailable</option>
          </select>
          <button
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 mb-2"
            onClick={updateSelectedSeats}
          >
            Update Selected Seats
          </button>
        </div>

        {/* <div className="mb-4">
          <button
            className="w-full bg-yellow-500 text-white py-2 rounded hover:bg-yellow-600 mb-2"
            onClick={markBrokenSeats}
          >
            Mark 5 Random Seats as Broken
          </button>
        </div> */}

        {/* <div className="mb-4">
          <button
            className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 mb-2"
            onClick={handleCancellation}
          >
            Process Cancellation (Selected Seats)
          </button>
        </div> */}

        <button
          className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600"
          onClick={resetSeats}
        >
          Reset All Seats
        </button>
      </div>
    </div>
  );
};
