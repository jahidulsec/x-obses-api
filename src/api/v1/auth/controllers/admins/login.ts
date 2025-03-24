import { Request, Response, NextFunction } from "express-serve-static-core";
import { adminLoginDTOSchema } from "../../../../../schemas/admin";
import adminService from "../../../../../lib/admin";
import { badRequestError, notFoundError } from "../../../../../utils/errors";
import { isValidPassword } from "../../../../../utils/password";
import * as jwt from "jsonwebtoken";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../../../../../utils/token";
import { addMinutesToDate } from "../../../../../utils/otp";

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
    const accessToken = generateAccessToken(
      admin?.id as string,
      admin?.role as string
    );
    const refreshToken = generateRefreshToken(admin?.id as string);

    const responseData = {
      success: true,
      message: "Admin is successfully logged in",
      data: {
        accessToken: accessToken,
      },
    };

    //send success response
    res
      .status(200)
      .cookie("refreshToken", refreshToken, {
        httpOnly: true,
        // secure: ,
        sameSite: "lax",
        expires: addMinutesToDate(new Date(), 24 * 60), // for 1 day
      })
      .json(responseData);
  } catch (error) {
    console.log("ERROR : ", error);

    //send error response
    next(error);
  }
};

export { login };
