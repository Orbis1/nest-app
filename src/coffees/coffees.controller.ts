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
import { CoffeesService } from './coffees.service';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';

@Controller('coffees')
export class CoffeesController {
  constructor(private readonly coffeeService: CoffeesService) {}

  @Get()
  findAll(@Query() paginationQuery) {
    // findAll(@Res() response) {
    // response.status(200).send('This action returns all coffees');
    // const { limit, offset } = paginationQuery;
    return this.coffeeService.readAll();
  }

  @Get(':id')
  // findOne(@Param() params) {
  // const {id} = params;
  findOne(@Param('id') id: number) {
    return this.coffeeService.readById(id);
  }

  @Post()
  create(@Body() createBodyDto: CreateCoffeeDto) {
    return this.coffeeService.create(createBodyDto);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateCoffeeDto: UpdateCoffeeDto) {
    return this.coffeeService.update(id, updateCoffeeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    // TODO @Param validation in all routes. id must be number
    if (Number.isNaN(id)) {
      throw new HttpException(
        `Wrong param's type. id must be number`,
        HttpStatus.BAD_REQUEST,
      );
    }

    return this.coffeeService.delete(id);
  }
}
