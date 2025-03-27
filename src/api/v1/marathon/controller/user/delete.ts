import { Request, Response, NextFunction } from "express-serve-static-core";
import marathonService from "../../../../../lib/marathon/user";
import { requiredIdSchema } from "../../../../../schemas/required-id";
import {
  forbiddenError,
  notFoundError,
  serverError,
  unauthorizedError,
} from "../../../../../utils/errors";

const deleteOne = async (req: Request, res: Response, next: NextFunction) => {
  try {
    //Validate incoming body data with defined schema
    const validatedData = requiredIdSchema.parse(req.params);

    // get user id from token
    const authUser = req.user;

    //get single item with validated id
    const data = await marathonService.getSingle(validatedData);

    if (!authUser || authUser.id !== data?.userId) {
      forbiddenError("Unauthorized");
    }

    if (!data) {
      notFoundError("Marathon user not found!");
    }

    const deleted: any = await marathonService.deleteOne(validatedData);

    if (deleted == 0) {
      serverError("Marathon user is not deleted");
    }

    const responseData = {
      success: true,
      message: "Marathon user is deleted successfully!",
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

export { deleteOne as deleteMarathonUser };
