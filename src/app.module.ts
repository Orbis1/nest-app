import { Logger, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoffeesModule } from './coffees/coffees.module';
import { PostgresDataSource } from './app.datasource';
import { ConfigModule } from '@nestjs/config';
// import * as Joi from 'joi';
import { CommonModule } from './common/common.module';
import { AutoExModule } from './auto-ex/auto-ex.module';

@Module({
  imports: [
    // ConfigModule.forRoot({
    //   validationSchema: Joi.object({
    //     DATABASE_HOST: Joi.required(),
    //     DATABASE_PORT: Joi.number().default(5432),
    //   }),
    // }),
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(PostgresDataSource.options),
    CoffeesModule,
    CommonModule,
    AutoExModule,
  ],
  controllers: [AppController],
  providers: [Logger, AppService],
})
export class AppModule {}
