import { Request, Response, NextFunction } from "express-serve-static-core";
import userService from "../../../../../lib/user/workout-plan";
import userProfileService from "../../../../../lib/user/profile";
import { badRequestError, notFoundError } from "../../../../../utils/errors";
import { updateWorkOutPlanDTOSchema } from "../../../../../schemas/workout-plan";
import db from "../../../../../db/db";
import { countDays, Days } from "../../../../../utils/utils";
import { requiredIdSchema } from "../../../../../schemas/required-id";
import {
  calculateAge,
  calculateBMR,
  calculateCaloriesGoal,
} from "../../../../../utils/formula";
import { gender } from "../../../../../types/user";

const updateUserWorkoutPlan = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const formData = req.body;

    // get user id from token
    const authUser = req.user;

    //validate incoming params id
    const validatedId = requiredIdSchema.parse(req.params);

    //check existing Fuel supplier
    const existingWorkoutplan = await userService.getSingle(validatedId);

    if (!existingWorkoutplan) {
      //send not found error if not exist
      notFoundError("Workout Goal does not found");
    }

    // get user info by token
    const user = await userProfileService.getSingle({
      id: authUser?.id as string,
    });

    // set userId from token
    formData["userId"] = authUser?.id as string;

    // Validate incoming body data with defined schema
    const validatedData = updateWorkOutPlanDTOSchema.parse(formData);

    // check schedule

    // check schedule
    if (validatedData.startDate && validatedData.endDate) {
      const scheduleList = await db.workoutGoal.findMany({
        where: {
          userId: authUser?.id,
          startDate: {
            gte: validatedData.startDate,
          },
          endDate: {
            lte: validatedData.endDate,
          },
          id: {
            not: validatedId.id,
          },
        },
      });

      if (scheduleList.length > 0) {
        badRequestError("You already have an schedule");
      }
    }

    if (validatedData.startDate) {
      const scheduleList = await db.workoutGoal.findMany({
        where: {
          userId: authUser?.id,
          startDate: {
            gte: validatedData.startDate,
          },
          id: {
            not: validatedId.id,
          },
        },
      });

      if (scheduleList.length > 0) {
        badRequestError("You already have an schedule");
      }
    }

    if (validatedData.endDate) {
      const scheduleList = await db.workoutGoal.findMany({
        where: {
          userId: authUser?.id,
          startDate: {
            gte: existingWorkoutplan?.startDate as Date,
          },
          endDate: {
            lte: validatedData.endDate,
          },
          id: {
            not: validatedId.id,
          },
        },
      });

      if (scheduleList.length > 0) {
        badRequestError("You already have an schedule");
      }
    }

    let totalDays = existingWorkoutplan?.totalDays ?? 0;

    // calculate total days
    if (validatedData.workoutDays) {
      let days = validatedData?.workoutDays?.replaceAll(" ", "").split(",");

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
    }

    // calculate calories consumption

    if (validatedData.goalType || validatedData.weightGoal) {
      const age = calculateAge(user?.birth as Date);

      const bmr = calculateBMR(
        validatedData?.weightGoal ??
          existingWorkoutplan?.weightGoal ??
          user?.weight ??
          0,
        user?.heightFt as number,
        user?.heightIn as number,
        user?.gender as gender,
        age
      );

      const calorieGoal = calculateCaloriesGoal(
        validatedData?.goalType ??
          existingWorkoutplan?.goalType ??
          "gain_muscle",
        bmr
      );

      validatedData.caloriesGoal = calorieGoal;
    }

    // create new with validated data
    const updated = await userService.updateOne(validatedId, validatedData);

    const responseData = {
      success: true,
      message: "User workout plan updated successfully!",
      data: updated,
    };

    // send success response
    res.status(200).json(responseData);
  } catch (error) {
    console.log("ERROR : ", error);

    //send error response
    next(error);
  }
};

export { updateUserWorkoutPlan };
