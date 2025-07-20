import { Request, Response, NextFunction } from "express-serve-static-core";
import { paginate } from "../../../../../utils/pagination";
import otherService from "../../../../../lib/other/banner";
import { bannersQuerySchema } from "../../../../../schemas/banner";

const get = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // validate incoming body data with defined schema
    const validatedQuery = bannersQuerySchema.parse(req.query);

    //get single item with validated id
    const data = await otherService.getMulti(validatedQuery);

    const modifiedData = data.data.map((item) => {
      return {
        ...item,
        ...(item.imagePath && {
          imagePath: `${req.protocol}://${req.get("host")}/uploads/photos/${
            item.imagePath
          }`,
        }),
      };
    });

    const responseData = {
      success: true,
      message: "Get banners successfully!",
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

export { get as getBanners };
