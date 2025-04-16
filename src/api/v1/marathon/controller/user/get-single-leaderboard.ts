import { Request, Response, NextFunction } from "express-serve-static-core";
import { requiredIdSchema } from "../../../../../schemas/required-id";
import marathonService from "../../../../../lib/marathon/user";
import {
  forbiddenError,
  notFoundError,
  unauthorizedError,
} from "../../../../../utils/errors";

const get = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // get user id from token
    const authUser = req.user;

    //Validate incoming body data with defined schema
    const validatedData = requiredIdSchema.parse(req.params);

    //get single item with validated id
    const data = await marathonService.getSingleLeaderboard(validatedData);

    if (!data.user) {
      notFoundError("Marathon user not found!");
    }

    if (authUser?.id !== data.user?.userId) {
      forbiddenError("Unauthorized");
    }

    const responseData = {
      success: true,
      message: "Get Marathon user details successfully!",
      data: {
        user: data.user,
        rank: data.rank,
      },
    };

    //send success response
    res.status(200).json(responseData);
  } catch (error) {
    console.log("ERROR : ", error);

    //send error response
    next(error);
  }
};

export { get as getSingleLeaderboard };
