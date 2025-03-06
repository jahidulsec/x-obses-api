import { Request, Response, NextFunction } from "express-serve-static-core";
import userService from "../../../../../lib/user/workout";
import { createWorkOutDTOSchema } from "../../../../../schemas/workout";
import { unauthorizedError } from "../../../../../utils/errors";

async function createNew(req: Request, res: Response, next: NextFunction) {
  try {
    const formData = req.body;

    // get user id from token
    const authUser = req.user;

    if (!authUser) {
      unauthorizedError("Invalid token");
    }

    // set userId from token
    formData["userId"] = authUser?.id as string;

    //Validate incoming body data with defined schema
    const validatedData = createWorkOutDTOSchema.parse(formData);

    let heartPts = 0;

    // calculate heart pts
    if (validatedData.type === "walking") {
      heartPts = validatedData.duration ?? 0;
    } else if (validatedData.type === "running") {
      heartPts = (validatedData.duration ?? 0) * 2;
    } else {
      heartPts = (validatedData.duration ?? 0) * 1.5;
    }

    validatedData.heartPts = heartPts;

    //create new with validated data
    const created = await userService.createNew(validatedData);

    const responseData = {
      success: true,
      message: "New user workout added successfully!",
      data: created,
    };

    //send success response
    res.status(201).json(responseData);
  } catch (error) {
    console.log("ERROR : ", error);

    //send error response
    next(error);
  }
}

export { createNew as createUserWorkout };
