import { Module } from '@nestjs/common';
import { AutoExController } from './auto-ex.controller';
import { AutoExService } from './auto-ex.service';
import { UsersAttrPLUS } from './entities/usersattr-plus.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [TypeOrmModule.forFeature([UsersAttrPLUS]), ConfigModule],
  controllers: [AutoExController],
  providers: [AutoExService],
})
export class AutoExModule {}
