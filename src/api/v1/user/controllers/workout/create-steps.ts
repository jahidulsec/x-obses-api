import { Request, Response, NextFunction } from "express-serve-static-core";
import userService from "../../../../../lib/user/workout";
import userProfileService from "../../../../../lib/user/profile";
import { createStepsDTOSchema } from "../../../../../schemas/workout";
import {
  calculateCaloriesBurn,
  calculateHeartPts,
} from "../../../../../utils/formula";

async function createNew(req: Request, res: Response, next: NextFunction) {
  try {
    const formData = req.body;

    // get user id from token
    const authUser = req.user;

    // get user info by token
    const user = await userProfileService.getSingle({
      id: authUser?.id as string,
    });

    // set userId from token
    formData["userId"] = authUser?.id as string;

    //Validate incoming body data with defined schema
    const validatedData = createStepsDTOSchema.parse(formData);

    //create new with validated data
    const created = await userService.createNewSteps(validatedData);

    const responseData = {
      success: true,
      message: "New user steps added successfully!",
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

export { createNew as createUserStep };
