import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';
import * as request from 'supertest';
import { PostgresDataSource } from '../../src/app.datasource';
import { AutoExModule } from '../../src/auto-ex/auto-ex.module';
import { PostDto } from '../../src/auto-ex/dto/post.dto';
import { sampleDeleteRole } from './sampleDeleteRole.dto';
import { sampleAddRole } from './sapmleAddRole.dto';

describe('[Feature] Auto-execution - /auto-ex', () => {
  let app: INestApplication;

  const responseValidation = (body, type: 'succees' | 'error') => {
    if (type === 'succees') {
      expect(body.status).toEqual('success');
      expect(body).toHaveProperty('metaData');
    } else {
      expect(body.status).toEqual('error');
      expect(body).toHaveProperty('metaData');
      expect(body.metaData).toHaveProperty('errorMessage');
      expect(body.metaData.errorMessage.length).not.toBeLessThan(2);
    }
  };

  const ormTestOptions = {
    ...PostgresDataSource.options,
    port: 5433,
    autoLoadEntities: true,
    synchronize: true,
  };

  // beforeAll - once before all tests
  // beforeEach - multiple times before each test

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AutoExModule, TypeOrmModule.forRoot(ormTestOptions)],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  describe('Add role [POST /]', () => {
    describe(`if the user's role is new`, () => {
      it('should return 200', async () => {
        const { body } = await request(app.getHttpServer())
          .post('/auto-ex')
          .send(sampleAddRole as PostDto)
          .expect(200);

        responseValidation(body, 'succees');
      });
    });

    describe(`if the user already has this role(s)`, () => {
      it('should return 409', async () => {
        const { body } = await request(app.getHttpServer())
          .post('/auto-ex')
          .send(sampleAddRole as PostDto)
          .expect(409);

        responseValidation(body, 'error');
      });
    });

    describe(`if the user already has this role(s), but additionalRequest = 'New'`, () => {
      it('should return 200', async () => {
        const { body } = await request(app.getHttpServer())
          .post('/auto-ex')
          .send({
            ...sampleAddRole,
            templateValues: {
              additionalRequest: 'New',
            },
          } as PostDto)
          .expect(200);

        responseValidation(body, 'succees');
      });
    });

    describe(`if the data is incomplete`, () => {
      it('should return 400', async () => {
        const { body } = await request(app.getHttpServer())
          .post('/auto-ex')
          .send({
            ...sampleAddRole,
            selectValues: {
              AUTP00000001: {
                key: 'sudirRole',
                values: {
                  AUTH00000002: 'ROLE-NAME-CODE',
                },
              },
            },
          } as PostDto)
          .expect(400);

        responseValidation(body, 'error');
      });
    });
  });

  describe('Delete role [POST /]', () => {
    describe(`always`, () => {
      it('should return 200', async () => {
        const { body } = await request(app.getHttpServer())
          .post('/auto-ex')
          .send(sampleDeleteRole as PostDto)
          .expect(200);

        responseValidation(body, 'succees');
        expect(body.metaData).toHaveProperty('affected');
      });
    });
  });

  describe('Wrong body [POST /]', () => {
    it('should return 400', async () => {
      const { body } = await request(app.getHttpServer())
        .post('/auto-ex')
        .send({ hello: 'world' })
        .expect(400);

      responseValidation(body, 'error');
    });
  });

  afterAll(async () => await app.close()); // close db connection
});
