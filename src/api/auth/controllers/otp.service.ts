import { NextFunction, Request, Response } from 'express';
import Speaker from '../../../models/sql/speaker';
import User from '../../../models/sql/user';
import { sendEmail, createNodemailerMail } from '../../../utils/mailer/ses';
import { generateOTP } from '../../../utils/OTP/generateOtp';

export const handleGenerate = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { email, role } = req.body;

    const otp = generateOTP();

    const emailHTML = `
  <h1>Email Verification</h1>
  <p>Your One-Time Password (OTP) for email verification is:</p>
  <h2>${otp}</h2>
  <p>Please enter this code in the verification form to verify your email address.</p>
`;

    const emailText = `Your One-Time Password (OTP) for email verification is: ${otp}. Please enter this code in the verification form to verify your email address.`;

    const subject = 'Email Verification OTP';

    const mail = createNodemailerMail(emailHTML, emailText, subject, email);

    await sendEmail(mail);
    res.status(200).json({
      success: true,
      message: 'Otp sent to registered email successful',
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

export const handleVerify = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { email, otp, role } = req.body;

    if (role == 'speaker') {
      const result = await Speaker.update(
        { email_verification: true },
        {
          where: { email },
        }
      );

      console.log(result);
    } else {
      const result = await User.update(
        { email_verification: true },
        {
          where: { email },
        }
      );

      console.log(result);
    }
    res.status(200).json({
      success: true,
      message: 'Otp verified successful',
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
