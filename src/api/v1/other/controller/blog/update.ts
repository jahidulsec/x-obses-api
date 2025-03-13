import { Request, Response, NextFunction } from "express-serve-static-core";
import { notFoundError, serverError } from "../../../../../utils/errors";
import deleteImage from "../../../../../utils/delete-image";
import upload from "../../../../../utils/upload";
import otherService from "../../../../../lib/other/blog";
import { requiredIdSchema } from "../../../../../schemas/required-id";
import { updateBlogDTOSchema } from "../../../../../schemas/blog";

const update = async (req: Request, res: Response, next: NextFunction) => {
  let uploadedPhoto: string | null = null;

  try {
    //Validate incoming body data with defined schema
    const validatedId = requiredIdSchema.parse(req.params);

    // get form data
    const fileData = await upload.uploadPhoto(req, res, "imagePath");

    const formData = req.body;

    //check existing zone
    const existingMarathon = await otherService.getSingle(validatedId);

    if (!existingMarathon) {
      //send not found error if not exist
      notFoundError("Marathon does not exist");
    }

    if (fileData) {
      formData["imagePath"] = fileData;
      uploadedPhoto = fileData;

      console.log(formData["imagePath"]);

      // delete previous image
      deleteImage({
        folder: "photos",
        image: existingMarathon?.imagePath || "",
      });
    }

    //Validate incoming body data with defined schema
    const validatedData = updateBlogDTOSchema.parse(formData);

    //update with validated data
    const updated = await otherService.updateOne(validatedId, validatedData);

    if (!updated) {
      serverError("Blog is not updated");
    }

    const responseData = {
      success: true,
      message: "Blog updated successfully!",
      data: updated,
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

export { update as updateBlog };
