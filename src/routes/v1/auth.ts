import { Router } from "express";
import controllers from "../../api/v1/auth";

const router = Router();

// user
router.post("/users/login", controllers.login);
router.post("/users/sign-up", controllers.signUp);
router.post("/users/verify-otp/:id", controllers.verifyOtp);

export { router as authRoutes };
