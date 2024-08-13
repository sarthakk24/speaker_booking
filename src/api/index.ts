import { Router } from 'express';
import healthCheckRouter from './healthCheck';
import userRouter from './users/routes';

export default (): Router => {
  const app = Router();

  app.use('/user', userRouter);
  app.use('/', healthCheckRouter);
  return app;
};
