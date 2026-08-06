import { Request, Response, NextFunction } from "express-serve-static-core";
import { createLoginDTOSchema } from "../../../../../schemas/user-login";
import authService from "../../../../../lib/auth/users";
import userService from "../../../../../lib/user/profile";
import { notFoundError, serverError } from "../../../../../utils/errors";
import { sendSMS } from "../../../../../utils/sms";

const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const formData = req.body;

    //Validate incoming body data with defined schema
    const validatedData = createLoginDTOSchema.parse(formData);

    // check user
    const user = await userService.getSingleByMobile(validatedData.mobile);

    if (!user) {
      notFoundError("User does not exist with this mobile");
    }

    // for test
    if (!user?.mobile.startsWith("01")) {
      const created = await authService.getLoginOtp(validatedData, true);

      const responseData = {
        success: true,
        message: "OTP is sent to " + validatedData.mobile,
        data: {
          id: created.id,
          userId: created.userId,
          mobile: validatedData.mobile,
          expireAt: created.expiresAt,
        },
      };

      //send success response
      return res.status(200).json(responseData);
    }

    //create new with validated data
    const created = await authService.getLoginOtp(validatedData);

    // send otp to mobile
    const message = `Your One-Time Password (OTP) for X-Obses login is ${created.code}.`;

    // avoid test number
    if (created.mobile) {
      sendSMS(created.mobile, message).catch((err) => console.error(err));
    }

    const responseData = {
      success: true,
      message: "OTP is sent to " + validatedData.mobile,
      data: {
        id: created.id,
        userId: created.userId,
        mobile: validatedData.mobile,
        expireAt: created.expiresAt,
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

export { login };
