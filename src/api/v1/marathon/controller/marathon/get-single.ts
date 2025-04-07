import { Request, Response, NextFunction } from "express-serve-static-core";
import { requiredIdSchema } from "../../../../../schemas/required-id";
import marathonService from "../../../../../lib/marathon/marathon";
import { notFoundError } from "../../../../../utils/errors";

const get = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // get auth info
    const authUser = req.user;

    //Validate incoming body data with defined schema
    const validatedData = requiredIdSchema.parse(req.params);

    //get single item with validated id
    const data = await marathonService.getSingle(validatedData);

    if (!data) {
      notFoundError("Marathon not found!");
    }

    if (authUser?.role === "user") {
      //get single item with validated id
      const userMarathon = await marathonService.getSingleByUserId(
        validatedData,
        authUser.id as string
      );

      const modifiedParticientsData = data.participants.map((item) => {
        return {
          ...item.user,
          imagePath: `${req.protocol}://${req.get("host")}/uploads/photos/${
            item.user.image
          }`,
        };
      });

      const responseData = {
        success: true,
        message: "Get Marathon details successfully!",
        data: {
          ...data.data,
          ...(data.data?.imagePath && {
            imagePath: `${req.protocol}://${req.get("host")}/uploads/photos/${
              data.data.imagePath
            }`,
          }),
          joined: userMarathon.data?.id === data.data?.id,
        },
        totalParticiants: data.totalParticiants,
        particiants: modifiedParticientsData,
      };

      //send success response
      return res.status(200).json(responseData);
    }

    const modifiedParticientsData = data.participants.map((item) => {
      return {
        ...item.user,
        imagePath: `${req.protocol}://${req.get("host")}/uploads/photos/${
          item.user.image
        }`,
      };
    });

    const responseData = {
      success: true,
      message: "Get Marathon details successfully!",
      data: {
        ...data.data,
        ...(data.data?.imagePath && {
          imagePath: `${req.protocol}://${req.get("host")}/uploads/photos/${
            data.data.imagePath
          }`,
        }),
      },
      totalParticiants: data.totalParticiants,
      particiants: modifiedParticientsData,
    };

    //send success response
    res.status(200).json(responseData);
  } catch (error) {
    console.log("ERROR : ", error);

    //send error response
    next(error);
  }
};

export { get as getSingle };
