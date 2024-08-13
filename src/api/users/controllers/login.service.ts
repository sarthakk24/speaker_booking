import { NextFunction, Request, Response } from "express";
import { Op } from "sequelize";
import User from "../../../models/sql/user";
import * as bcrypt from "bcrypt";
import { sign, JwtPayload } from "jsonwebtoken";
import config from "../../../config/config";
const signinUser = async (identity: string, password: string) => {
  const userExists = await User.findOne({
    where: {
      [Op.or]: [{ username: identity }, { email: identity }],
    },
  });

  if (!userExists) {
    throw {
      statusCode: 400,
      message: "Please create an account and try again",
    };
  }

  const user = userExists.dataValues;

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) {
    throw {
      statusCode: 400,
      message: "Please check your password",
    };
  }
  delete user["password"];

  const jwtToken = sign({ id: user["id"] }, config.jwtSecret, {
    issuer: "Sarthak Sachdeva",
    expiresIn: "72h",
  });

  return {
    token: jwtToken,
    user,
  };
};

export const handleLogin = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { identity, password } = req.body;
    const resData = await signinUser(identity, password);
    res.status(200).json({
      success: true,
      message: "Login successful",
      data: resData,
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
