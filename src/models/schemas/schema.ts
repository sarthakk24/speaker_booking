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
export const yupNewAndUpdateBookingSchema = yup.object().shape({
  speaker_email: yup
    .string()
    .email('Email must be a valid email address.')
    .trim()
    .required('Speaker email is required.'),
  speaker_id: yupObjIdSchema
    .shape({
      id: yup.string().required('Speaker ID is required.'),
    })
    .required('Speaker ID is required.'),
  date: yup.date().required('Date is required.'),
  time_slot: yup.string().trim().required('Time slot is required.'),
});

// Speaker validation schema
export const yupSpeakerUpdateSchema = yup.object().shape({
  expertise: yup.string().trim().required('New Expertise is required.'),
});
