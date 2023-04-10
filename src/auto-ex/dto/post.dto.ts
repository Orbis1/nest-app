import { IsBoolean, IsObject, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class PostDto {
  @ApiProperty({ description: 'Название КЭ' })
  @IsString()
  readonly ceName: string;

  @ApiProperty({ description: 'КЭ' })
  @IsString()
  readonly ce: string;

  @ApiProperty({
    description:
      'Действие над доступом open - предоставить доступ, close - закрыть доступ',
  })
  @IsString()
  readonly accessAction: 'open' | 'close';

  @ApiProperty({
    description: 'Фио пользователя, для которого предоставляется доступ',
  })
  @IsString()
  readonly fio: string;

  @ApiProperty({
    description:
      'Табельный номер пользователя, для которого запрашивается/закрывается доступ',
  })
  @IsString()
  readonly userTabNumber: string;

  @ApiProperty({
    description:
      'Список логинов пользователя для которых предоставляется доступ, может быть пустым массивом',
  })
  @IsString({ each: true })
  readonly domainLogins: string[];

  @ApiProperty({
    description:
      'Список логинов пользователя для которых предоставляется доступ, может быть пустым массивом',
  })
  @IsString({ each: true })
  readonly sigmaLogins: string[];

  @ApiProperty({
    description: 'Запросили доступ для УЗ спецназначения ture|false',
  })
  @IsBoolean()
  readonly isTech: boolean;

  // @ApiProperty({
  //   description:
  //     'Логины веденные пользователем в ручную, если пользователь ни чего не вводил, то пусто',
  // })
  // @IsString({ each: true })
  // readonly manualLogins: string[];

  @ApiProperty({ description: 'Номер заявки в SD' })
  @IsString()
  readonly sdNumber: string;

  @ApiProperty({
    description:
      'Список логинов СУДИР пользователей для которых предоставляется доступ, может быть пустым массивом',
  })
  @IsString({ each: true })
  readonly sudirLogins: string[];

  @ApiProperty({ description: 'Внутренняя почта' })
  @IsString()
  readonly internalEmail: string;

  @ApiProperty({ description: 'Внешняя почта' })
  @IsString()
  readonly externalEmail: string; //

  @ApiProperty({ description: 'Данные из шаблона как есть' })
  @IsObject()
  readonly templateValues: object; //,

  @ApiProperty({
    description:
      'Выбранные пользователям значения из справочников SM при оформление заявки, при закрытие доступа selectValues отсутствует, так как необходимо закрыть доступ полностью без каких-либо параметров',
  })
  @IsObject()
  @IsOptional()
  readonly selectValues: object;
}

export interface iCreateRole {
  employeenumber: string;
  sudirroles: string;
  project: string;
  projectroles: string;
}

export interface iDeleteRole {
  employeenumber: string;
}

/*
⁣ ⁣ ⁣ ⁣"selectValues": {
 ⁣ ⁣ ⁣ ⁣ ⁣ ⁣ ⁣ ⁣"AUTP00006748": {
 ⁣ ⁣ ⁣ ⁣ ⁣ ⁣ ⁣ ⁣ ⁣ ⁣ ⁣ ⁣"key": "ROLE-3", //может быть null если не указан "Внешний идентификатор" у параметра доступа шаблона
 ⁣ ⁣ ⁣ ⁣ ⁣ ⁣ ⁣ ⁣ ⁣ ⁣ ⁣ ⁣"values": {
 ⁣ ⁣ ⁣ ⁣ ⁣ ⁣ ⁣ ⁣ ⁣ ⁣ ⁣ ⁣ ⁣ ⁣ ⁣ ⁣"AUTH00106943": "Андеррайтер ЭРМБ"
 ⁣ ⁣ ⁣ ⁣ ⁣ ⁣ ⁣ ⁣ ⁣ ⁣ ⁣ ⁣}
 ⁣ ⁣ ⁣ ⁣ ⁣ ⁣ ⁣ ⁣},
 ⁣ ⁣ ⁣ ⁣ ⁣ ⁣ ⁣ ⁣"AUTP00009748": {
 ⁣ ⁣ ⁣ ⁣ ⁣ ⁣ ⁣ ⁣ ⁣ ⁣ ⁣ ⁣"key": "domain",
 ⁣ ⁣ ⁣ ⁣ ⁣ ⁣ ⁣ ⁣ ⁣ ⁣ ⁣ ⁣"values": {
 ⁣ ⁣ ⁣ ⁣ ⁣ ⁣ ⁣ ⁣ ⁣ ⁣ ⁣ ⁣ ⁣ ⁣ ⁣ ⁣"AUTH00058486": "SIGMA"
 ⁣ ⁣ ⁣ ⁣ ⁣ ⁣ ⁣ ⁣ ⁣ ⁣ ⁣ ⁣ ⁣ ⁣ ⁣ ⁣"AUTH00058487": "ALPHA"
 ⁣ ⁣ ⁣ ⁣ ⁣ ⁣ ⁣ ⁣ ⁣ ⁣ ⁣ ⁣}
 ⁣ ⁣ ⁣ ⁣ ⁣ ⁣ ⁣ ⁣}
 ⁣ ⁣ ⁣ ⁣} //Выбранные пользователям значения из справочников SM при оформление заявки, при закрытие доступа selectValues отсутствует, так как необходимо закрыть доступ полностью без каких-либо параметров

*/
