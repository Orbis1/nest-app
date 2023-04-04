import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { CoffeesController } from '../coffees/coffees.controller';
import { ApiKeyGuard } from './guards/api-key.guard';
import { WrapResponseInterceptor } from './interceptors/wrap-response.interceptor';
import { LoggingMiddleware } from './middleware/logging.middleware';

@Module({
  imports: [ConfigModule],
  providers: [
    { provide: APP_GUARD, useClass: ApiKeyGuard },
    // { provide: APP_PIPE, useClass: ParseIntPipe },
  ],
})
export class CommonModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggingMiddleware).forRoutes('*'); // +
    // consumer.apply(LoggingMiddleware).forRoutes('coffees'); // +
    // consumer.apply(LoggingMiddleware).forRoutes(CoffeesController); // +
    // consumer
    //   .apply(LoggingMiddleware)
    //   .forRoutes({ path: '*/coffees/*', method: RequestMethod.GET }); // -
  }
}
