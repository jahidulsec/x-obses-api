import { Router } from "express";
import controllers from "../../api/v1/auth";

const router = Router();

// user
router.post("/users/login", controllers.login);
router.post("/users/sign-up", controllers.signUp);
router.post("/users/verify-otp/:id", controllers.verifyOtp);

// admin
router.post("/admins/login", controllers.loginAdmin);

// token
router.post("/token/admin", controllers.revokeAdminAccessToken);
router.post("/token/user", controllers.revokeUserAccessToken);

export { router as authRoutes };
