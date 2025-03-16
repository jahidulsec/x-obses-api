import { Request, Response, NextFunction } from "express-serve-static-core";
import adminService from "../../../../../lib/admin";
import { requiredIdSchema } from "../../../../../schemas/required-id";
import { notFoundError, serverError } from "../../../../../utils/errors";

const deleteOne = async (req: Request, res: Response, next: NextFunction) => {
  try {
    //Validate incoming body data with defined schema
    const validatedData = requiredIdSchema.parse(req.params);

    //get single item with validated id
    const data = await adminService.getSingle(validatedData);

    if (!data) {
      notFoundError("Admin not found!");
    }

    const deleted: any = await adminService.deleteOne(validatedData);

    if (deleted == 0) {
      serverError("Admin is not deleted");
    }

    const responseData = {
      success: true,
      message: "Admin is deleted successfully!",
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

export { deleteOne as deleteAdmin };
