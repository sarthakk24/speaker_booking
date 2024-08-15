import { NextFunction, Request, Response } from 'express';
import Speaker from '../../../models/sql/speaker';
import { Op } from 'sequelize';
import Booking from '../../../models/sql/booking';

export const handleGetBooking = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set to midnight for comparison
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    // Define the time slots range
    const timeSlots = [
      '09:00',
      '10:00',
      '11:00',
      '12:00',
      '13:00',
      '14:00',
      '15:00',
      '16:00',
      '17:00',
      '18:00',
    ];

    const speakersWithBookedSlots = await Speaker.findAll({
      include: [
        {
          model: Booking,
          as: 'Bookings',
          attributes: ['time_slot', 'date'],
          where: {
            date: {
              [Op.in]: [today, tomorrow],
            },
          },
          required: false,
        },
      ],
    });

    const availableSlotsForSpeakers = speakersWithBookedSlots.map(
      (speaker: any) => {
        const bookedSlots = speaker.Bookings.map((booking: any) => ({
          time: booking.time_slot,
          date: booking.date.toISOString().split('T')[0], // YYYY-MM-DD
        }));

        const availableSlots: { [key: string]: string[] } = {};

        // Checking possible slots against booked slots
        timeSlots.forEach((time) => {
          [today, tomorrow].forEach((date) => {
            const dateStr = date.toISOString().split('T')[0];
            if (
              !bookedSlots.some(
                (slot: any) => slot.time === time && slot.date === dateStr
              )
            ) {
              if (!availableSlots[dateStr]) {
                availableSlots[dateStr] = [];
              }
              availableSlots[dateStr].push(time);
            }
          });
        });

        return {
          speaker,
          availableSlots,
        };
      }
    );

    console.log(availableSlotsForSpeakers);

    res.status(200).json({
      success: true,
      message: 'Bookings retrieved successful',
      availableSlotsForSpeakers,
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
