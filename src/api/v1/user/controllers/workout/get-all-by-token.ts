import { Request, Response, NextFunction } from "express-serve-static-core";
import userService from "../../../../../lib/user/workout";
import { notFoundError, unauthorizedError } from "../../../../../utils/errors";
import { workOutsQuerySchema } from "../../../../../schemas/workout";

const getUserWorkoutsByToken = async (
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
    const validatedQuery = workOutsQuerySchema.parse(req.query);

    //get single item with validated id
    const data = await userService.getUserWorkOutStats(
      { id: `${authUser?.id}` },
      validatedQuery
    );

    if (!data) {
      notFoundError("User data not found!");
    }

    const responseData = {
      success: true,
      message: "Get user workout details successfully!",
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

export { getUserWorkoutsByToken };
