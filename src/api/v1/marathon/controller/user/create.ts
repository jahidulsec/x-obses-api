import { Request, Response, NextFunction } from "express-serve-static-core";
import { notFoundError, unauthorizedError } from "../../../../../utils/errors";
import userService from "../../../../../lib/user/profile";
import marathonService from "../../../../../lib/marathon/user";
import { createMarathonUserDTOSchema } from "../../../../../schemas/marathon-user";

const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // get form data
    const formData = req.body;

    // get user id from token
    const authUser = req.user;

    //check existing zone
    const existingUser = await userService.getSingle({
      id: authUser?.id as string,
    });

    if (!existingUser) {
      //send not found error if not exist
      notFoundError("User does not exist");
    }

    formData["userId"] = authUser?.id as string;


    // Validate incoming body data with defined schema
    const validatedData = createMarathonUserDTOSchema.parse(formData);

    // create new with validated data
    const created = await marathonService.createNew(validatedData);

    const responseData = {
      success: true,
      message: "Your are added to this marathon successfully!",
      data: created,
    };

    // send success response
    res.status(201).json(responseData);
  } catch (error) {
    console.log("ERROR : ", error);

    //send error response

    next(error);
  }
};

export { create as createMarathonUser };
