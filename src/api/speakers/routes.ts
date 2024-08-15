import { Router } from 'express';
import { handleUpdateExpertise } from './controllers/expertise.service';
const speakerRouter = Router();

// Put
speakerRouter.put('/expertise', handleUpdateExpertise);

export default speakerRouter;
