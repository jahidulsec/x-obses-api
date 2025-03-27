import { Router } from "express";
import { authRoutes } from "./v1/auth";
import { userRoutes } from "./v1/user";
import { marathonRoutes } from "./v1/marathon";
import { otherRoutes } from "./v1/other";
import { adminRoutes } from "./v1/admin";
import { verifyToken } from "../middlewares/verify-token";
import { verifyRoles } from "../middlewares/verify-roles";

const router = Router();

router.use("/auth/v1", authRoutes);
router.use("/user/v1", userRoutes);
router.use("/marathon/v1", marathonRoutes);
router.use("/other/v1", otherRoutes);
router.use("/admin/v1", verifyToken, adminRoutes);

export default router;
