import { Request, Response, NextFunction } from "express-serve-static-core";
import { paginate } from "../../../../../utils/pagination";
import adminService from "../../../../../lib/admin";
import { adminsQuerySchema } from "../../../../../schemas/admin";

const get = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // validate incoming body data with defined schema
    const validatedQuery = adminsQuerySchema.parse(req.query);

    //get single item with validated id
    const data = await adminService.getMulti(validatedQuery);

    const responseData = {
      success: true,
      message: "Get admins successfully!",
      data: data.data,
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
