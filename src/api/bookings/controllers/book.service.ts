import { NextFunction, Request, Response } from 'express';
import Booking from '../../../models/sql/booking';
import User from '../../../models/sql/user';
import { getIcalObjectInstance, subtractTime } from '../../../loaders/calendar';
import { createNodemailerMail, sendEmail } from '../../../utils/mailer/ses';

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

    const [year, month, day] = date.split('-').map(Number);
    const [hours, minutes] = time_slot.split(':').map(Number);

    const dateTimeIST = new Date(
      Date.UTC(year, month - 1, day, hours - 5, minutes - 30)
    );

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

    if (bookingExists) {
      throw {
        success: false,
        message:
          'Booking already exists for the given speaker, time slot, and date.',
      };
    }

    const startTime = new Date(dateTimeIST);
    const endTime = new Date(startTime.getTime() + 60 * 60 * 1000);
    const organizer = {
      name: 'Sarthak Sachdeva',
      email: 'sarthak.sachdeva.73@gmail.com',
    };
    const location = 'Remote event';
    const summary = 'Speaker booking confirmation';
    const icalObject = getIcalObjectInstance(
      startTime,
      endTime,
      summary,
      'Speaker Booking confirmation',
      'Remote event',
      'https://www.google.co.in/',
      organizer
    );

    const subject = `Booking Confirmation: ${summary}`;

    const emailHTML = `
      <h1>Booking Confirmation</h1>
      <p>Dear ${organizer.name},</p>
      <p>Your booking has been confirmed. Here are the details:</p>
      <h2>${summary}</h2>
      <p><strong>Date and Time:</strong> ${subtractTime(
        startTime,
        5,
        30
      )} - ${subtractTime(endTime, 5, 30)}</p>
      <p><strong>Location: ${location}</strong> </p>
      <p>You can view more details or make changes to your booking by visiting
      <p>Thank you for choosing our service.</p>
    `;

    const emailText = `
      Dear ${organizer.name},
      Your booking has been confirmed. Here are the details:
      ${summary}
      Date and Time: ${subtractTime(startTime, 5, 30)} - ${subtractTime(
      endTime,
      5,
      30
    )}

      Location: ${location}
      
      Thank you for choosing our service.
    `;

    const speakerMail = createNodemailerMail(
      emailHTML,
      emailText,
      subject,
      speaker_email,
      icalObject
    );

    const userMail = createNodemailerMail(
      emailHTML,
      emailText,
      subject,
      req.user.email,
      icalObject
    );

    await sendEmail(speakerMail);
    await sendEmail(userMail);

    await Booking.create({
      user_id: id,
      user_email: email,
      speaker_id,
      speaker_email,
      time_slot: dateTimeIST,
      date,
      emails_sent: true,
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
