import { Router, Request, Response, NextFunction } from "express";
import { configureSeat, getAllSeats } from "./seat.service";

const router = Router();

router.get(
  "/get-seats",
  async (req: Request, res: Response, next: NextFunction) => {
    console.log("GET seats/get-seats called");

    try {
      const seats = await getAllSeats();
      res.status(201).json(seats);
    } catch (error: any) {
      console.error(`get-seats error: ${error.message}`);
      next(error);
    }
  }
);

router.post(
  "/configure-seats",
  async (req: Request, res: Response, next: NextFunction) => {
    console.log("POST seats/configure-seats called");

    try {
      const seats = await configureSeat(req.body);
      res.status(201).json(seats);
    } catch (error: any) {
      console.error(`get-seats error: ${error.message}`);
      next(error);
    }
  }
);

export { router as seatController };
