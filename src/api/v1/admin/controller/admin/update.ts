import { Request, Response, NextFunction } from "express-serve-static-core";
import { notFoundError, serverError } from "../../../../../utils/errors";
import adminService from "../../../../../lib/admin";
import { requiredIdSchema } from "../../../../../schemas/required-id";
import { updateAdminDTOSchema } from "../../../../../schemas/admin";
import { hashPassword } from "../../../../../utils/password";

const update = async (req: Request, res: Response, next: NextFunction) => {
  try {
    //Validate incoming body data with defined schema
    const validatedId = requiredIdSchema.parse(req.params);

    const formData = req.body;

    //check existing zone
    const existingAdmin = await adminService.getSingle(validatedId);

    if (!existingAdmin) {
      //send not found error if not exist
      notFoundError("Admin does not exist");
    }

    //Validate incoming body data with defined schema
    const validatedData = updateAdminDTOSchema.parse(formData);

    // hashing password
    if (validatedData.password) {
      const hashedPassword = await hashPassword(
        validatedData.password as string
      );
      validatedData.password = hashedPassword;
    }

    //update with validated data
    const updated = await adminService.updateOne(validatedId, validatedData);

    if (!updated) {
      serverError("Admin is not updated");
    }

    const responseData = {
      success: true,
      message: "Admin updated successfully!",
      data: updated,
    };

    //send success response
    res.status(200).json(responseData);
  } catch (error) {
    console.log("ERROR : ", error);

    //send error response
    next(error);
  }
};

export { update as updateAdmin };
