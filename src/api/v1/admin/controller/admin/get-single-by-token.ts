import { Request, Response, NextFunction } from "express-serve-static-core";
import { requiredIdSchema } from "../../../../../schemas/required-id";
import adminService from "../../../../../lib/admin";
import { notFoundError } from "../../../../../utils/errors";

const get = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // get auth user
    const authUser = req.user;

    //get single item with validated id
    const data = await adminService.getSingle({ id: authUser?.id as string });

    if (!data) {
      notFoundError("Admin not found!");
    }

    const responseData = {
      success: true,
      message: "Get Admin details successfully!",
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

export { get as getSingleByToken };
