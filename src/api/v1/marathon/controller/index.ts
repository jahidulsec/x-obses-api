// marathon
import { createMarathon } from "./marathon/create";
import { updateMarathon } from "./marathon/update";
import { deleteMarathon } from "./marathon/delete";
import { getMulti } from "./marathon/get-mutli";
import { getSingle } from "./marathon/get-single";

// marathon user
import { createMarathonUser } from "./user/create";
import { getMulti as getMarathonUsers } from "./user/get-multi";
import { getSingle as getMarathonUser } from "./user/get-single";
import { updateMarathonUser } from "./user/update";
import { deleteMarathonUser } from "./user/delete";

export = {
  createMarathon,
  updateMarathon,
  deleteMarathon,
  getMulti,
  getSingle,
  getMarathonUsers,
  updateMarathonUser,
  getMarathonUser,
  createMarathonUser,
  deleteMarathonUser,
};
