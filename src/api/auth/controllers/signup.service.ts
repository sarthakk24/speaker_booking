import { NextFunction, Request, Response } from 'express';
import * as bcrypt from 'bcrypt';
import User from '../../../models/sql/user';
import Speaker from '../../../models/sql/speaker';

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
      message: 'User with the same email already exists',
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

  const sanitizedUser = newUser.get({ plain: true });
  delete sanitizedUser.password;
  delete sanitizedUser.updatedAt;
  delete sanitizedUser.createdAt;
  delete sanitizedUser._deleted;

  return sanitizedUser;
};

const signupSpeaker = async (
  first_name: string,
  last_name: string,
  email: string,
  password: string,
  price_per_session: number,
  expertise: string
): Promise<any> => {
  const speakerExist = await Speaker.findOne({
    where: {
      email,
    },
  });

  if (speakerExist) {
    throw {
      statusCode: 400,
      message: 'Speaker with the same email already exists',
    };
  }

  const saltRounds = 10;
  const hash = await bcrypt.hash(password, saltRounds);

  const newSpeaker = await Speaker.create({
    first_name,
    last_name,
    email,
    password: hash,
    price_per_session,
    expertise,
  });

  const sanitizedSpeaker = newSpeaker.get({ plain: true });
  delete sanitizedSpeaker.password;
  delete sanitizedSpeaker.updatedAt;
  delete sanitizedSpeaker.createdAt;
  delete sanitizedSpeaker._deleted;

  return sanitizedSpeaker;
};

export const handleSignUpUser = async (
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
      message: err.message || '❌ Unknown Error Occurred !!',
      data: err.data,
    });
  }
};

export const handleSignUpSpeaker = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const {
      first_name,
      last_name,
      email,
      password,
      price_per_session,
      expertise,
    } = req.body;
    const newSpeaker = await signupSpeaker(
      first_name,
      last_name,
      email,
      password,
      price_per_session,
      expertise
    );

    res.status(200).json({
      success: true,
      message: 'Thank you for signing up',
      data: newSpeaker,
    });

    next();
  } catch (err: any) {
    res.status(err.statusCode || 500).json({
      success: false,
      message: err.message || '❌ Unknown Error Occurred !!',
      data: err.data,
    });
  }
};
