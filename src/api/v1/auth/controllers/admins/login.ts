import { Request, Response, NextFunction } from "express-serve-static-core";
import { adminLoginDTOSchema } from "../../../../../schemas/admin";
import adminService from "../../../../../lib/admin";
import { badRequestError, notFoundError } from "../../../../../utils/errors";
import { isValidPassword } from "../../../../../utils/password";
import * as jwt from "jsonwebtoken";

const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const formData = req.body;

    //Validate incoming body data with defined schema
    const validatedData = adminLoginDTOSchema.parse(formData);

    // check admin
    const admin = await adminService.getSingleByUsername(
      validatedData.username
    );

    if (!admin) {
      notFoundError("Admin with this username does not exist");
    }

    //  check password
    if (
      !(await isValidPassword(
        validatedData.password,
        admin?.password as string
      ))
    ) {
      badRequestError("Incorrect password");
    }

    //  create access token
    const accessToken = jwt.sign(
      { id: admin?.id, role: admin?.role, type: "access" },
      process.env.ACCESS_TOKEN_SECRET_KEY as string
    );

    const responseData = {
      success: true,
      message: "Admin is successfully logged in",
      data: {
        accessToken: accessToken,
      },
    };

    //send success response
    res.status(201).json(responseData);
  } catch (error) {
    console.log("ERROR : ", error);

    //send error response
    next(error);
  }
};

export { login };
