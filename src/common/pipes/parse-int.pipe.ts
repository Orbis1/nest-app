import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

@Injectable()
export class ParseIntPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    console.log({ level: 'ParseIntPipe', value, type: typeof value, metadata });

    if (typeof value === 'string') {
      const val = parseInt(value, 10);

      if (Number.isNaN(val)) {
        throw new BadRequestException(
          `Validation failed. "${value}" is not an integer`,
        );
      }
      return val;
    }

    return value;
  }
}
