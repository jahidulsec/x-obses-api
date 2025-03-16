import { Router } from "express";
import controllers from "../../api/v1/other";
import { verifyToken } from "../../middlewares/verify-token";
import { verifyRoles } from "../../middlewares/verify-roles";

const router = Router();

// blog
router
  .route("/blog")
  .get(controllers.getMulti)
  .post(
    verifyToken,
    verifyRoles("admin", "superadmin"),
    controllers.createBlog
  );

router
  .route("/blog/:id")
  .get(controllers.getSingle)
  .patch(
    verifyToken,
    verifyRoles("admin", "superadmin"),
    controllers.updateBlog
  )
  .delete(
    verifyToken,
    verifyRoles("admin", "superadmin"),
    controllers.deleteBlog
  );

export { router as otherRoutes };
