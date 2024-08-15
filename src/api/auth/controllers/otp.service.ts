import { NextFunction, Request, Response } from 'express';
import Speaker from '../../../models/sql/speaker';
import User from '../../../models/sql/user';

export const handleGenerate = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    // const { email, password, role } = req.body;
    // const resData = await signinUser(email, password, role);
    res.status(200).json({
      success: true,
      message: 'Otp sent to registered email successful',
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

export const handleVerify = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { email, otp, role } = req.body;

    if (role == 'speaker') {
      const result = await Speaker.update(
        { email_verification: true },
        {
          where: { email },
        }
      );

      console.log(result);
    } else {
      const result = await User.update(
        { email_verification: true },
        {
          where: { email },
        }
      );

      console.log(result);
    }
    res.status(200).json({
      success: true,
      message: 'Otp verified successful',
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
