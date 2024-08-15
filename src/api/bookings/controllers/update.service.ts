import { NextFunction, Request, Response } from 'express';
import Speaker from '../../../models/sql/speaker';

export const handleUpdateBooking = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { speaker_id, speaker_email, time_slot, date } = req.body;
    res.status(200).json({
      success: true,
      message: 'Booking updated successful',
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
