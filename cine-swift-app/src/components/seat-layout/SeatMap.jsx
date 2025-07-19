export const SeatMap = ({ seats, selectedSeats, onSeatClick, userRole }) => {
  // Group seats by row
  const seatsByRow = {};
  seats.forEach((seat) => {
    if (!seatsByRow[seat.row]) seatsByRow[seat.row] = [];
    seatsByRow[seat.row].push(seat);
  });

  // Sort rows
  const sortedRows = Object.keys(seatsByRow).sort();

  return (
    <div className="flex flex-col items-center gap-2">
      {sortedRows.map((row) => (
        <div key={row} className="flex gap-1 items-center">
          <div className="w-8 text-white font-bold">{row}</div>
          <div className="flex gap-1">
            {seatsByRow[row]
              .sort((a, b) => a.column - b.column)
              .map((seat) => {
                let bgColor = "bg-gray-300"; // Available

                if (selectedSeats.includes(seat.seatId)) {
                  bgColor = "bg-blue-500"; // Selected
                } else if (seat.status === "booked") {
                  bgColor = "bg-red-500"; // Booked
                } else if (seat.status === "unavailable") {
                  bgColor = "bg-gray-500"; // Unavailable/broken
                } else if (seat.type === "vip" && seat.status === "available") {
                  bgColor = "bg-purple-500"; // VIP
                } else if (
                  seat.type === "accessible" &&
                  seat.status === "available"
                ) {
                  bgColor = "bg-green-500"; // Accessible
                } else if (seat.noChildren && seat.status === "available") {
                  bgColor = "bg-yellow-500"; // No children
                }

                return userRole === "customer" ? (
                  <button
                    key={seat.id}
                    className={`w-8 h-8 ${bgColor} rounded flex items-center justify-center text-xs font-medium ${
                      seat.status === "available"
                        ? "hover:opacity-80"
                        : userRole === "customer"
                        ? "cursor-not-allowed opacity-70"
                        : ""
                    }`}
                    onClick={() => {
                      if (seat.status === "available") onSeatClick(seat.seatId);
                    }}
                    disabled={seat.status !== "available"}
                    title={`${row}${seat.column} - ${seat.type} ${
                      seat.noChildren ? "(No Children)" : ""
                    }`}
                  >
                    {seat.column}
                  </button>
                ) : (
                  <button
                    key={seat.id}
                    className={`w-8 h-8 ${bgColor} rounded flex items-center justify-center text-xs font-medium hover:opacity-80`}
                    onClick={() => {
                      onSeatClick(seat.seatId);
                    }}
                    title={`${row}${seat.column} - ${seat.type} ${
                      seat.noChildren ? "(No Children)" : ""
                    }`}
                  >
                    {seat.column}
                  </button>
                );
              })}
          </div>
        </div>
      ))}
    </div>
  );
};
