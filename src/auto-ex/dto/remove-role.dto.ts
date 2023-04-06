import { ApiProperty, OmitType } from '@nestjs/swagger';
import { CreateRoleDto } from './create-role.dto';
import { IsString } from 'class-validator';

export class RemoveRoleDto extends OmitType(CreateRoleDto, [
  'selectValues',
  'accessAction',
] as const) {
  @ApiProperty({
    description:
      'Действие над доступом open - предоставить доступ, close - закрыть доступ',
  })
  @IsString()
  readonly accessAction: 'close';
}
