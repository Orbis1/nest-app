import { Logger, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostgresDataSource } from './app.datasource';
import { ConfigModule } from '@nestjs/config';
import { CommonModule } from './common/common.module';
import { AutoExModule } from './auto-ex/auto-ex.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({ ...PostgresDataSource.options, synchronize: true }),
    CommonModule,
    AutoExModule,
  ],
  providers: [Logger],
})
export class AppModule {}
