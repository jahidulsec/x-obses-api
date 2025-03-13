import { Request, Response, NextFunction } from "express-serve-static-core";
import userService from "../../../../../lib/user/workout-plan";
import {
  badRequestError,
  unauthorizedError,
} from "../../../../../utils/errors";
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
import db from "../../../../../db/db";

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

    // check schedule
    const scheduleList = await db.workoutGoal.findMany({
      where: {
        endDate: {
          gte: validatedData.startDate,
        },
      },
    });

    if (scheduleList.length > 0) {
      badRequestError("You already have an schedule");
    }

    if(!user?.heightFt || !user?.heightin) {
      badRequestError("Please enter your height in your profile")
    }

    if(!user?.weight) {
      badRequestError("Please enter your weight in your profile")
    }

    if(!user?.gender) {
      badRequestError("Please enter your gender in your profile")
    }


    // calculate BMI
    const bmi = calculateBMI(
      user?.weight ?? 0,
      user?.heightFt ?? 0,
      user?.heightin ?? 0
    );

    validatedData.bmi = Number(bmi);

    // calculate total days
    let days = validatedData?.workoutDays?.replaceAll(" ", "").split(",");

    let totalDays = 0;

    if (days && days.length > 0) {
      for (let i = 0; i < days.length; i++) {
        totalDays += countDays(
          validatedData.startDate as Date,
          validatedData.endDate as Date,
          days[i] as Days
        );
      }
    }

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

    validatedData.caloriesGoal = calorieGoal;

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
