import { Request, Response, NextFunction } from "express-serve-static-core";
import { requiredIdSchema } from "../../../../../schemas/required-id";
import marathonService from "../../../../../lib/marathon/marathon";
import { notFoundError } from "../../../../../utils/errors";

const get = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const [total, onsite, virtual] = await Promise.all([
      marathonService.getStats(),
      marathonService.getStats("onsite"),
      marathonService.getStats("virtual"),
    ]);

    const responseData = {
      success: true,
      message: "Get Marathon details successfully!",
      data: {
        total,
        onsite,
        virtual,
      },
    };

    //send success response
    res.status(200).json(responseData);
  } catch (error) {
    console.log("ERROR : ", error);

    //send error response
    next(error);
  }
};

export { get as getMarathonStats };
