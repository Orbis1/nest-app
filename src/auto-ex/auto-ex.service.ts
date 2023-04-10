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

  create(createRoleDto: iCreateRole) {
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

function isCreateRoleDto(data: PostDto): boolean {
  return (
    data &&
    'accessAction' in data &&
    data.accessAction === 'open' &&
    'selectValues' in data
  );
}

function isDeleteRoleDto(data: PostDto): boolean {
  return (
    data &&
    'accessAction' in data &&
    data.accessAction === 'close' &&
    !('selectValues' in data)
  );
}
