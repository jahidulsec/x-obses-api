import { Request, Response, NextFunction } from "express-serve-static-core";
import {
  notFoundError,
  serverError,
} from "../../../../../utils/errors";
import userService from "../../../../../lib/user/profile";
import deleteImage from "../../../../../utils/delete-image";

async function deleteOne(req: Request, res: Response, next: NextFunction) {
  try {
    // get user id from token
    const authUser = req.user;

    //get single item with validated id
    const data = await userService.getSingle({ id: authUser?.id as string });

    if (!data) {
      notFoundError("User not found!");
    }

    const deleted: any = await userService.deleteOne({
      id: authUser?.id as string,
    });

    if (deleted == 0) {
      serverError("User is not deleted");
    }

    // delete previous image
    if (data?.image) {
      deleteImage({
        folder: "photos",
        image: data.image,
      });
    }

    const responseData = {
      success: true,
      message: "User is deleted successfully!",
      data: data,
    };

    //send success response
    res.status(200).json(responseData);
  } catch (error) {
    console.log("ERROR : ", error);

    //send error response
    next(error);
  }
}

export {
    deleteOne as deleteUserByToken
}
