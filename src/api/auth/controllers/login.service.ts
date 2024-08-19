import { NextFunction, Request, Response } from 'express';
import * as bcrypt from 'bcrypt';
import { sign } from 'jsonwebtoken';
import config from '../../../config/config';
import User from '../../../models/sql/user';
import Speaker from '../../../models/sql/speaker';

const signinUser = async (email: string, password: string, role: string) => {
  const userExists =
    role == 'user'
      ? await User.findOne({
          where: {
            email,
          },
        })
      : await Speaker.findOne({
          where: {
            email,
          },
        });

  if (!userExists) {
    throw {
      statusCode: 400,
      message: 'Please create an account and try again',
    };
  }

  const user = userExists.dataValues;

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) {
    throw {
      statusCode: 400,
      message: 'Please check your password',
    };
  }
  delete user['id'];
  delete user['password'];
  delete user['_deleted'];
  delete user['createdAt'];
  delete user['updatedAt'];

  const jwtToken = sign(
    {
      id: user['id'],
      email: user['email'],
      role,
      verified: user['email_verification'],
    },
    config.jwtSecret,
    {
      issuer: 'Sarthak Sachdeva',
      expiresIn: '72h',
    }
  );

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
    const { email, password, role } = req.body;
    const resData = await signinUser(email, password, role);
    res.status(200).json({
      success: true,
      message: 'Login successful',
      data: resData,
    });
    next();
  } catch (err: any) {
    res.status(err.statusCode || 500).json({
      success: false,
      message: err.message || '❌ Unknown Error Occurred !! ',
      data: err.data,
    });
  }
};
