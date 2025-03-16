import { Request, Response, NextFunction } from "express-serve-static-core";
import adminService from "../../../../../lib/admin";
import { createAdminDTOSchema } from "../../../../../schemas/admin";
import { hashPassword } from "../../../../../utils/password";

const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const formData = req.body;

    //Validate incoming body data with defined schema
    const validatedData = createAdminDTOSchema.parse(formData);

    // hashing password
    const hashedPassword = await hashPassword(validatedData.password);

    validatedData.password = hashedPassword;

    //create new with validated data
    const created = await adminService.createNew(validatedData);

    const responseData = {
      success: true,
      message: "New admin created successfully!",
      data: created,
    };

    //send success response
    res.status(201).json(responseData);
  } catch (error) {
    console.log("ERROR : ", error);

    //send error response

    next(error);
  }
};

export { create as createAdmin };
