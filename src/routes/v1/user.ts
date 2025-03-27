import { Router } from "express";
import controllers from "../../api/v1/user";
import { verifyToken } from "../../middlewares/verify-token";

const router = Router();

// user profile CRUD by token
router
  .route("/profile/token")
  .get(verifyToken, controllers.getUserByToken)
  .patch(verifyToken, controllers.updateUserByToken)
  .delete(verifyToken, controllers.deleteUserByToken);

// router.route("/profile/:id").get().patch().delete();

// ---------- WORKOUT -------------- //
router
  .route("/workout")
  .get(verifyToken, controllers.getUserWorkoutsByToken)
  .post(verifyToken, controllers.createUserWorkout);

router.post("/workout/steps", verifyToken, controllers.createUserStep);

// ---------- WORKOUT PLAN -------------- //
router
  .route("/workout/plan")
  .get(verifyToken, controllers.getUserWorkoutPlansByToken)
  .post(verifyToken, controllers.createUserWorkoutPlan);

router
  .route("/workout/plan/:id")
  .get(verifyToken, controllers.getUserWorkoutPlan)
  .patch(verifyToken, controllers.updateUserWorkoutPlan)
  .delete(verifyToken, controllers.deleteUserWorkoutPlan);

export { router as userRoutes };
