import { NextFunction, Request, Response } from 'express';
import Speaker from '../../../models/sql/speaker';
import { Op } from 'sequelize';
import Booking from '../../../models/sql/booking';

interface BookingAttributes {
  time_slot: string;
  date: string;
}

interface SpeakerAttributes {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  email_verification: boolean;
  price_per_session: number;
  expertise: string;
  _deleted: boolean;
  createdAt: Date;
  updatedAt: Date;
  Bookings: BookingAttributes[];
}

interface AvailableSlots {
  [date: string]: string[];
}

interface AvailableSlotsForSpeaker {
  speaker: SpeakerAttributes;
  availableSlots: AvailableSlots;
}

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

    const dayAfterTomorrow = new Date(today);
    dayAfterTomorrow.setDate(today.getDate() + 2);

    // Define the time slots range
    const timeSlots: string[] = [
      '09:00',
      '10:00',
      '11:00',
      '12:00',
      '13:00',
      '14:00',
      '15:00',
    ];

    const speakersWithBookedSlots = await Speaker.findAll({
      include: [
        {
          model: Booking,
          as: 'Bookings',
          attributes: ['time_slot', 'date'],
          where: {
            date: {
              [Op.in]: [
                tomorrow.toISOString().split('T')[0],
                dayAfterTomorrow.toISOString().split('T')[0],
              ],
            },
          },
          required: false,
        },
      ],
    });

    const availableSlotsForSpeakers: AvailableSlotsForSpeaker[] =
      speakersWithBookedSlots.map((speaker: any) => {
        // Transform booked slots to be easier to work with
        const bookedSlots = speaker.Bookings.map((booking: any) => ({
          time:
            new Date(booking.time_slot)
              .toISOString()
              .split('T')[1]
              .split(':')[0] + ':00', // Extract hour and minute
          date: booking.date,
        }));

        const availableSlots: AvailableSlots = {};

        // Check all possible slots against booked slots
        timeSlots.forEach((time) => {
          [tomorrow, dayAfterTomorrow].forEach((date) => {
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
      });

    res.status(200).json({
      success: true,
      message: 'Bookings retrieved successfully',
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
