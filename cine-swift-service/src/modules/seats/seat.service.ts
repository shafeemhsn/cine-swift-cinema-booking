import HttpException from "../../util/http-exception.model";

import { ISeat } from "./seat.interface";
import { createSeatConfig, getAllSeatConfig } from "./seat.repository";

export const configureSeat = async (newData: ISeat) => {
  try {
    const result = await createSeatConfig(newData);
    if (!result) {
      throw new HttpException(500, {
        message: `Error in saving seat config: ${JSON.stringify(newData)}`,
        result: false,
      });
    }

    return result;
  } catch (error) {
    throw error;
  }
};

export const getSeatConfig = async () => {
  try {
    const result = await getAllSeatConfig();
    if (!result) {
      throw new HttpException(500, {
        message: `Error occurred when retrieving seat config`,
        result: false,
      });
    }

    return result;
  } catch (error) {
    throw error;
  }
};

export const generateInitialSeats = () => {
  const seats: ISeat[] = [];
  const rows = 10;
  const seatsPerRow = 16;

  // Create row labels (A-J)
  const rowLabels = Array.from({ length: rows }, (_, i) =>
    String.fromCharCode(65 + i)
  );

  // Generate seats for each row
  rowLabels.forEach((row) => {
    for (let col = 1; col <= seatsPerRow; col++) {
      const seatId = `${row}-${col}`;

      // Determine seat type
      let type = "standard";
      let noChildren = false;

      // VIP seats (middle rows, center seats)
      if ((row === "D" || row === "E") && col >= 5 && col <= 12) {
        type = "vip";
      }

      // Accessible seats (front row ends and back row ends)
      if (
        (row === "A" || row === "J") &&
        (col <= 2 || col >= seatsPerRow - 1)
      ) {
        type = "accessible";
      }

      // No children rows (back two rows)
      if (row === "I" || row === "J") {
        noChildren = true;
      }

      seats.push({
        seatId,
        row,
        column: col,
        status: "available",
        type,
        noChildren,
      });
    }
  });

  return seats;
};
