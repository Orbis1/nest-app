import { OmitType, PartialType } from '@nestjs/mapped-types';
import { CreateCoffeeDto } from './create-coffee.dto';

export class UpdateCoffeeDto extends PartialType(
  OmitType(CreateCoffeeDto, ['id']),
) {}
