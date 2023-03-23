import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';
import { Coffee } from './entities/coffee.entity';

@Injectable()
export class CoffeesService {
  private coffees: Coffee[] = [
    { id: 1, name: 'Espresso', brand: 'Java', flavors: ['lava'] },
  ];

  //crud

  create(coffee: Coffee): void {
    const exists = this.coffees.find((c) => c.id === coffee.id);
    if (exists) {
      throw new HttpException(
        `Coffee #${coffee.id} already exists`,
        HttpStatus.CONFLICT,
      );
    } else {
      this.coffees.push(coffee);
    }
  }

  readById(id: number) {
    const coffee = this.coffees.find((c) => c.id === id);
    if (!coffee) {
      throw new NotFoundException(`Coffee #${id} not found`);
    }
    return coffee;
  }

  readAll() {
    return this.coffees;
  }

  update(id: number, newProps: UpdateCoffeeDto): void {
    // TODO: what if newProps are equl to oldProps?
    const newCoffee = { ...this.readById(id), ...newProps };
    this.delete(id);
    this.create(newCoffee);
  }

  delete(id: number) {
    this.coffees = this.coffees.filter((c) => c.id !== id);
  }
}
