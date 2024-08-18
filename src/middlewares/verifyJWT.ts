import { Request, Response, NextFunction } from 'express';
import { JwtPayload, verify } from 'jsonwebtoken';
import config from '../config/config';
import { JwtHeader } from '../models/schemas/middlewareSchema';

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
        message: 'No JWT authorization Token available',
      });
    }

    const authToken = authorization.split(' ')[1];
    const decoded = verify(authToken, config.jwtSecret);
    const details = {
      id: (<JwtPayload>decoded).id,
      email: (<JwtPayload>decoded).email,
      email_verification: (<JwtPayload>decoded).email_verification,
      role: (<JwtPayload>decoded).role,
    };
    req.user = details;
    next();
  } catch (err: any) {
    return next({
      statusCode: 404,
      message: err.message,
    });
  }
};
