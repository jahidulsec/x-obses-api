import { Request, Response, NextFunction } from "express-serve-static-core";
import { paginate } from "../../../../../utils/pagination";
import marathonService from "../../../../../lib/marathon/user";
import { marathonUsersQuerySchema } from "../../../../../schemas/marathon-user";

const get = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // validate incoming body data with defined schema
    const validatedQuery = marathonUsersQuerySchema.parse(req.query);

    //get single item with validated id
    const data = await marathonService.getMulti(validatedQuery);

    const responseData = {
      success: true,
      message: "Get marathon users successfully!",
      data: data.data.map((item) => {
        return {
          ...item,
          user: {
            fullName: item.user.fullName,
            imagePath: item.user.image ? `${req.protocol}://${req.get("host")}/uploads/photos/${
              item.user.image
            }` : null,
          },
        };
      }),
      pagination: {
        ...paginate(data.page, data.size, data.count),
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

export { get as getMulti };
