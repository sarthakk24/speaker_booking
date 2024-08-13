import { NextFunction, Router, Request, Response } from 'express';

const healthCheckRouter = Router();

healthCheckRouter.get(
  '/',
  (req: Request, res: Response, next: NextFunction) => {
    try {
      res
        .status(200)
        .json({ success: true, message: '🛠️ Speaker API is working!' });
      next();
    } catch (e) {
      res
        .status(503)
        .json({ success: false, message: '🚫 API Health Check Failed' });
    }
  }
);

export default healthCheckRouter;
