import { Router, Request, Response, NextFunction } from "express";
import { getAllBookings, newBooking } from "./booking.service";

const router = Router();

router.get(
  "/get-all-bookings",
  async (req: Request, res: Response, next: NextFunction) => {
    console.log("GET booking/get-all-bookings called");

    try {
      const seats = await getAllBookings();
      res.status(201).json(seats);
    } catch (error: any) {
      console.error(`get-all-bookings error: ${error.message}`);
      next(error);
    }
  }
);

router.post(
  "/create-booking",
  async (req: Request, res: Response, next: NextFunction) => {
    console.log("POST booking/create-booking called");

    try {
      const seats = await newBooking(req.body);
      res.status(201).json(seats);
    } catch (error: any) {
      console.error(`create-booking error: ${error.message}`);
      next(error);
    }
  }
);

export { router as bookingController };
