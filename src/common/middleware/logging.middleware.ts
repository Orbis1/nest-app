import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';

@Injectable()
export class LoggingMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: () => void) {
    console.time('Request-response duration');
    console.log('[Middleware] logging');

    const reqRecord = {
      headers: req.headers,
      body: req.body,
      originalUrl: req.originalUrl,
    };

    console.log(JSON.stringify(reqRecord));

    res.on('finish', () => {
      console.timeEnd('Request-response duration');
    });
    next();
  }
}
