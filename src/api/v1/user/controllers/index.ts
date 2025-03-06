import { getUserByToken } from "./profile/get-by-token";
import { updateUserByToken } from "./profile/update-by-token";
import { deleteUserByToken } from "./profile/delete-by-token";

// workout
import { getUserWorkoutsByToken } from "./workout/get-all-by-token";
import { createUserWorkout } from "./workout/create-by-token";

export = {
  getUserByToken,
  updateUserByToken,
  deleteUserByToken,
  getUserWorkoutsByToken,
  createUserWorkout,
};
