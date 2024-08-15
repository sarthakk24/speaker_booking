import { NextFunction, Request, Response } from 'express';
import Speaker from '../../../models/sql/speaker';

export const handleDeleteBooking = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { email, expertise } = req.body;

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
