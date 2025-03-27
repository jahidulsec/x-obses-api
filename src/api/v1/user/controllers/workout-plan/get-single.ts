import { Request, Response, NextFunction } from "express-serve-static-core";
import { requiredIdSchema } from "../../../../../schemas/required-id";
import { notFoundError } from "../../../../../utils/errors";
import userService from "../../../../../lib/user/workout-plan";

const getUserWorkoutPlan = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // get user id from token
    const authUser = req.user;


    //Validate incoming body data with defined schema
    const validatedData = requiredIdSchema.parse(req.params);

    //get single item with validated id
    const data = await userService.getSingleByToken(
      validatedData,
      authUser?.id as string
    );

    if (!data) {
      notFoundError("Workout plan not found!");
    }

    const responseData = {
      success: true,
      message: "Get workout plan details successfully!",
      data: data,
    };

    //send success response
    res.status(200).json(responseData);
  } catch (error) {
    console.log("ERROR : ", error);

    //send error response
    next(error);
  }
};

export { getUserWorkoutPlan };
