import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class AutoExHttpExceptionFilter<T extends HttpException>
  implements ExceptionFilter
{
  private readonly logger = new Logger(AutoExHttpExceptionFilter.name);

  catch(exception: T, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const req = context.getRequest<Request>();
    const response = context.getResponse<Response>();

    const status = exception.getStatus();
    const exceptionResponse = exception.getResponse();

    const error =
      typeof exceptionResponse === 'string'
        ? { message: exceptionResponse }
        : (exceptionResponse as object);

    // rename message -> errorMessage
    delete Object.assign(error, { ['errorMessage']: error['message'] })[
      'message'
    ];

    this.logger.error(
      `${req.statusCode} ${req.path} ${req.ip} ${JSON.stringify(
        req.body,
      )} - ${JSON.stringify(error)}`,
    );

    response.status(status).json({ status: 'error', metaData: { ...error } });
  }
}
