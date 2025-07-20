import { createBlog } from "./blog/create";
import { updateBlog } from "./blog/update";
import { deleteBlog } from "./blog/delete";
import { getMulti } from "./blog/get-mutli";
import { getSingle } from "./blog/get-single";

// banner
import { getBanner } from "./banner/get-single";
import { getBanners } from "./banner/get-mutli";
import { createBanner } from "./banner/create";
import { updateBanner } from "./banner/update";
import { deleteBanner } from "./banner/delete";

export = {
  createBlog,
  updateBlog,
  deleteBlog,
  getMulti,
  getSingle,
  getBanner,
  getBanners,
  createBanner,
  updateBanner,
  deleteBanner,
};
