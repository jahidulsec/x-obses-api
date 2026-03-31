import { Request, Response, NextFunction } from "express-serve-static-core";
import userService from "../../../../../lib/user/workout";
import { notFoundError } from "../../../../../utils/errors";
import { workOutsQuerySchema } from "../../../../../schemas/workout";

const getActivityHistory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // get user id from token
    const authUser = req.user;

    // validate incoming body data with defined schema
    const validatedQuery = workOutsQuerySchema.parse(req.query);

    //get activity history with validated id
    const data = await userService.getActivityHistory(
      { id: `${authUser?.id}` },
      validatedQuery
    );

    if (!data) {
      notFoundError("Activity history not found!");
    }

    const responseData = {
      success: true,
      message: "Get activity history successfully!",
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

export { getActivityHistory };
