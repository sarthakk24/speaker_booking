import { NextFunction, Request, Response } from 'express';
import Booking from '../../../models/sql/booking';
import { createNodemailerMail, sendEmail } from '../../../utils/mailer/ses';

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

    if (booking.dataValues.user_email != req.user?.email) {
      throw {
        statusCode: 401,
        message: `${req.user?.email} are not authorized to update this booking`,
      };
    }

    if (!req.user?.verified) {
      throw {
        success: false,
        message: `${req.user?.email} is not verified.`,
      };
    }

    const subject = `Booking Cancellation confirmation`;

    const emailHTML = `
      <h1>Booking Cancellation Confirmation</h1>
      <p>Dear ,</p>
      <p>Your booking with ${booking.dataValues.user_email} on ${booking.dataValues.time_slot} has been cancelled
      <p>You can view more details or make changes to your booking by visiting our website
      <p>Thank you for choosing our service.</p>
    `;

    const emailText = `
      Dear,
      Your booking ${booking.dataValues.user_email} on  ${booking.dataValues.time_slot} has been cancelled.
      Thank you for choosing our service.
    `;

    const speakerMail = createNodemailerMail(
      emailHTML,
      emailText,
      subject,
      booking.dataValues.speaker_email
    );

    const userMail = createNodemailerMail(
      emailHTML,
      emailText,
      subject,
      booking.dataValues.user_email
    );

    await sendEmail(speakerMail);
    await sendEmail(userMail);

    await Booking.destroy({
      where: { id: bookingId },
    });

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
