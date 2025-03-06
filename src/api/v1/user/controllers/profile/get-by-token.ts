import { Request, Response, NextFunction } from "express-serve-static-core";
import userService from "../../../../../lib/user/profile";
import { notFoundError, unauthorizedError } from "../../../../../utils/errors";

const getUserByToken = async (
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

    //get single item with validated id
    const data = await userService.getSingle({ id: `${authUser?.id}` });

    if (!data) {
      notFoundError("User not found!");
    }

    const responseData = {
      success: true,
      message: "Get user profile details successfully!",
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

export { getUserByToken };
