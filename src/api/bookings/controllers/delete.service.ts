import { NextFunction, Request, Response } from 'express';
import Booking from '../../../models/sql/booking';

export const handleDeleteBooking = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const bookingId = req.params.id;

    const booking = await Booking.findOne({
      where: { id: bookingId },
    });

    if (!booking) {
      res.status(404).json({
        success: false,
        message: 'Booking not found',
      });
      return;
    }

    const result = await Booking.destroy({
      where: { id: bookingId },
    });

    if (result === 0) {
      res.status(404).json({
        success: false,
        message: 'Booking not found',
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: 'Booking deleted successful',
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
