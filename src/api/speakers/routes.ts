import { Router } from 'express';
import { handleUpdateExpertise } from './controllers/expertise.service';
import yupValidator from '../../middlewares/validator';
import { yupSpeakerUpdateSchema } from '../../models/schemas/schema';
const speakerRouter = Router();

// Put
speakerRouter.put(
  '/expertise',
  yupValidator('body', yupSpeakerUpdateSchema),
  handleUpdateExpertise
);

export default speakerRouter;
