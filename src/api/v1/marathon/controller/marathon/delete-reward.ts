import { Request, Response, NextFunction } from "express-serve-static-core";
import marathonService from "../../../../../lib/marathon/marathon";
import { requiredIdSchema } from "../../../../../schemas/required-id";
import { serverError } from "../../../../../utils/errors";

const deleteOne = async (req: Request, res: Response, next: NextFunction) => {
  try {
    //Validate incoming body data with defined schema
    const validatedData = requiredIdSchema.parse(req.params);

    const deleted: any = await marathonService.deleteReward(validatedData.id);

    if (deleted == 0) {
      serverError("Reward is not deleted");
    }

    const responseData = {
      success: true,
      message: "Marathon reward is deleted successfully!",
      data: null,
    };

    //send success response
    res.status(200).json(responseData);
  } catch (error) {
    console.log("ERROR : ", error);

    //send error response
    next(error);
  }
};

export { deleteOne as deleteReward };
