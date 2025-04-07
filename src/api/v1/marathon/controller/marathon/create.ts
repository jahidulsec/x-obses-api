import { Request, Response, NextFunction } from "express-serve-static-core";
import deleteImage from "../../../../../utils/delete-image";
import upload from "../../../../../utils/upload";
import marathonService from "../../../../../lib/marathon/marathon";
import { createMarathonDTOSchema } from "../../../../../schemas/marathon";
import { badRequestError } from "../../../../../utils/errors";

const create = async (req: Request, res: Response, next: NextFunction) => {
  let uploadedPhoto: any;

  try {
    // get auth user
    const authUser = req.user;

    uploadedPhoto = await upload.uploadPhoto(req, res, "imagePath");

    const formData = req.body;

    //Add photo into car validate schema
    if (uploadedPhoto) {
      formData["imagePath"] = uploadedPhoto;
    }

    //Validate incoming body data with defined schema
    const validatedData = createMarathonDTOSchema.parse(formData);

    // create list of reward from form data
    validatedData.rewards = validatedData.reward.split(";");

    // add admin info
    validatedData.createdBy = authUser?.id ?? "";

    if (validatedData.type === "onsite" && !validatedData.location) {
      badRequestError("Location required for onsite marathon");
    } else {
      validatedData.location = "";
    }

    //create new with validated data
    const created = await marathonService.createNew(validatedData);

    const responseData = {
      success: true,
      message: "New marathon created successfully!",
      data: {
        ...created,
        ...(created?.imagePath && {
          imagePath: `${req.protocol}://${req.get("host")}/uploads/photos/${
            created.imagePath
          }`,
        }),
      },
    };

    //send success response
    res.status(201).json(responseData);
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

export { create as createMarathon };
