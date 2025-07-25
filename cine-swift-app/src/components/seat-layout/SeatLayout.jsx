import { useState, useEffect } from "react";

import { useAuth } from "../../contexts/authContext";
import { SeatMap } from "./SeatMap";
import { BookingForm } from "./BookingForm";
import { AdminPanel } from "./AdminPanel";
import { SeatLegend } from "./SeatLegend,";
import { getSeats } from "../../utils/api/seats/seat.service";
import { createBooking } from "../../utils/api/booking/booking.service";

function SeatLayout() {
  const { user } = useAuth();
  const userRole = user?.role;

  const [seats, setSeats] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);
  // const [userRole, setUserRole] = useState("customer");
  const [groupSize, setGroupSize] = useState(0);
  const [ageRestriction, setAgeRestriction] = useState(false);
  const [seniorFlexible, setSeniorFlexible] = useState(false);
  const [isVip, setVip] = useState(false);
  const [showBookingModal, setShowBookingModal] = useState(true);

  const fetchSeats = async () => {
    const seatData = await getSeats();
    setSeats(seatData);
  };

  useEffect(() => {
    fetchSeats();
  }, []);

  useEffect(() => {
    setShowBookingModal(true);
  }, []);

  useEffect(() => {
    setSelectedSeats([]);
  }, [groupSize, ageRestriction]);

  useEffect(() => {
    setGroupSize(0);
  }, [isVip]);

  const toggleSeatSelection = (seatId) => {
    const selectedSeat = seats.find((seat) => seat.seatId === seatId);

    if (userRole === "admin") {
      adminSelection(selectedSeat);
    }

    if (isVip) {
      vipSelection(selectedSeat);
    }

    if (ageRestriction) {
      selectedSeat.noChildren &&
        alert(`Children not allowed in this seating area`);
    }

    if (groupSize === 1) {
      // If user clicks the same seat again, deselect it
      if (selectedSeats.includes(seatId)) {
        setSelectedSeats([]); // clear selection
        return;
      }

      // Senior flexible seating override
      if (seniorFlexible) {
        setSelectedSeats([selectedSeat.seatId]);
        return;
      }

      const isValidSelection = isScatterSeat(
        seats,
        selectedSeat,
        ageRestriction
      );

      if (isValidSelection.length === 1) {
        // Clear previous selection and add the new seat
        setSelectedSeats([isValidSelection[0].seatId]);
      }
    }

    if (groupSize > 1) {
      const remainingGroupSize = groupSize - selectedSeats.length;
      const autoSelectedSeats = findNextConsecutiveSeatsFromSelected(
        seats,
        selectedSeat,
        remainingGroupSize,
        ageRestriction
      );
      if (groupSize === selectedSeats.length) {
        // Clear previous selection and add the new seat if the group size has reached the limit
        setSelectedSeats([...autoSelectedSeats.map((seat) => seat.seatId)]);
      } else {
        setSelectedSeats((prev) => [
          ...prev,
          ...autoSelectedSeats.map((seat) => seat.seatId),
        ]);
      }
    }
  };

  const adminSelection = (selectedSeat) => {
    setSelectedSeats((prev) => [...prev, selectedSeat.seatId]);
    return;
  };

  const vipSelection = (selectedSeat) => {
    setSelectedSeats((prev) => [...prev, selectedSeat.seatId]);
    return;
  };

  const isScatterSeat = (allSeats, selectedSeat, noChildren) => {
    if (selectedSeat.type === "accessible") {
      alert(`Reserved for disable`);
      return [];
    }

    if (selectedSeat.type == "vip") {
      alert(`Please select the VIP option`);
      return [];
    }

    const targetRow = selectedSeat.row;

    const rowSeats = allSeats
      .filter(
        (seat) =>
          seat.row === targetRow &&
          (!noChildren || !seat.noChildren) &&
          seat.type !== "accessible" &&
          seat.type !== "vip"
      )
      .sort((a, b) => a.column - b.column);

    const selectedIndex = rowSeats.findIndex(
      (seat) => seat.seatId === selectedSeat.seatId
    );
    const firstSeat = rowSeats[0];
    const lastSeat = rowSeats[rowSeats.length - 1];

    const prevSeat = rowSeats[selectedIndex - 1];
    const nextSeat = rowSeats[selectedIndex + 1];

    const prevUnavailable = !prevSeat || prevSeat.status !== "available";
    const nextUnavailable = !nextSeat || nextSeat.status !== "available";

    if (selectedSeat.status === "available") {
      // Case 1: If the selected seat is the first or last seat in the row, allow it
      if (
        selectedSeat.seatId === firstSeat.seatId ||
        selectedSeat.seatId === lastSeat.seatId
      ) {
        return [selectedSeat];

        // Case 2: If the seat is isolated (previous or next seat is not available), allow it
      } else if (prevUnavailable || nextUnavailable) {
        return [selectedSeat];
      } else {
        alert(`Scatter seat not allowed`);
        return [];
      }
    } else {
      alert(`This seat is unavailable`);
    }
  };

  const findNextConsecutiveSeatsFromSelected = (
    allSeats,
    selectedSeat,
    size,
    noChildren
  ) => {
    if (size === 0) return [];

    if (!selectedSeat || selectedSeat.status !== "available") return [];

    const targetRow = selectedSeat.row;

    // Filter and sort available seats in the same row
    const rowSeats = allSeats
      .filter(
        (seat) =>
          seat.row === targetRow &&
          seat.status === "available" &&
          seat.type !== "vip" &&
          (!noChildren || !seat.noChildren)
      )
      .sort((a, b) => a.column - b.column);

    // Find index of selected seat in sorted row
    const startIndex = rowSeats.findIndex(
      (s) => s.seatId === selectedSeat.seatId
    );
    if (startIndex === -1) return [];

    const result = [rowSeats[startIndex]];

    // Try to get next consecutive seats from that point
    for (let i = startIndex + 1; i < rowSeats.length; i++) {
      const lastSeat = result[result.length - 1];
      const nextSeat = rowSeats[i];

      if (nextSeat.column === lastSeat.column + 1) {
        result.push(nextSeat);
        if (result.length === size) break; // Stop if we reached desired size
      } else {
        break; // Stop if break in sequence
      }
    }

    return result;
  };

  const confirmBooking = async () => {
    if (selectedSeats.length === 0) return;

    for (const seatId of selectedSeats) {
      const bookingData = {
        bookingId: `B${Date.now()}`,
        userId: "shafeem",
        showtimeId: "25062516",
        cinemaId: "C001",
        seatId,
        totalAmount: 4500,
        status: "booked",
      };

      try {
        await createBooking(bookingData);
      } catch (err) {
        console.error("Booking failed for seat:", seatId, err);
      }
    }

    setSelectedSeats([]);
    await fetchSeats();
  };

  const resetSeats = async () => {
    const data = await getSeats();
    setSeats(data);
    setSelectedSeats([]);
  };

  return (
    <div className="container mx-auto p-4">
      {showBookingModal && userRole !== "admin" && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center">
          <div className="bg-white/90 rounded-lg shadow-2xl backdrop-blur-md w-full max-w-md p-6 border border-gray-300">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Book Seats</h2>
            </div>
            <BookingForm
              groupSize={groupSize}
              setGroupSize={setGroupSize}
              ageRestriction={ageRestriction}
              setAgeRestriction={setAgeRestriction}
              seniorFlexible={seniorFlexible}
              setSeniorFlexible={setSeniorFlexible}
              isVip={isVip}
              setVip={setVip}
              setShowBookingModal={setShowBookingModal}
            />
          </div>
        </div>
      )}

      <div className="flex flex-col md:flex-row gap-6">
        <div
          className={`w-full ${
            userRole === "admin" ? "md:w-3/4" : "md:w-full"
          }`}
        >
          <div className="bg-gray-900 p-4 rounded-lg mb-4">
            <div className="w-full bg-gray-800 h-10 mb-8 rounded flex items-center justify-center text-white">
              Screen
            </div>
            <SeatMap
              seats={seats}
              selectedSeats={selectedSeats}
              onSeatClick={toggleSeatSelection}
              userRole={userRole}
            />
          </div>

          <SeatLegend />

          <div className="mt-4 flex flex-col items-center space-y-2">
            {/* Selected Seats Display */}
            <p className="text-gray-700 font-medium">
              Selected Seats:{" "}
              {selectedSeats.length > 0
                ? selectedSeats
                    .map((seatId) => {
                      const [row, col] = seatId.split("-");
                      return `${row}${col}`;
                    })
                    .join(", ")
                : "None"}
            </p>

            {/* Confirm Button */}
            {userRole !== "admin" && (
              <button
                className={`px-6 py-2 rounded font-semibold ${
                  selectedSeats.length > 0
                    ? "bg-blue-500 text-white hover:bg-blue-600"
                    : "bg-gray-300 cursor-not-allowed text-gray-500"
                }`}
                onClick={confirmBooking}
                disabled={selectedSeats.length === 0}
              >
                Confirm Booking
              </button>
            )}
          </div>
        </div>

        {userRole === "admin" && (
          <AdminPanel
            resetSeats={resetSeats}
            // seats={seats}
            setSeats={setSeats}
            selectedSeats={selectedSeats}
          />
        )}
      </div>
    </div>
  );
}

export default SeatLayout;
