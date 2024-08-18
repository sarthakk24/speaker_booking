import { NextFunction, Request, Response } from 'express';
import Speaker from '../../../models/sql/speaker';
import User from '../../../models/sql/user';
import { sendEmail, createNodemailerMail } from '../../../utils/mailer/ses';
import { storeOtp, verifyOtp } from '../../../utils/OTP/otpServices';

export const handleGenerate = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { email, role } = req.body;

    let user;

    if (role == 'speaker') {
      user = await Speaker.findOne({
        where: { email },
      });
    } else {
      user = await User.findOne({
        where: { email },
      });
    }

    if (!user) {
      throw {
        message: `No user found with this mail : ${email}`,
      };
    }

    if (user.dataValues.email_verification) {
      throw {
        message: `User mail : ${email} is already verified`,
      };
    }

    const otp = await storeOtp(user.dataValues.id);

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

    let user;

    if (role == 'speaker') {
      user = await Speaker.findOne({
        where: { email },
      });
    } else {
      user = await User.findOne({
        where: { email },
      });
    }

    if (!user) {
      throw {
        success: true,
        message: `No user found with mail ${email}`,
      };
    }

    const otpVerification = await verifyOtp(user.dataValues.id, otp);

    if (!otpVerification) {
      throw {
        success: false,
        message: 'Otp verification failed.',
      };
    }

    if (role == 'speaker') {
      await Speaker.update(
        { email_verification: true },
        { where: { id: user.dataValues.id } }
      );
    } else {
      await User.update(
        { email_verification: true },
        { where: { id: user.dataValues.id } }
      );
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
