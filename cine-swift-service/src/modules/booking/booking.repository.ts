import { AppDataSource } from "../../config/postgres-db";
import { Bookings } from "./booking.entity";
import { IBooking } from "./booking.interface";

const bookingRepo = AppDataSource.getRepository(Bookings);

export const createBooking = async (
  createBooking: IBooking
): Promise<Bookings> => {
  try {
    console.info(`Creating Booking: ${createBooking.seatId}`);
    const data = new Bookings(createBooking);

    return await bookingRepo.save(data);
  } catch (error: any) {
    console.error(
      `Error creating SeatConfig: ${createBooking.seatId}, error: ${error.message}`
    );
    throw error;
  }
};

export const findAllBooking = async (): Promise<Bookings[]> => {
  try {
    return await bookingRepo.find({
      where: {
        cinemaId: "C001",
      },
    });
  } catch (error: any) {
    console.error(`Error retrieving findAllBooking, error: ${error.message}`);
    throw error;
  }
};
