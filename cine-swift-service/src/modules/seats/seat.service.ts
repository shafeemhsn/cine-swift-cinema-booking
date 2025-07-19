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

export const getAllSeats = async () => {
  const configData = await getAllSeatConfig();
  const seats: ISeat[] = generateInitialSeats();

  seats.forEach((seat) => {
    const config = configData.find((c) => c.seatId === seat.seatId);
    if (config) {
      if (config.status !== null) seat.status = config.status;
      if (config.type !== null) seat.type = config.type;
      if (config.noChildren !== null) seat.noChildren = config.noChildren;
    }
  });

  return seats;
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
