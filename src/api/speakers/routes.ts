import { Router } from 'express';
import { handleUpdateExpertise } from './controllers/expertise.service';
import yupValidator from '../../middlewares/validator';
import { yupSpeakerUpdateSchema } from '../../models/schemas/schema';
import { validateSpeaker } from '../../middlewares/verifyJWT';
const speakerRouter = Router();

// Put
speakerRouter.put(
  '/expertise',
  validateSpeaker,
  yupValidator('body', yupSpeakerUpdateSchema),
  handleUpdateExpertise
);

export default speakerRouter;
