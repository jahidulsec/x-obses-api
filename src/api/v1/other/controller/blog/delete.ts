import { Request, Response, NextFunction } from "express-serve-static-core";
import otherService from "../../../../../lib/other/blog";
import { requiredIdSchema } from "../../../../../schemas/required-id";
import { notFoundError, serverError } from "../../../../../utils/errors";

const deleteOne = async (req: Request, res: Response, next: NextFunction) => {
  try {
    //Validate incoming body data with defined schema
    const validatedData = requiredIdSchema.parse(req.params);

    //get single item with validated id
    const data = await otherService.getSingle(validatedData);

    if (!data) {
      notFoundError("Blog not found!");
    }

    const deleted: any = await otherService.deleteOne(validatedData);

    if (deleted == 0) {
      serverError("Blog is not deleted");
    }

    const responseData = {
      success: true,
      message: "Blog is deleted successfully!",
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

export { deleteOne as deleteBlog };
