import { Request, Response, NextFunction } from "express-serve-static-core";
import userService from "../../../../../lib/user/workout-plan";
import { unauthorizedError } from "../../../../../utils/errors";
import { createWorkOutPlanDTOSchema } from "../../../../../schemas/workout-plan";
import userProfileService from "../../../../../lib/user/profile";
import {
  calculateAge,
  calculateBMI,
  calculateBMR,
  calculateCaloriesGoal,
} from "../../../../../utils/formula";
import { countDays, Days } from "../../../../../utils/utils";
import { gender } from "../../../../../types/user";

const createUserWorkoutPlan = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const formData = req.body;

    // get user id from token
    const authUser = req.user;

    if (!authUser) {
      unauthorizedError("Invalid token");
    }

    // get user info by token
    const user = await userProfileService.getSingle({
      id: authUser?.id as string,
    });

    // set userId from token
    formData["userId"] = authUser?.id as string;

    // Validate incoming body data with defined schema
    const validatedData = createWorkOutPlanDTOSchema.parse(formData);

    // calculate BMI
    const bmi = calculateBMI(
      user?.weight ?? 0,
      user?.heightFt ?? 0,
      user?.heightin ?? 0
    );

    validatedData.bmi = Number(bmi);

    // calculate total days
    let days = validatedData?.workoutDays?.split(",");

    let totalDays = 0;

    days?.map((day) => {
      totalDays += countDays(
        validatedData.startDate as Date,
        validatedData.endDate as Date,
        day as Days
      );
    });

    validatedData.totalDays = totalDays;

    // calculate calories consumption
    const age = calculateAge(user?.birth as Date);

    const bmr = calculateBMR(
      validatedData.weightGoal as number,
      user?.heightFt as number,
      user?.heightin as number,
      user?.gender as gender,
      age
    );

    const calorieGoal = calculateCaloriesGoal(validatedData.goalType, bmr);

    validatedData.consumption = calorieGoal;

    // create new with validated data
    const created = await userService.createNew(validatedData);

    const responseData = {
      success: true,
      message: "New user workout plan added successfully!",
      data: created,
    };

    // send success response
    res.status(201).json(responseData);
  } catch (error) {
    console.log("ERROR : ", error);

    //send error response
    next(error);
  }
};

export { createUserWorkoutPlan };
