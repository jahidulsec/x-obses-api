import { Request, Response, NextFunction } from "express-serve-static-core";
import { requiredIdSchema } from "../../../../../schemas/required-id";
import { createOtpDtoSchema } from "../../../../../schemas/user-login";
import authService from "../../../../../lib/auth/users";
import { badRequestError, notFoundError } from "../../../../../utils/errors";
import { $Enums } from "@prisma/client";
import { verifyOtpTime } from "../../../../../utils/otp";
import * as jwt from "jsonwebtoken";

const verifyOtp = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const formData = req.body;

    //validate incoming params id
    const validatedId = requiredIdSchema.parse(req.params);

    //Validate incoming body data with defined schema
    const validatedData = createOtpDtoSchema.parse(formData);

    // check existing otp
    const existingOtpProfile = await authService.getOtpById(validatedId);

    if (
      !existingOtpProfile ||
      existingOtpProfile.useCase !== (validatedData.type as $Enums.UseCase) ||
      existingOtpProfile.code != validatedData.code
    ) {
      //send not found error if not exist
      notFoundError("Invalid OTP");
    }

    // check otp expire time
    const isVerified = verifyOtpTime(existingOtpProfile?.expiresAt as Date);

    if (!isVerified) {
      badRequestError("OTP is expired");
    }

    let accessToken: string = "";

    //  create user and access token
    if (validatedData.type === "signup") {
      const user = await authService.createUser({
        mobile: existingOtpProfile?.mobile as string,
      });
      accessToken = jwt.sign(
        { id: user.id },
        process.env.ACCESS_TOKEN_SECRET_KEY as string
      );
    } else {
      // create access token
      accessToken = jwt.sign(
        { id: existingOtpProfile?.userId },
        process.env.ACCESS_TOKEN_SECRET_KEY as string
      );
    }

    // delete otp
    await authService.deleteOtp(validatedId);

    const responseData = {
      success: true,
      message: `${validatedData.type.toUpperCase()} is successful`,
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

export { verifyOtp };
