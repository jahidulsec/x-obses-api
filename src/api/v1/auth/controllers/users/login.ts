import { Request, Response, NextFunction } from "express-serve-static-core";
import { createLoginDTOSchema } from "../../../../../schemas/user-login";
import authService from "../../../../../lib/auth/users";
import db from "../../../../../db/db";
import { notFoundError, serverError } from "../../../../../utils/errors";

const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const formData = req.body;

    //Validate incoming body data with defined schema
    const validatedData = createLoginDTOSchema.parse(formData);

    // check user
    const user = await db.users.findUnique({
      where: {
        mobile: validatedData.mobile,
      },
    });

    if (!user) {
      notFoundError("User does not exist with this mobile");
    }

    //create new with validated data
    const created = await authService.getLoginOtp(validatedData);

    // send otp to mobile
    const message = `Your One-Time Password (OTP) for X-Obses login is ${created.code}.`;

    const send = await fetch(
      `https://api.mobireach.com.bd/SendTextMessage?Username=${process.env.SMS_USERNAME}&Password=${process.env.SMS_PASSWORD}&From=Impala&To=${validatedData.mobile}&Message=${message}`,
      {
        method: "GET",
      }
    );


    if (!send.ok) {
      serverError("Something went wrong!");
    }

    const responseData = {
      success: true,
      message: "OTP is sent to " + created.mobile,
      data: {
        id: created.id,
        userId: created.userId,
        mobile: validatedData.mobile,
        expireAt: created.expiresAt,
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
