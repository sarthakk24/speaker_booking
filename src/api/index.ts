import { Router } from 'express';
import healthCheckRouter from './healthCheck';
import userRouter from './auth/routes';
import bookingRouter from './bookings/routes';
import speakerRouter from './speakers/routes';

export default (): Router => {
  const app = Router();

  app.use('/', healthCheckRouter);
  app.use('/auth', userRouter);
  app.use('/booking', bookingRouter);
  app.use('/speakers', speakerRouter);

  return app;
};
