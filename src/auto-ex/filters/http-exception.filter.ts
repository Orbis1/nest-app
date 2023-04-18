import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';

interface iError {
  errorMessage?: string;
  reason: string;
  error?: string;
}

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
        ? { reason: exceptionResponse }
        : (exceptionResponse as iError);

    const { reason, error: systemError } = error;
    delete error.reason;

    this.logger.error(
      `${req.statusCode} ${req.path} ${req.ip} ${JSON.stringify(
        req.body,
      )} - ${JSON.stringify(error)}`,
    );

    response.status(200).json({
      status: 'error',
      message: reason ?? systemError,
      metaData: {
        ...error,
        errorMessage: error.errorMessage ?? systemError,
      },
    });
  }
}
