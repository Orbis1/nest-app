import { IsOptional, IsPositive } from 'class-validator';

export class ParamDto {
  @IsOptional()
  @IsPositive()
  id: number;
}
