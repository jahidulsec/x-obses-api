import { Request, Response, NextFunction } from "express-serve-static-core";
import { requiredIdSchema } from "../../../../../schemas/required-id";
import userService from "../../../../../lib/user/workout-plan";
import { notFoundError, serverError } from "../../../../../utils/errors";

const deleteUserWorkoutPlan = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    //Validate incoming body data with defined schema
    const validatedData = requiredIdSchema.parse(req.params);

    // get user id from token
    const authUser = req.user;


    //get single item with validated id
    const data = await userService.getSingleByToken(
      validatedData,
      authUser?.id as string
    );

    if (!data) {
      notFoundError("Workout goad not found!");
    }

    const deleted: any = await userService.deleteOne(validatedData);

    if (deleted == 0) {
      serverError("Workout goad is not deleted");
    }

    const responseData = {
      success: true,
      message: "Workout goad is deleted successfully!",
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

export { deleteUserWorkoutPlan };
