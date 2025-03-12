import { Request, Response, NextFunction } from "express-serve-static-core";

const get = async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.send("ok");
  } catch (error) {
    console.log("ERROR : ", error);

    //send error response
    next(error);
  }
};

export {get as getSingle}