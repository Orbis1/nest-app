import { ApiProperty } from '@nestjs/swagger';
import { ArrayUnique, IsString } from 'class-validator';

export class CreateCoffeeDto {
  @ApiProperty({ description: 'The name of coffee' })
  @IsString()
  readonly name: string;

  @ApiProperty()
  @IsString()
  readonly brand: string;

  @ApiProperty({ description: 'Mmm... flavors!' })
  @IsString({ each: true })
  @ArrayUnique()
  readonly flavors: string[];
}
