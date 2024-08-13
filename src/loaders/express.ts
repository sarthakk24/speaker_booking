import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import config from '../config/config';
import routes from '../api/index';
import { rateLimit } from 'express-rate-limit';

export default ({ app }: { app: express.Application }): void => {
  app.use(cors());

  app.use(express.json());

  app.use(config.api.prefix, routes());

  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 15000,
    message: 'Too many api requests, please try again later.',
    standardHeaders: true,
    legacyHeaders: false,
  });

  app.use(limiter);
  app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    res.status(err.statusCode || 500).json({
      success: false,
      message: err.message || '❌ Unknown Error Occurred !! ',
    });
  });
};
