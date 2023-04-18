import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
} from '@nestjs/common';
import { UsersAttrPLUS } from './entities/usersattr-plus.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PostDto, iCreateRole, iSelectValues } from './dto/post.dto';

@Injectable()
export class AutoExService {
  private readonly logger = new Logger(AutoExService.name);

  constructor(
    @InjectRepository(UsersAttrPLUS)
    private readonly userRepository: Repository<UsersAttrPLUS>,
  ) {}

  async create(createRoleDto: iCreateRole[]) {
    for (const dto of createRoleDto) {
      const { employeenumber, sudirroles, project, projectroles } = dto;

      if (!(employeenumber && sudirroles && project && projectroles)) {
        throw new HttpException(
          {
            reason:
              `В заявке недостаточно данных для присвоения роли. ` +
              `Табельный номер: ${employeenumber ?? '?'}, ` +
              `Роль СУДИР: ${sudirroles ?? '?'}, ` +
              `Проект: ${project ?? '?'}, ` +
              `Роль в проекте: ${projectroles ?? '?'}`,
            errorMessage:
              `record { ` +
              `employeenumber: ${employeenumber}, ` +
              `sudirroles: ${sudirroles}, ` +
              `project: ${project}, ` +
              `projectroles: ${projectroles}` +
              ` } is incomplete`,
          },
          HttpStatus.METHOD_NOT_ALLOWED,
        );
      }
      const existingRecord = await this.userRepository.findOne({
        where: {
          employeenumber,
          sudirroles,
          project,
          projectroles,
        },
      });

      if (existingRecord)
        throw new HttpException(
          {
            reason:
              `У пользователя уже есть роль ` +
              `${sudirroles} ${project} ${projectroles} `,
            errorMessage:
              `the record { ` +
              `employeenumber: ${employeenumber}, ` +
              `sudirroles: ${sudirroles}, ` +
              `project: ${project}, ` +
              `projectroles: ${projectroles}` +
              ` } already exists`,
          },
          HttpStatus.FOUND,
        );
    }
    const roles = this.userRepository.create(createRoleDto);
    return this.userRepository.save(roles);
  }

  delete(deleteRoleDto: { employeenumber: string }) {
    const { employeenumber } = deleteRoleDto;
    return this.userRepository.delete({ employeenumber });
  }

  async defineAction(postDto: PostDto) {
    if (isCreateRoleDto(postDto)) {
      const { additionalRequest } = postDto.templateValues;
      const values = parsePostSelectedValues(postDto.selectValues);

      const rows = transformSelectedValues(values).map((data) => ({
        ...data,
        employeenumber: postDto.userTabNumber,
      }));

      if (additionalRequest === 'New') {
        await this.delete({
          employeenumber: postDto.userTabNumber,
        });
      }

      return this.create(rows);
    } else if (isDeleteRoleDto(postDto)) {
      return this.delete({
        employeenumber: postDto.userTabNumber,
      });
    } else {
      throw new HttpException(
        {
          reason: `Не удалось определить тип запроса`,
          errorMessage: 'isCreateRoleDto = false && isDeleteRoleDto = false',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}

function isCreateRoleDto(postDto: PostDto): boolean {
  return (
    postDto &&
    'accessAction' in postDto &&
    postDto.accessAction === 'open' &&
    'selectValues' in postDto &&
    'templateValues' in postDto
  );
}

function isAddRoleDto(postDto: PostDto): boolean {
  return (
    postDto &&
    'accessAction' in postDto &&
    postDto.accessAction === 'open' &&
    'selectValues' in postDto &&
    'templateValues' in postDto &&
    postDto.templateValues.additionalRequest === 'Additional'
  );
}

function isDeleteRoleDto(postDto: PostDto): boolean {
  return (
    postDto && 'accessAction' in postDto && postDto.accessAction === 'close'
  );
}

export function parsePostSelectedValues(selectValues: iSelectValues) {
  const data = Object.entries(selectValues);
  return data.map((arr) => {
    const [parentKey, values] = arr;
    const selected = Object.values(values.values);

    return { parentKey, key: values.key || null, values: selected };
  });
}

export function transformSelectedValues(
  data: { parentKey: string; key: string; values: string[] }[],
): Omit<iCreateRole, 'employeenumber'>[] {
  const props = [];

  data.forEach(({ parentKey: _, key, values }) => {
    const inKeys = ['sudirRole', 'project', 'projectRole'];
    const index = inKeys.findIndex((k) => k === key);
    props[index] = values.length === 1 ? values[0] : values;
  });

  if (Array.isArray(props[2]) && props[2].length > 1) {
    return props[2].map((value) => {
      return {
        sudirroles: props[0],
        project: props[1],
        projectroles: value,
      };
    });
  } else {
    return [
      {
        sudirroles: props[0],
        project: props[1],
        projectroles: props[2],
      },
    ];
  }
}
