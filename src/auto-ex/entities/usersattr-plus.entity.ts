import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class UsersAttrPLUS {
  // @PrimaryGeneratedColumn()
  // id: number;

  @PrimaryColumn()
  employeenumber: string;

  @PrimaryColumn()
  sudirroles: string;

  @PrimaryColumn()
  project: string;

  @PrimaryColumn()
  projectroles: string;
}
