import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

const asyncTimeout = (milliseconds: number): Promise<string> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve('DONE'), milliseconds);
  });
};

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {
    await asyncTimeout(1000);
    console.log('Request...');
    next();
  }
}

// Functional middleware
export const logger = (req: Request, res: Response, next: NextFunction) => {
  console.log(`Functional Request...`);
  next();
};
