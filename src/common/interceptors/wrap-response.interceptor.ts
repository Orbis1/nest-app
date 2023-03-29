import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';

@Injectable()
export class WrapResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    console.log('>>> WrapResponseInterceptor.Before...');

    return next.handle().pipe(
      tap((data) => {
        console.log('>>> WrapResponseInterceptor.After...', { ...data });
      }),
    );
  }
}
