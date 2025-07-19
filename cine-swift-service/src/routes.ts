import { Router } from "express";
import { authController } from "./modules/auth/auth.controller";
import { seatController } from "./modules/seats/seat.controller";
// import { userController } from "./modules/users/user.controller";

const routes = Router()
  .use("/auth", authController)
  .use("/seats", seatController);

export default Router().use(routes);
