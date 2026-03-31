import { Request, Response, NextFunction } from "express-serve-static-core";
import userService from "../../../../../lib/user/workout";
import { notFoundError } from "../../../../../utils/errors";
import { workOutsQuerySchema } from "../../../../../schemas/workout";

const getMyWorkouts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // get user id from token
    const authUser = req.user;

    // validate incoming body data with defined schema
    const validatedQuery = workOutsQuerySchema.parse(req.query);

    //get workouts for the authenticated user
    const data = await userService.getMyWorkouts(
      { id: `${authUser?.id}` },
      validatedQuery
    );

    if (!data) {
      notFoundError("Workouts not found!");
    }

    const responseData = {
      success: true,
      message: "Get user workouts successfully!",
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

export { getMyWorkouts };
