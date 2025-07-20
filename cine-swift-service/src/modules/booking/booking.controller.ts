import { Router, Request, Response, NextFunction } from "express";
import { newBooking } from "./booking.service";

const router = Router();

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
