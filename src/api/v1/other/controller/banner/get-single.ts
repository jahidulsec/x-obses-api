import { Request, Response, NextFunction } from "express-serve-static-core";
import { requiredIdSchema } from "../../../../../schemas/required-id";
import otherService from "../../../../../lib/other/banner";
import { notFoundError } from "../../../../../utils/errors";

const get = async (req: Request, res: Response, next: NextFunction) => {
  try {
    //Validate incoming body data with defined schema
    const validatedData = requiredIdSchema.parse(req.params);

    //get single item with validated id
    const data = await otherService.getSingle(validatedData);

    if (!data) {
      notFoundError("Banner not found!");
    }

    const responseData = {
      success: true,
      message: "Get Banner details successfully!",
      data: {
        ...data,
        ...(data?.imagePath && {
          imagePath: `${req.protocol}://${req.get("host")}/uploads/photos/${
            data?.imagePath
          }`,
        }),
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

export { get as getBanner };
