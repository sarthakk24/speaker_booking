import { NextFunction, Request, Response } from 'express';
import Booking from '../../../models/sql/booking';
import { Op } from 'sequelize';

export const handleUpdateBooking = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const booking_id = req.params.id;
    const { time_slot, date } = req.body;
    const existingBooking = await Booking.findOne({
      where: { id: booking_id },
    });

    if (!existingBooking) {
      res.status(404).json({
        success: false,
        message: 'Booking not found',
      });
      return;
    }

    const [year, month, day] = date.split('-').map(Number);
    const [hours, minutes] = time_slot.split(':').map(Number);

    const newDateTimeIST = new Date(
      Date.UTC(year, month - 1, day, hours - 5, minutes - 30)
    );

    newDateTimeIST.setHours(
      newDateTimeIST.getHours() + 5,
      newDateTimeIST.getMinutes() + 30
    );

    const conflictingBooking = await Booking.findOne({
      where: {
        speaker_id: existingBooking.dataValues.speaker_id,
        time_slot: newDateTimeIST,
        date,
        id: { [Op.ne]: booking_id }, // Exclude the current booking
      },
    });

    if (conflictingBooking) {
      res.status(400).json({
        success: false,
        message:
          'The new date and time slot are already booked for the same speaker.',
      });
      return;
    }

    // Update the booking
    await Booking.update(
      { time_slot: newDateTimeIST, date },
      { where: { id: booking_id } }
    );

    res.status(200).json({
      success: true,
      message: 'Booking updated successfully',
    });
    next();
  } catch (err: any) {
    console.log(err);

    res.status(err.statusCode || 500).json({
      success: false,
      message: err.message || '❌ Unknown Error Occurred !! ',
      data: err.data,
    });
  }
};
