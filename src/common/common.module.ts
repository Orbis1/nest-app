import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD, APP_PIPE } from '@nestjs/core';
import { ApiKeyGuard } from './guards/api-key.guard';
import { ParseIntPipe } from './pipes/parse-int.pipe';

@Module({
  imports: [ConfigModule],
  providers: [
    { provide: APP_GUARD, useClass: ApiKeyGuard },
    // { provide: APP_PIPE, useClass: ParseIntPipe },
  ],
})
export class CommonModule {}
