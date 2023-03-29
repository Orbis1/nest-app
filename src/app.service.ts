import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  //test
  getHello(): string {
    return 'Hello Orbis!';
  }
}
