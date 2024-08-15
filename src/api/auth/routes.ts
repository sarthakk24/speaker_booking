import { Router } from 'express';
import yupValidator from '../../middlewares/validator';
import {
  yupLoginSchema,
  yupSpeakerSignupSchema,
  yupUserSignupSchema,
} from '../../models/schemas/schema';
import { handleLogin } from './controllers/login.service';
import {
  handleSignUpSpeaker,
  handleSignUpUser,
} from './controllers/signup.service';

const userRouter = Router();

userRouter.post('/login', yupValidator('body', yupLoginSchema), handleLogin);
userRouter.post(
  '/signup/user',
  yupValidator('body', yupUserSignupSchema),
  handleSignUpUser
);
userRouter.post(
  '/signup/speaker',
  yupValidator('body', yupSpeakerSignupSchema),
  handleSignUpSpeaker
);

export default userRouter;
