import { Request, Response, NextFunction } from "express-serve-static-core";
import { requiredIdSchema } from "../../../../../schemas/required-id";
import marathonService from "../../../../../lib/marathon/marathon";
import { notFoundError } from "../../../../../utils/errors";

const get = async (req: Request, res: Response, next: NextFunction) => {
  try {
    //Validate incoming body data with defined schema
    const validatedData = requiredIdSchema.parse(req.params);

    //get single item with validated id
    const data = await marathonService.getSingle(validatedData);

    if (!data) {
      notFoundError("Marathon not found!");
    }

    const responseData = {
      success: true,
      message: "Get Marathon details successfully!",
      data: data.data,
      totalParticiants: data.totalParticiants,
    };

    //send success response
    res.status(200).json(responseData);
  } catch (error) {
    console.log("ERROR : ", error);

    //send error response
    next(error);
  }
};

export { get as getSingle };
