import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Request } from 'express';
import { Observable, tap } from 'rxjs';

@Injectable()
export class WrapResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    // const req: Request = context.switchToHttp().getRequest();
    console.log('[Interceptor] wrap-response');

    return next.handle().pipe(tap((data) => data));
  }
}
