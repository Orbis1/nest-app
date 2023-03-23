import { Injectable } from '@nestjs/common';
import { Coffee } from './entities/coffee.entity';

@Injectable()
export class CoffeesService {
  private coffees: Coffee[] = [
    { id: 1, name: 'Espresso', brand: 'Java', flavors: ['lava'] },
  ];

  //crud

  create(coffee: Coffee): void {
    this.coffees.push(coffee);
  }

  readById(id: number) {
    return this.coffees.find((c) => c.id === id);
  }

  readAll() {
    return this.coffees;
  }

  update(id: number, newProps: Partial<Omit<Coffee, 'id'>>): void {
    const newCoffee = { ...this.readById(id), ...newProps };
    this.delete(id);
    this.create(newCoffee);
  }

  delete(id: number) {
    this.coffees = this.coffees.filter((c) => c.id !== id);
  }
}
