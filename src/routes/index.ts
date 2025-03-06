import { Router } from "express";
import { authRoutes } from "./v1/auth";
import { userRoutes } from "./v1/user";


const router = Router();

router.use("/auth/v1", authRoutes);
router.use("/user/v1", userRoutes);

export default router;
