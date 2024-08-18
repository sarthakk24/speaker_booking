import { NextFunction, Request, Response } from 'express';
import Speaker from '../../../models/sql/speaker';

export const handleUpdateExpertise = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { expertise } = req.body;
    const email = req.user?.email;

    const speakerExists = await Speaker.findAll({
      where: {
        email,
      },
    });

    if (!speakerExists) {
      throw {
        status: 404,
        message: 'no speaker found',
        data: email,
      };
    }

    if (!req.user?.verified) {
      throw {
        status: 401,
        message: `${req.user?.email} is not verified.`,
        data: email,
      };
    }

    const result = await Speaker.update(
      { expertise },
      {
        where: { email },
      }
    );

    console.log(result);

    res.status(200).json({
      success: true,
      message: 'Expertise updated successful',
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
