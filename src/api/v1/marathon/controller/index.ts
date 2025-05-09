// marathon
import { createMarathon } from "./marathon/create";
import { updateMarathon } from "./marathon/update";
import { deleteMarathon } from "./marathon/delete";
import { getMulti } from "./marathon/get-mutli";
import { getSingle } from "./marathon/get-single";
import { getMarathonStats } from "./marathon/get-stats";
import { deleteReward } from "./marathon/delete-reward";

// marathon user
import { createMarathonUser } from "./user/create";
import { getMulti as getMarathonUsers } from "./user/get-multi";
import { getSingle as getMarathonUser } from "./user/get-single";
import { updateMarathonUser } from "./user/update";
import { deleteMarathonUser } from "./user/delete";
import { getSingleLeaderboard } from "./user/get-single-leaderboard";

export = {
  createMarathon,
  updateMarathon,
  deleteMarathon,
  getMarathonStats,
  getMulti,
  getSingle,
  getMarathonUsers,
  updateMarathonUser,
  getMarathonUser,
  createMarathonUser,
  deleteMarathonUser,
  deleteReward,
  getSingleLeaderboard
};
