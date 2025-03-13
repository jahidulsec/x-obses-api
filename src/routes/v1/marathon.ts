import { Router } from "express";
import controllers from "../../api/v1/marathon";
import { verifyToken } from "../../middlewares/verify-token";

const router = Router();

// marathon
router
  .route("/marathon")
  .post(controllers.createMarathon)
  .get(controllers.getMulti);

router
  .route("/marathon/:id")
  .patch(controllers.updateMarathon)
  .get(controllers.getSingle)
  .delete(controllers.deleteMarathon);

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
