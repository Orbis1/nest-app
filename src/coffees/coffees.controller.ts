import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CoffeesService } from './coffees.service';

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
  @HttpCode(HttpStatus.GONE)
  create(@Body() body) {
    this.coffeeService.create(body);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() body) {
    this.coffeeService.update(+id, body);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    this.coffeeService.delete(+id);
  }
}
