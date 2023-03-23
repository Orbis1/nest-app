import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
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
  findOne(@Param('id') id: string) {
    return this.coffeeService.readById(+id);
  }

  @Post()
  create(@Body() createBodyDto: CreateCoffeeDto) {
    this.coffeeService.create(createBodyDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCoffeeDto: UpdateCoffeeDto) {
    this.coffeeService.update(+id, updateCoffeeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    this.coffeeService.delete(+id);
  }
}
