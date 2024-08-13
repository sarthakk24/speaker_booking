import { NextFunction, Request, Response } from "express";
import User from "../../../models/sql/user";

export const handleProfileView = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const data = await User.findOne({
      where: {
        id: `${req.params.id}`,
      },
    });

    if (!data) {
      throw {
        statusCode: 404,
        message: "User not found",
      };
    }
    res.status(200).json({
      success: true,
      message: `Profile of user : ${data.dataValues.id} name : ${data.dataValues.username} successful`,
      data,
    });
    next();
  } catch (err: any) {
    res.status(err.statusCode || 500).json({
      success: false,
      message: err.message || "❌ Unknown Error Occurred !! ",
      data: err.data,
    });
  }
};
