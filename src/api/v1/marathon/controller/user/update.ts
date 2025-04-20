import { Request, Response, NextFunction } from "express-serve-static-core";
import {
  forbiddenError,
  notFoundError,
  serverError,
  unauthorizedError,
} from "../../../../../utils/errors";
import { updateMarathonUserDTOSchema } from "../../../../../schemas/marathon-user";
import marathonUserService from "../../../../../lib/marathon/user";
import marathonService from "../../../../../lib/marathon/marathon";
import { requiredIdSchema } from "../../../../../schemas/required-id";

const update = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // get user id from token
    const authUser = req.user;

    //Validate incoming body data with defined schema
    const validatedId = requiredIdSchema.parse(req.params);

    const formData = req.body;

    //check existing marathon user
    const existingMarathonUser = await marathonUserService.getSingle(
      validatedId
    );

    if (!existingMarathonUser) {
      //send not found error if not exist
      notFoundError("Marathon user does not exist");
    }

    if (authUser?.id !== existingMarathonUser?.userId) {
      forbiddenError("Unauthorized");
    }

    //check existing marathon
    const existingMarathon = await marathonService.getSingle({
      id: existingMarathonUser?.marathonId as string,
    });

    if (!existingMarathon) {
      //send not found error if not exist
      notFoundError("Marathon does not exist");
    }

    //Validate incoming body data with defined schema
    const validatedData = updateMarathonUserDTOSchema.parse(formData);

    // set data from validation
    validatedData.marathonId = existingMarathon.data?.id;
    validatedData.userId = existingMarathonUser?.userId;

    // distance check
    if (
      (validatedData?.distanceKm ?? 0) >
      Number(existingMarathon.data?.distanceKm)
    ) {
      validatedData.distanceKm = existingMarathon.data?.distanceKm;
    }

    //update with validated data
    const updated = await marathonUserService.updateOne(validatedId, validatedData);

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
