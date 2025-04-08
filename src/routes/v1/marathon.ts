import { Router } from "express";
import controllers from "../../api/v1/marathon";
import { verifyToken } from "../../middlewares/verify-token";
import { verifyRoles } from "../../middlewares/verify-roles";

const router = Router();

// marathon
router
  .route("/marathon")
  .post(
    verifyToken,
    verifyRoles("admin", "superadmin"),
    controllers.createMarathon
  )
  .get(verifyToken, controllers.getMulti);

router
  .route("/marathon/:id")
  .patch(
    verifyToken,
    verifyRoles("admin", "superadmin"),
    controllers.updateMarathon
  )
  .get(verifyToken, controllers.getSingle)
  .delete(
    verifyToken,
    verifyRoles("admin", "superadmin"),
    controllers.deleteMarathon
  );

router.get("/stats/marathon", controllers.getMarathonStats);

// delete reward
router.delete(
  "/marathon/reward/:id",
  verifyToken,
  verifyRoles("admin", "superadmin"),
  controllers.deleteReward
);

// marathon user
router
  .route("/user")
  .get(controllers.getMarathonUsers)
  .post(verifyToken, controllers.createMarathonUser);

router
  .route("/user/:id")
  .get(verifyToken, controllers.getMarathonUser)
  .patch(verifyToken, controllers.updateMarathonUser)
  .delete(verifyToken, controllers.deleteMarathonUser);

export { router as marathonRoutes };
