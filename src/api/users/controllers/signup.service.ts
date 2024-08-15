import { NextFunction, Request, Response } from 'express';
import User from '../../../models/sql/user';
import * as bcrypt from 'bcrypt';

const signupUser = async (
  first_name: string,
  last_name: string,
  email: string,
  password: string
): Promise<any> => {
  const userExist = await User.findOne({
    where: {
      email,
    },
  });

  if (userExist) {
    throw {
      statusCode: 400,
      message: 'user wih same email already exists',
    };
  }

  const saltRounds = 10;
  const hash = await bcrypt.hash(password, saltRounds);

  const newUser = await User.create({
    first_name,
    last_name,
    email,
    password: hash,
  });
  return newUser;
};

export const handleSignUp = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { first_name, last_name, email, password } = req.body;

    const newUser = await signupUser(first_name, last_name, email, password);

    res.status(200).json({
      success: true,
      message: 'Thank you for signing up',
      data: newUser,
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
