import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AutoExService } from './auto-ex.service';
import { PostDto } from './dto/post.dto';

@UsePipes(
  new ValidationPipe({
    whitelist: true,
    // forbidNonWhitelisted: true,
    transform: true,
    transformOptions: {
      enableImplicitConversion: true,
    },
  }),
)
@Controller('auto-ex')
export class AutoExController {
  constructor(private readonly autoExService: AutoExService) {}

  @Post()
  postHandle(@Body() body: PostDto) {
    return this.autoExService.defineAction(body);
  }
}
