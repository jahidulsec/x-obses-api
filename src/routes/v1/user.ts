import { Router } from "express";
import controllers from "../../api/v1/user";
import { verifyToken } from "../../middlewares/verify-token";

const router = Router();

// user
router.route("/profile")
.get(verifyToken, controllers.getUserByToken)
.patch(verifyToken, controllers.updateUserByToken)
.delete(verifyToken, controllers.deleteUserByToken)

router.route("/profile/:id").get().patch().delete();

export { router as userRoutes };
