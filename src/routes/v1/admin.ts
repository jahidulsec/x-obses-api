import { Router } from "express";
import controllers from "../../api/v1/admin";

const router = Router();

router.route("/admin").get(controllers.getMulti).post(controllers.createAdmin);

router
  .route("/admin/:id")
  .get(controllers.getSingle)
  .patch(controllers.updateAdmin)
  .delete(controllers.deleteAdmin);

export { router as adminRoutes };
