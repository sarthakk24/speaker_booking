import { NextFunction, Request, Response } from 'express';
import Booking from '../../../models/sql/booking';
import User from '../../../models/sql/user';

export const handleNewBooking = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { speaker_id, speaker_email, time_slot, date } = req.body;

    const userDetails = await User.findOne({
      where: {
        email: req.user?.email,
      },
    });

    if (!userDetails) {
      throw {
        success: false,
        message: 'user not found',
      };
    }

    const { id, email } = userDetails.dataValues;

    if (!req.user?.verified) {
      throw {
        success: false,
        message: `${req.user?.email} is not verified.`,
      };
    }

    // Combine date and time to create a new Date object
    const [year, month, day] = date.split('-').map(Number);
    const [hours, minutes] = time_slot.split(':').map(Number);

    // Create a Date object with IST offset (UTC + 5:30)
    const dateTimeIST = new Date(
      Date.UTC(year, month - 1, day, hours - 5, minutes - 30)
    );

    // Adjust back to IST by adding 5 hours 30 minutes
    dateTimeIST.setHours(
      dateTimeIST.getHours() + 5,
      dateTimeIST.getMinutes() + 30
    );

    const bookingExists = await Booking.findOne({
      where: {
        speaker_id,
        time_slot: dateTimeIST,
        date,
      },
    });

    // Check if booking already exists
    if (bookingExists) {
      throw {
        success: false,
        message:
          'Booking already exists for the given speaker, time slot, and date.',
      };
    }

    await Booking.create({
      user_id: id,
      user_email: email,
      speaker_id,
      speaker_email,
      time_slot: dateTimeIST,
      date,
    });

    res.status(200).json({
      success: true,
      message: 'Booking created successful',
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
