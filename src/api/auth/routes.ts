import { Router } from 'express';
import yupValidator from '../../middlewares/validator';
import {
  yupLoginSchema,
  yupOtpGenerateSchema,
  yupOtpVerifySchema,
  yupSpeakerSignupSchema,
  yupUserSignupSchema,
} from '../../models/schemas/schema';
import { handleLogin } from './controllers/login.service';
import {
  handleSignUpSpeaker,
  handleSignUpUser,
} from './controllers/signup.service';
import { handleGenerate, handleVerify } from './controllers/otp.service';
const authRouter = Router();

// Post
authRouter.post('/login', yupValidator('body', yupLoginSchema), handleLogin);
authRouter.post(
  '/signup/user',
  yupValidator('body', yupUserSignupSchema),
  handleSignUpUser
);
authRouter.post(
  '/signup/speaker',
  yupValidator('body', yupSpeakerSignupSchema),
  handleSignUpSpeaker
);

authRouter.post(
  '/generate-otp',
  yupValidator('body', yupOtpGenerateSchema),
  handleGenerate
);

authRouter.post(
  '/verify-otp',
  yupValidator('body', yupOtpVerifySchema),
  handleVerify
);
export default authRouter;
