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

// banner
router
  .route("/banner")
  .get(controllers.getBanners)
  .post(
    verifyToken,
    verifyRoles("admin", "superadmin"),
    controllers.createBanner
  );

router
  .route("/banner/:id")
  .get(controllers.getBanner)
  .patch(
    verifyToken,
    verifyRoles("admin", "superadmin"),
    controllers.updateBanner
  )
  .delete(
    verifyToken,
    verifyRoles("admin", "superadmin"),
    controllers.deleteBanner
  );

export { router as otherRoutes };
