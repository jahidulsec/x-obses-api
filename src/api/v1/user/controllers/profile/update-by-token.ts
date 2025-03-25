import { Request, Response, NextFunction } from "express-serve-static-core";
import { updateUserDTOSchema } from "../../../../../schemas/user";
import userService from "../../../../../lib/user/profile";
import {
  notFoundError,
  serverError,
  unauthorizedError,
} from "../../../../../utils/errors";
import upload from "../../../../../utils/upload";
import deleteImage from "../../../../../utils/delete-image";

async function updateOne(req: Request, res: Response, next: NextFunction) {
  let uploadedPhoto: string | null = null;

  try {
    // get form data
    const fileData = await upload.uploadPhoto(req, res);

    const formData = req.body;

    // get user id from token
    const authUser = req.user;

    if (!authUser) {
      unauthorizedError("Invalid token");
    }

    //check existing zone
    const existingUser = await userService.getSingle({
      id: authUser?.id as string,
    });

    if (!existingUser) {
      //send not found error if not exist
      notFoundError("User does not exist");
    }

    if (fileData) {
      formData["image"] = fileData;
      uploadedPhoto = fileData;

      // delete previous image
      deleteImage({ folder: "photos", image: existingUser?.image || "" });
    }

    //Validate incoming body data with defined schema
    const validatedData = updateUserDTOSchema.parse(formData);

    //update with validated data
    const updated = await userService.updateOne(
      { id: authUser?.id as string },
      validatedData
    );

    if (!updated) {
      serverError("User profile is not updated");
    }

    const responseData = {
      success: true,
      message: "User profile updated successfully!",
      data: {
        ...updated,
        ...(updated?.image && {
          imagePath: `${req.protocol}://${req.get("host")}/uploads/photos/${
            updated.image
          }`,
        }),
      },
    };

    //send success response
    res.status(200).json(responseData);
  } catch (error) {
    console.log("ERROR : ", error);

    //delete uploaded photo is item isn't created
    if (uploadedPhoto) {
      deleteImage({ folder: "photos", image: uploadedPhoto || "" });
    }

    //send error response
    next(error);
  }
}

export { updateOne as updateUserByToken };
