import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { ParamDto } from 'src/common/dto/param.dto';
import { CoffeesService } from './coffees.service';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';

@Controller('coffees')
export class CoffeesController {
  constructor(private readonly coffeeService: CoffeesService) {}

  @Get()
  findAll(@Query() paginationQuery: PaginationQueryDto) {
    // findAll(@Res() response)
    return this.coffeeService.readAll(paginationQuery);
  }

  @Get(':id')
  findOne(@Param() params: ParamDto) {
    const { id } = params;
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
