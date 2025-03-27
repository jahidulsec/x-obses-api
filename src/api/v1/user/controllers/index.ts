import { getUserByToken } from "./profile/get-by-token";
import { updateUserByToken } from "./profile/update-by-token";
import { deleteUserByToken } from "./profile/delete-by-token";

// workout
import { getUserWorkoutsByToken } from "./workout/get-all-by-token";
import { createUserWorkout } from "./workout/create-by-token";
import { createUserStep } from "./workout/create-steps";

//workout plan
import { createUserWorkoutPlan } from "./workout-plan/create";
import { getUserWorkoutPlansByToken } from "./workout-plan/get-by-token";
import { updateUserWorkoutPlan } from "./workout-plan/update";
import { deleteUserWorkoutPlan } from "./workout-plan/delete";
import { getUserWorkoutPlan } from "./workout-plan/get-single";

export = {
  getUserByToken,
  updateUserByToken,
  deleteUserByToken,
  getUserWorkoutsByToken,
  createUserWorkout,
  createUserWorkoutPlan,
  getUserWorkoutPlansByToken,
  updateUserWorkoutPlan,
  deleteUserWorkoutPlan,
  getUserWorkoutPlan,
  createUserStep,
};
