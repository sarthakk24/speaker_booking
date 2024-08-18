import aws from 'aws-sdk';
import nodemailer from 'nodemailer';
import config from '../../config/config';
import ical from 'ical-generator';

type ICalCalendar = ReturnType<typeof ical>;

const ses = new aws.SES({
  apiVersion: '2019-09-27',
  region: config.region,
  credentials: new aws.Credentials({
    accessKeyId: config.accessKeyId,
    secretAccessKey: config.secretAccessKey,
  }),
});

export const sendEmail = async (mail: any) => {
  let transporter = nodemailer.createTransport({
    SES: { ses, aws },
  });
  let request = transporter.sendMail(mail);
  return request;
};

export const createNodemailerMail = (
  html: string,
  text: string,
  subject: string,
  receiverEmail: string,
  calendarObj?: ICalCalendar // Adding calendarObj as an optional parameter
) => {
  const attachments = calendarObj
    ? [
        {
          filename: 'invite.ics',
          content: calendarObj.toString(),
          contentType: 'text/calendar; charset=UTF-8; method=REQUEST',
          headers: {
            'Content-Class': 'urn:content-classes:calendarmessage',
          },
        },
      ]
    : [];

  const mailOptions: nodemailer.SendMailOptions = {
    from: config.from,
    to: receiverEmail,
    replyTo: config.replyTo,
    subject,
    text,
    html,
    attachments,
  };

  return mailOptions;
};
