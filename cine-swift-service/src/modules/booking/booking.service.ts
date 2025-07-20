import HttpException from "../../util/http-exception.model";
import { IBooking } from "./booking.interface";
import { createBooking, findAllBooking } from "./booking.repository";

export const newBooking = async (newData: IBooking) => {
  try {
    const result = await createBooking(newData);
    if (!result) {
      throw new HttpException(500, {
        message: `Error in saving new booking: ${JSON.stringify(newData)}`,
        result: false,
      });
    }

    return result;
  } catch (error) {
    throw error;
  }
};

export const getAllBookings = async () => {
  try {
    const result = await findAllBooking();
    if (!result) {
      throw new HttpException(500, {
        message: `Error in findAllBooking}`,
        result: false,
      });
    }

    return result;
  } catch (error) {
    throw error;
  }
};
