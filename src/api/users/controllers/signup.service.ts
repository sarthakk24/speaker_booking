import { NextFunction, Request, Response } from 'express';
import { Op } from 'sequelize';
import User from '../../../models/sql/user';
import * as bcrypt from 'bcrypt';

const signupUser = async (
  first_name: string,
  last_name: string,
  username: string,
  email: string,
  password: string
): Promise<any> => {
  const userExist = await User.findOne({
    where: {
      [Op.or]: [{ username }, { email }],
    },
  });

  if (userExist) {
    if (userExist.dataValues.username === username) {
      throw {
        statusCode: 400,
        message: 'user with same username already exists',
      };
    }
    if (userExist.dataValues.email === email) {
      throw {
        statusCode: 400,
        message: 'user wih same email already exists',
      };
    }
  }

  const saltRounds = 10;
  const hash = await bcrypt.hash(password, saltRounds);

  const newUser = await User.create({
    first_name,
    last_name,
    email,
    username,
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
    const { first_name, last_name, email, username, password } = req.body;

    const newUser = await signupUser(
      first_name,
      last_name,
      email,
      username,
      password
    );

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
