import { Request, Response, NextFunction } from "express-serve-static-core";
import { notFoundError, unauthorizedError } from "../../../../../utils/errors";
import { workOutPlansQuerySchema } from "../../../../../schemas/workout-plan";
import userService from "../../../../../lib/user/workout-plan";

const getUserWorkoutPlansByToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // get user id from token
    const authUser = req.user;

    if (!authUser) {
      unauthorizedError("Invalid token");
    }

    // validate incoming body data with defined schema
    const validatedQuery = workOutPlansQuerySchema.parse(req.query);

    //get single item with validated id
    const data = await userService.getMultiById(validatedQuery, {
      id: `${authUser?.id}`,
    });

    if (!data) {
      notFoundError("User data not found!");
    }

    const responseData = {
      success: true,
      message: "Get user workout plan details successfully!",
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

export { getUserWorkoutPlansByToken };
