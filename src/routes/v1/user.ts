import { Router } from "express";
import controllers from "../../api/v1/user";
import { verifyToken } from "../../middlewares/verify-token";

const router = Router();

// user profile CRUD by token
router.route("/profile/token")
.get(verifyToken, controllers.getUserByToken)
.patch(verifyToken, controllers.updateUserByToken)
.delete(verifyToken, controllers.deleteUserByToken)

router.route("/profile/:id").get().patch().delete();

export { router as userRoutes };
