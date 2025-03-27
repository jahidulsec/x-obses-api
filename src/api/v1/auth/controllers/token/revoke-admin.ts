import { Request, Response, NextFunction } from "express-serve-static-core";
import { forbiddenError, notFoundError } from "../../../../../utils/errors";
import userService from "../../../../../lib/admin";
import {
  generateAccessToken,
  validateRefreshToken,
} from "../../../../../utils/token";

const revoke = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // get refresh token from cookie
    const refreshToken = req.body["refreshToken"];


    // validate token
    if (!refreshToken) {
      forbiddenError("You are forbidden for this action");
    }

    // get token info

    let data = validateRefreshToken(refreshToken);

    // check user
    const user = await userService.getSingle({ id: data.id as string });

    if (!user) {
      notFoundError("Admin does not exist");
    }

    // generate token
    const accessToken = generateAccessToken(
      user?.id as string,
      user?.role as string
    );

    const responseData = {
      success: true,
      message: `Token revoke successful`,
      data: {
        accessToken: accessToken,
      },
    };

    res
      .status(200)
      .json(responseData);
  } catch (error) {
    console.log("ERROR : ", error);

    //send error response
    next(error);
  }
};

export { revoke as revokeAdminAccessToken };
