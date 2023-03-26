import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoffeesModule } from './coffees/coffees.module';
import { PostgresDataSource } from './app.datasource';

@Module({
  imports: [CoffeesModule, TypeOrmModule.forRoot(PostgresDataSource.options)],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
