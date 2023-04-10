import {
  BadRequestException,
  HttpCode,
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
} from '@nestjs/common';
import { UsersAttrPLUS } from './entities/usersattr-plus.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PostDto, iCreateRole } from './dto/post.dto';

@Injectable()
export class AutoExService {
  private readonly logger = new Logger(AutoExService.name);

  constructor(
    @InjectRepository(UsersAttrPLUS)
    private readonly userRepository: Repository<UsersAttrPLUS>,
  ) {}

  async create(createRoleDto: iCreateRole) {
    const { employeenumber, sudirroles, project, projectroles } = createRoleDto;
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
        `record { employeenumber: ${employeenumber} } already exists`,
        HttpStatus.FOUND,
      );
    const role = this.userRepository.create(createRoleDto);
    return this.userRepository.save(role);
  }

  delete(deleteRoleDto: { employeenumber: string }) {
    const { employeenumber } = deleteRoleDto;
    return this.userRepository.delete({ employeenumber });
  }

  defineAction(postDto: PostDto) {
    if (isCreateRoleDto(postDto)) {
      return this.create({
        employeenumber: postDto.userTabNumber,
        sudirroles: 'test',
        project: 'test',
        projectroles: 'test',
      });
    } else if (isDeleteRoleDto(postDto)) {
      return this.delete({
        employeenumber: postDto.userTabNumber,
      });
    } else {
      throw new BadRequestException(
        'isCreateRoleDto = false && isDeleteRoleDto = false',
      );
    }
  }
}

function isCreateRoleDto(postDto: PostDto): boolean {
  return (
    postDto &&
    'accessAction' in postDto &&
    postDto.accessAction === 'open' &&
    'selectValues' in postDto
  );
}

function isDeleteRoleDto(postDto: PostDto): boolean {
  return (
    postDto && 'accessAction' in postDto && postDto.accessAction === 'close'
  );
}
