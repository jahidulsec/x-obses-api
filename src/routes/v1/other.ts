import { Router } from "express";
import controllers from "../../api/v1/other";

const router = Router();

// blog
router.route("/blog").get(controllers.getMulti).post(controllers.createBlog);

router
  .route("/blog/:id")
  .get(controllers.getSingle)
  .patch(controllers.updateBlog)
  .delete(controllers.deleteBlog);

export { router as otherRoutes };
