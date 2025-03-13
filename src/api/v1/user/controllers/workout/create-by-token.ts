import { Request, Response, NextFunction } from "express-serve-static-core";
import userService from "../../../../../lib/user/workout";
import userProfileService from "../../../../../lib/user/profile";
import { createWorkOutDTOSchema } from "../../../../../schemas/workout";
import { unauthorizedError } from "../../../../../utils/errors";
import {
  calculateCaloriesBurn,
  calculateHeartPts,
} from "../../../../../utils/formula";

async function createNew(req: Request, res: Response, next: NextFunction) {
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

    //Validate incoming body data with defined schema
    const validatedData = createWorkOutDTOSchema.parse(formData);

    // if cycling, steps = 0
    if (validatedData.type === "cycling") {
      validatedData.steps = 0;
    }

    // calculate heart pts
    validatedData.heartPts = calculateHeartPts(
      validatedData.durationMs ?? 0,
      validatedData.type
    );

    // calculate calories burn in kCal
    validatedData.calories = calculateCaloriesBurn(
      validatedData.durationMs ?? 0,
      user?.weight ?? 0,
      validatedData.type
    );

    //create new with validated data
    const created = await userService.createNew(validatedData);

    const responseData = {
      success: true,
      message: "New user workout added successfully!",
      data: created,
    };

    //send success response
    res.status(201).json(responseData);
  } catch (error) {
    console.log("ERROR : ", error);

    //send error response
    next(error);
  }
}

export { createNew as createUserWorkout };
