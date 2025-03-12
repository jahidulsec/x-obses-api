import { Router } from "express";
import controllers from "../../api/v1/marathon";

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

export { router as marathonRoutes };
