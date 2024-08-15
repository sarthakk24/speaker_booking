import { Router } from 'express';
import healthCheckRouter from './healthCheck';
import userRouter from './auth/routes';

export default (): Router => {
  const app = Router();

  app.use('/auth', userRouter);
  app.use('/', healthCheckRouter);
  return app;
};
