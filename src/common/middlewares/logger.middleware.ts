import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private logger = new Logger('HTTP');

  use(req: Request, res: Response, next: NextFunction) {
    const startTime = new Date().getTime();
    const { method, originalUrl } = req;
    const userAgent = req.get('user-agent') || '';

    res.on('finish', () => {
      const { statusCode, statusMessage } = res;
      const contentLength = res.get('content-length');
      const requestWorkTime = new Date().getTime() - startTime;

      this.logger.log(
        `${method} ${originalUrl} ${statusCode} ${statusMessage} - ${contentLength} ${userAgent} -- ${requestWorkTime}ms`,
      );
    });

    next();
  }
}
