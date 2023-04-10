import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AutoExService } from './auto-ex.service';
import { PostDto } from './dto/post.dto';
import { AutoExResponse } from './dto/response.dto';

@UsePipes(
  new ValidationPipe({
    whitelist: true,
    transform: true,
    transformOptions: {
      enableImplicitConversion: true,
    },
  }),
)
@Controller('auto-ex')
export class AutoExController {
  constructor(private readonly autoExService: AutoExService) {}

  @HttpCode(HttpStatus.OK)
  @Post()
  postHandle(@Body() body: PostDto) {
    return this.autoExService.defineAction(body);
  }
}
