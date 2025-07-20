import { Request, Response, NextFunction } from "express-serve-static-core";
import { notFoundError, serverError } from "../../../../../utils/errors";
import deleteImage from "../../../../../utils/delete-image";
import upload from "../../../../../utils/upload";
import otherService from "../../../../../lib/other/banner";
import { requiredIdSchema } from "../../../../../schemas/required-id";
import { updateBannerDTOSchema } from "../../../../../schemas/banner";

const update = async (req: Request, res: Response, next: NextFunction) => {
  let uploadedPhoto: string | null = null;

  try {
    //Validate incoming body data with defined schema
    const validatedId = requiredIdSchema.parse(req.params);

    // get form data
    const fileData = await upload.uploadPhoto(req, res, "imagePath");

    const formData = req.body;

    //check existing banner
    const existingBanner = await otherService.getSingle(validatedId);

    if (!existingBanner) {
      //send not found error if not exist
      notFoundError("Banner does not exist");
    }

    if (fileData) {
      formData["imagePath"] = fileData;
      uploadedPhoto = fileData;

      console.log(formData["imagePath"]);

      // delete previous image
      deleteImage({
        folder: "photos",
        image: existingBanner?.imagePath || "",
      });
    }

    //Validate incoming body data with defined schema
    const validatedData = updateBannerDTOSchema.parse(formData);

    //update with validated data
    const updated = await otherService.updateOne(validatedId, validatedData);

    if (!updated) {
      serverError("Banner is not updated");
    }

    const responseData = {
      success: true,
      message: "Banner updated successfully!",
      data: {
        ...updated,
        ...(updated.imagePath && {
          imagePath: `${req.protocol}://${req.get("host")}/uploads/photos/${
            updated?.imagePath
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
};

export { update as updateBanner };
