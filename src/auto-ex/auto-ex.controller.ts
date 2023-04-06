import { Controller, Post } from '@nestjs/common';

@Controller('auto-ex')
export class AutoExController {
  @Post()
  postHandle() {
    return 'postHandle';
  }
}
