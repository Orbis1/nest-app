import { DataSource } from 'typeorm';

export const PostgresDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'pass123',
  database: 'postgres',
  entities: ['dist/**/entities/*.js'],
  migrations: ['dist/migrations/*.js'],
});

console.log('./app.datasource.ts', process.env.DATABASE_USER);
