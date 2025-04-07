import { Request, Response, NextFunction } from "express-serve-static-core";
import { paginate } from "../../../../../utils/pagination";
import marathonService from "../../../../../lib/marathon/marathon";
import { marathonsQuerySchema } from "../../../../../schemas/marathon";

const get = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // get auth user
    const authUser = req.user;

    // validate incoming body data with defined schema
    const validatedQuery = marathonsQuerySchema.parse(req.query);

    //get single item with validated id
    const data = await marathonService.getMulti(validatedQuery);

    if (authUser?.role === "user") {
      //get single item with validated id
      const userData = await marathonService.getMultiByUserId(
        validatedQuery,
        authUser.id as string
      );

      const modifiedData = data.data.map((item) => {
        return {
          ...item,
          imagePath: `${req.protocol}://${req.get("host")}/uploads/photos/${
            item.imagePath
          }`,
          joined:
            userData.data.filter((userMarathon) => userMarathon.id === item.id)
              .length > 0,
        };
      });

      const responseData = {
        success: true,
        message: "Get marathons successfully!",
        data: modifiedData,
        pagination: {
          ...paginate(data.page, data.size, data.count),
        },
      };

      //send success response
      return res.status(200).json(responseData);
    }

    const modifiedData = data.data.map((item) => {
      return {
        ...item,
        imagePath: `${req.protocol}://${req.get("host")}/uploads/photos/${
          item.imagePath
        }`,
      };
    });

    const responseData = {
      success: true,
      message: "Get marathons successfully!",
      data: modifiedData,
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
