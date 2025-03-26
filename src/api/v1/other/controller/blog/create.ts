import { Request, Response, NextFunction } from "express-serve-static-core";
import deleteImage from "../../../../../utils/delete-image";
import upload from "../../../../../utils/upload";
import otherService from "../../../../../lib/other/blog";
import { createBlogDTOSchema } from "../../../../../schemas/blog";

const create = async (req: Request, res: Response, next: NextFunction) => {
  let uploadedPhoto: any;

  try {
    uploadedPhoto = await upload.uploadPhoto(req, res, "imagePath");

    const formData = req.body;

    //Add photo into car validate schema
    if (uploadedPhoto) {
      formData["imagePath"] = uploadedPhoto;
    }

    //Validate incoming body data with defined schema
    const validatedData = createBlogDTOSchema.parse(formData);

    //create new with validated data
    const created = await otherService.createNew(validatedData);

    const responseData = {
      success: true,
      message: "New blog created successfully!",
      data: {
        ...created,
        ...(created.imagePath && {
          imagePath: `${req.protocol}://${req.get("host")}/uploads/photos/${
            created?.imagePath
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

export { create as createBlog };
