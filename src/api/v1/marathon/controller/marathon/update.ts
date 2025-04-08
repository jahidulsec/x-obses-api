import { Request, Response, NextFunction } from "express-serve-static-core";
import { notFoundError, serverError } from "../../../../../utils/errors";
import deleteImage from "../../../../../utils/delete-image";
import upload from "../../../../../utils/upload";
import { updateMarathonDTOSchema } from "../../../../../schemas/marathon";
import marathonService from "../../../../../lib/marathon/marathon";
import { requiredIdSchema } from "../../../../../schemas/required-id";

const update = async (req: Request, res: Response, next: NextFunction) => {
  let uploadedPhoto: string | null = null;

  try {
    //Validate incoming body data with defined schema
    const validatedId = requiredIdSchema.parse(req.params);

    // get form data
    const fileData = await upload.uploadPhoto(req, res, "imagePath");

    const formData = req.body;

    //check existing zone
    const existingMarathon = await marathonService.getSingle(validatedId);

    if (!existingMarathon) {
      //send not found error if not exist
      notFoundError("Marathon does not exist");
    }

    if (fileData) {
      formData["imagePath"] = fileData;
      uploadedPhoto = fileData;

      // delete previous image
      deleteImage({
        folder: "photos",
        image: existingMarathon.data?.imagePath || "",
      });
    }

    //Validate incoming body data with defined schema
    const validatedData = updateMarathonDTOSchema.parse(formData);

    // create list of reward from form data
    if (validatedData.reward) {
      validatedData.rewards = validatedData.reward.split(";");
    }

    //update with validated data
    const updated = await marathonService.updateOne(validatedId, validatedData);

    if (!updated) {
      serverError("Marathon is not updated");
    }

    const responseData = {
      success: true,
      message: "Marathon updated successfully!",
      data: {
        ...updated,
        ...(updated?.imagePath && {
          imagePath: `${req.protocol}://${req.get("host")}/uploads/photos/${
            updated.imagePath
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

export { update as updateMarathon };
