import { HttpStatus, INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';
import * as request from 'supertest';
import { PostgresDataSource } from '../../src/app.datasource';
import { AutoExModule } from '../../src/auto-ex/auto-ex.module';
import { PostDto } from '../../src/auto-ex/dto/post.dto';

describe('[Feature] Auto-execution - /auto-ex', () => {
  let app: INestApplication;

  const sampleAddRole: PostDto = {
    templateValues: {},
    isTech: false,
    fio: 'Иванов Иван Иванович',
    ce: 'ID1',
    ceName: 'Our System Name',
    sdNumber: 'ID2',
    accessAction: 'open',
    userTabNumber: '0001',
    selectValues: {
      AUTP00000921: {
        key: 'sudirRole',
        values: {
          AUTH00059019: 'VPO-KIB-QS-PU',
        },
      },
      AUTP00000922: {
        key: 'project',
        values: {
          AUTH00059020: 'CKR',
        },
      },
      AUTP00000923: {
        key: 'projectRole',
        values: {
          AUTH00059021: 'Manager',
          AUTH00059022: 'User',
        },
      },
    },
  };

  const sampleDeleteRole: PostDto = {
    templateValues: {},
    isTech: false,
    fio: 'Иванов Иван Иванович',
    ce: 'ID1',
    ceName: 'Our System Name',
    sdNumber: 'ID2',
    accessAction: 'close',
    userTabNumber: '0001',
    selectValues: {},
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
          .send(sampleAddRole)
          .expect(200);

        expect(body.status).toEqual('success');
        expect(body).toHaveProperty('metaData');
      });
    });

    describe(`if the user already has this role(s)`, () => {
      it('should return 409', async () => {
        const { body } = await request(app.getHttpServer())
          .post('/auto-ex')
          .send(sampleAddRole)
          .expect(409);

        expect(body.status).toEqual('error');
        expect(body).toHaveProperty('metaData');
        expect(body.metaData).toHaveProperty('errorMessage');
        expect(body.metaData.errorMessage.length).not.toBeLessThan(2);
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
          })
          .expect(400);

        expect(body.status).toEqual('error');
        expect(body).toHaveProperty('metaData');
        expect(body.metaData).toHaveProperty('errorMessage');
        expect(body.metaData.errorMessage.length).not.toBeLessThan(2);
      });
    });
  });

  describe('Delete role [POST /]', () => {
    describe(`always`, () => {
      it('should return 200', async () => {
        const { body } = await request(app.getHttpServer())
          .post('/auto-ex')
          .send(sampleDeleteRole)
          .expect(200);

        expect(body.status).toEqual('success');
        expect(body).toHaveProperty('metaData');
        expect(body.metaData).toHaveProperty('affected');
      });
    });
  });

  afterAll(async () => await app.close()); // close db connection
});
