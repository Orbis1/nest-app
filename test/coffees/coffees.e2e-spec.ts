import { HttpStatus, INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';
import { CoffeesModule } from '../../src/coffees/coffees.module';
import * as request from 'supertest';
import { CreateCoffeeDto } from '../../src/coffees/dto/create-coffee.dto';
import { PostgresDataSource } from '../../src/app.datasource';
import { UpdateCoffeeDto } from '../../src/coffees/dto/update-coffee.dto';

describe('[Feature] Coffee - /coffees', () => {
  let app: INestApplication;

  const sampleCoffee = {
    name: 'MyCoffee',
    brand: 'Test',
    flavors: ['bitter', 'sweet'],
  };

  const ormOptions = {
    ...PostgresDataSource.options,
    port: 5433,
    autoLoadEntities: true,
    synchronize: true,
  };

  // beforeAll - once before all tests
  // beforeEach - multiple times before each test

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [CoffeesModule, TypeOrmModule.forRoot(ormOptions)],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('Create [POST /]', async () => {
    const { body } = await request(app.getHttpServer())
      .post('/coffees')
      .send(sampleCoffee as CreateCoffeeDto)
      .expect(HttpStatus.CREATED);

    expect(body.name).toEqual(sampleCoffee.name);
    expect(body.brand).toEqual(sampleCoffee.brand);
    expect(body.flavors.length).toBe(sampleCoffee.flavors.length);
    expect(typeof body.id).toBe('number');
  });

  it('Get all [GET /]', async () => {
    const { body } = await request(app.getHttpServer())
      .get('/coffees')
      .expect(HttpStatus.OK);

    expect(Array.isArray(body)).toBeTruthy();
  });

  describe('Get one [GET /:id]', () => {
    describe('when coffee with ID exists', () => {
      it('should return the coffee object', async () => {
        const coffeeId = 1;
        const { body } = await request(app.getHttpServer())
          .get('/coffees/' + coffeeId)
          .expect(HttpStatus.OK);

        expect(body.id).toBe(1);
        expect(body.name).toBe(sampleCoffee.name);
      });
    });

    describe('otherwise', () => {
      it('should throw "NotFoundException"', async () => {
        const coffeeId = 99;
        await request(app.getHttpServer())
          .get('/coffees/' + coffeeId)
          .expect(HttpStatus.NOT_FOUND);
      });
    });
  });

  describe('Update one [PATCH /:id]', () => {
    describe('when coffee with ID exists', () => {
      it('should return the coffee object', async () => {
        const patch = { name: 'Patched coffee name' };

        const { body } = await request(app.getHttpServer())
          .patch('/coffees/1')
          .send(patch as UpdateCoffeeDto)
          .expect(HttpStatus.OK);

        expect(body.id).toBe(1);
        expect(body.name).toBe(patch.name);
      });
    });
    describe('otherwise', () => {
      it('should throw "NotFoundException"', async () => {
        const patch = { name: 'Patched coffee name' };

        await request(app.getHttpServer())
          .patch('/coffees/99')
          .send(patch)
          .expect(HttpStatus.NOT_FOUND);
      });
    });
  });

  describe('Delete one [DELETE /:id]', () => {
    describe('when coffee with ID exists', () => {
      it('should return 200', async () => {
        await request(app.getHttpServer())
          .delete('/coffees/1')
          .expect(HttpStatus.OK);
      });

      describe('otherwise', () => {
        it('should return 404', async () => {
          await request(app.getHttpServer())
            .delete('/coffees/99')
            .expect(HttpStatus.NOT_FOUND);
        });
      });
    });

    describe('if ID is not an integer', () => {
      it('should return 400', async () => {
        await request(app.getHttpServer())
          .delete('/coffees/abc')
          .expect(HttpStatus.BAD_REQUEST);
      });
    });
  });

  afterAll(async () => await app.close()); // close db connection
});
