import * as yup from 'yup';

// UUID validation schema
export const yupObjIdSchema = yup.object({
  id: yup
    .string()
    .required('ID is required.')
    .trim()
    .matches(
      /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/,
      'ID must be a valid UUID.'
    ),
});

// Authentication validation schemas
export const yupLoginSchema = yup.object({
  email: yup
    .string()
    .email('Email must be a valid email address.')
    .required('Email is required.')
    .trim(),
  password: yup.string().required('Password is required.').trim(),
  role: yup.string().required('Role is required.').trim(),
});

export const yupUserSignupSchema = yup.object().shape({
  first_name: yup.string().trim().required('First name is required.'),
  last_name: yup.string().trim().required('Last name is required.'),
  email: yup
    .string()
    .email('Email must be a valid email address.')
    .trim()
    .required('Email is required.'),
  password: yup.string().trim().required('Password is required.'),
});

export const yupSpeakerSignupSchema = yup.object().shape({
  first_name: yup.string().trim().required('First name is required.'),
  last_name: yup.string().trim().required('Last name is required.'),
  email: yup
    .string()
    .email('Email must be a valid email address.')
    .trim()
    .required('Email is required.'),
  password: yup.string().trim().required('Password is required.'),
  price_per_session: yup
    .number()
    .required('Price per session is required.')
    .positive('Price must be a positive number.'),
  expertise: yup.string().trim().required('Expertise is required.'),
});

export const yupOtpVerifySchema = yup.object().shape({
  email: yup
    .string()
    .email('Email must be a valid email address.')
    .trim()
    .required('Email is required.'),
  role: yup.string().trim().required('Role is required.'),
  otp: yup
    .number()
    .required('OTP is required.')
    .positive('OTP must be a positive number.'),
});

export const yupOtpGenerateSchema = yup.object().shape({
  email: yup
    .string()
    .email('Email must be a valid email address.')
    .trim()
    .required('Email is required.'),
  role: yup.string().trim().required('Role is required.'),
});

// Booking validation schema

export const yupNewBookingSchema = yup.object().shape({
  speaker_email: yup
    .string()
    .email()
    .trim()
    .required('Please provide email id'),
  speaker_id: yup
    .string()
    .trim()
    .required('Speaker ID is required')
    .matches(
      /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/,
      'Not a Valid UUID'
    ),
  date: yup.date().required('Please provide a valid date'),
  time_slot: yup.string().trim().required('Please provide a time slot'),
});

export const yupUpdateBookingSchema = yup.object().shape({
  date: yup.date().required('Please provide a valid date'),
  time_slot: yup.string().trim().required('Please provide a time slot'),
});

// Speaker validation schema
export const yupSpeakerUpdateSchema = yup.object().shape({
  expertise: yup.string().trim().required('New Expertise is required.'),
});
