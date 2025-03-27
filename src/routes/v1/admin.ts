import { Router } from "express";
import controllers from "../../api/v1/admin";
import { verifyRoles } from "../../middlewares/verify-roles";

const router = Router();

router
  .route("/admin")
  .get(verifyRoles("superadmin"), controllers.getMulti)
  .post(verifyRoles("superadmin"), controllers.createAdmin);

router
  .route("/admin/:id")
  .get(verifyRoles("superadmin"), controllers.getSingle)
  .patch(verifyRoles("superadmin"), controllers.updateAdmin)
  .delete(verifyRoles("superadmin"), controllers.deleteAdmin);

router.get(
  "/token/admin",
  verifyRoles("superadmin", "admin"),
  controllers.getSingleByToken
);

export { router as adminRoutes };
