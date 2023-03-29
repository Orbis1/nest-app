import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { MakePublic } from 'src/common/decorators/public.decorator';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { ParamDto } from 'src/common/dto/param.dto';
import { ApiKeyGuard } from 'src/common/guards/api-key.guard';
import { CoffeesService } from './coffees.service';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';

const valid = new ValidationPipe({
  whitelist: true,
  forbidNonWhitelisted: true,
  transform: true,
  transformOptions: {
    enableImplicitConversion: true,
  },
});

@UsePipes(valid)
@Controller('coffees')
export class CoffeesController {
  constructor(private readonly coffeeService: CoffeesService) {}

  // @UsePipes(ValidationPipe)
  //@SetMetadata('isPublic', true)
  @MakePublic()
  @Get()
  async findAll(@Query() paginationQuery: PaginationQueryDto) {
    // findAll(@Res() response)
    await new Promise((resolve) => setTimeout(resolve, 5000));
    return this.coffeeService.readAll(paginationQuery);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    // TODO: id Protect from NAN
    // const { id } = params;
    console.log({
      loc: `findOne(@Param('id') id: number)`,
      value: id,
      type: typeof id,
    });

    return this.coffeeService.readById(id);
  }

  @Post()
  create(@Body() createBodyDto: CreateCoffeeDto) {
    return this.coffeeService.create(createBodyDto);
  }

  @Patch(':id')
  update(@Param() params: ParamDto, @Body() updateCoffeeDto: UpdateCoffeeDto) {
    const { id } = params;
    return this.coffeeService.update(id, updateCoffeeDto);
  }

  @Delete(':id')
  remove(@Param() params: ParamDto) {
    const { id } = params;
    return this.coffeeService.delete(id);
  }
}
