import * as yup from 'yup';
export const yupLoginSchema = yup.object({
  email: yup.string().required('Email is required').trim(),
  password: yup.string().required('Password is required').trim(),
  role: yup.string().trim().required('Role is required'),
});

export type LoginSchema = yup.InferType<typeof yupLoginSchema>;

export const yupUserSignupSchema = yup.object().shape({
  first_name: yup.string().trim().required('Please provide first name'),
  last_name: yup.string().trim().required('Please provide last name'),
  email: yup.string().email().trim().required('Please provide email id'),
  password: yup.string().trim().required('Please provide last name'),
});

export type UserSignupSchema = yup.InferType<typeof yupUserSignupSchema>;

export const yupSpeakerSignupSchema = yup.object().shape({
  first_name: yup.string().trim().required('Please provide first name'),
  last_name: yup.string().trim().required('Please provide last name'),
  email: yup.string().email().trim().required('Please provide email id'),
  password: yup.string().trim().required('Please provide last name'),
  price_per_session: yup.number().required('Please provide price per session'),
  expertise: yup.string().required('Please provide Expertise'),
});

export type SpeakerSignupSchema = yup.InferType<typeof yupUserSignupSchema>;

export const yupObjIdSchema = yup.object({
  id: yup
    .string()
    .required('Please provide ID')
    .trim()
    .matches(
      /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/,
      'Not a Valid UUID'
    ),
});

export type ObjIdSchema = yup.InferType<typeof yupObjIdSchema>;
