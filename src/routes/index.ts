import { Router } from "express";
import { authRoutes } from "./v1/auth";
import { userRoutes } from "./v1/user";
import { marathonRoutes } from "./v1/marathon";


const router = Router();

router.use("/auth/v1", authRoutes);
router.use("/user/v1", userRoutes);
router.use("/marathon/v1", marathonRoutes);

export default router;
