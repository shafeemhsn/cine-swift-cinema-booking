import { Router, Request, Response, NextFunction } from "express";
import { signup } from "./auth.service";

const router = Router();

router.post(
  "/signup",
  async (req: Request, res: Response, next: NextFunction) => {
    console.log("POST auth/signup called");

    try {
      const user = await signup({ ...req.body });
      res.status(201).json(user);
    } catch (error: any) {
      console.error(`Signup error: ${error.message}`);
      next(error);
    }
  }
);

// router.post(
//   "/login",
//   async (req: Request, res: Response, next: NextFunction) => {
//     console.log("POST auth/login called");

//     try {
//       const result = await login(req.body);
//       res.status(200).json(result);
//     } catch (error: any) {
//       console.error(`Login error: ${error.message}`);
//       next(error);
//     }
//   }
// );

export { router as authController };
