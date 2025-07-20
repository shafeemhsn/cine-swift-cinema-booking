import { Router } from "express";
import { authController } from "./modules/auth/auth.controller";
import { seatController } from "./modules/seats/seat.controller";
import { bookingController } from "./modules/booking/booking.controller";
// import { userController } from "./modules/users/user.controller";

const routes = Router()
  .use("/auth", authController)
  .use("/seats", seatController)
  .use("/booking", bookingController);

export default Router().use(routes);
