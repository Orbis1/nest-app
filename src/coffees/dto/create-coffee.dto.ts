import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateCoffeeDto {
  @ApiProperty({ description: 'The name of coffee' })
  @IsString()
  readonly name: string;

  @IsString()
  readonly brand: string;

  @ApiProperty({ description: 'Mmm... flavors!' })
  @IsString({ each: true })
  readonly flavors: string[];
}
