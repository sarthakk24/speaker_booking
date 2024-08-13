import { Request, Response, NextFunction } from "express";
import { JwtPayload, verify } from "jsonwebtoken";
import config from "../config/config";
import { JwtHeader } from "../models/schemas/middlewareSchema";
// import { JwtHeader } from "jsonwebtoken";

export const validateJwt = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { authorization } = req.headers as JwtHeader;
    if (!authorization) {
      return next({
        statusCode: 401,
        message: "No JWT authorization Token available",
      });
    }

    const authToken = authorization.split(" ")[1];
    const decoded = verify(authToken, config.jwtSecret);
    req.user = (<JwtPayload>decoded).id;
    next();
  } catch (err: any) {
    return next({
      statusCode: 404,
      message: err.message,
    });
  }
};
