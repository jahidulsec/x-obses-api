import { Request, Response, NextFunction } from "express-serve-static-core";
import {
  notFoundError,
  serverError,
  unauthorizedError,
} from "../../../../../utils/errors";
import { updateMarathonUserDTOSchema } from "../../../../../schemas/marathon-user";
import marathonService from "../../../../../lib/marathon/user";
import { requiredIdSchema } from "../../../../../schemas/required-id";

const update = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // get user id from token
    const authUser = req.user;

    //Validate incoming body data with defined schema
    const validatedId = requiredIdSchema.parse(req.params);

    const formData = req.body;

    //check existing zone
    const existingMarathonUser = await marathonService.getSingle(validatedId);

    if (!existingMarathonUser) {
      //send not found error if not exist
      notFoundError("Marathon does not exist");
    }

    if (!authUser || authUser.id !== existingMarathonUser?.userId) {
      unauthorizedError("Unauthorized");
    }

    //Validate incoming body data with defined schema
    const validatedData = updateMarathonUserDTOSchema.parse(formData);

    //update with validated data
    const updated = await marathonService.updateOne(validatedId, validatedData);

    if (!updated) {
      serverError("Marathon user is not updated");
    }

    const responseData = {
      success: true,
      message: "Marathon user updated successfully!",
      data: updated,
    };

    //send success response
    res.status(200).json(responseData);
  } catch (error) {
    console.log("ERROR : ", error);

    //send error response
    next(error);
  }
};

export { update as updateMarathonUser };
