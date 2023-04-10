import { ApiProperty, OmitType } from '@nestjs/swagger';
import { PostDto } from './post.dto';
import { IsString } from 'class-validator';

export class RemoveRoleDto extends OmitType(PostDto, [
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
