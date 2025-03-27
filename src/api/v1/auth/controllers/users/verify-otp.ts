import { Request, Response, NextFunction } from "express-serve-static-core";
import { requiredIdSchema } from "../../../../../schemas/required-id";
import { createOtpDtoSchema } from "../../../../../schemas/user-login";
import authService from "../../../../../lib/auth/users";
import { badRequestError, notFoundError } from "../../../../../utils/errors";
import { $Enums } from "@prisma/client";
import { addMinutesToDate, verifyOtpTime } from "../../../../../utils/otp";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../../../../../utils/token";

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
    let refreshToken: string = "";

    //  create user and access token
    if (validatedData.type === "signup") {
      const user = await authService.createUser({
        mobile: existingOtpProfile?.mobile as string,
      });
      accessToken = generateAccessToken(user.id, "user");
      refreshToken = generateRefreshToken(user?.id as string);
    } else {
      // create access token
      accessToken = generateAccessToken(
        existingOtpProfile?.userId as string,
        "user"
      );
      refreshToken = generateRefreshToken(existingOtpProfile?.userId as string);
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
    res
      .status(200)
      .cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.SSL_STATUS === "1",
        sameSite: process.env.SSL_STATUS === "1" ? "none" : "lax",
        expires: addMinutesToDate(new Date(), 24 * 60), // for 1 day
      })
      .json(responseData);
  } catch (error) {
    console.log("ERROR : ", error);

    //send error response
    next(error);
  }
};

export { verifyOtp };
