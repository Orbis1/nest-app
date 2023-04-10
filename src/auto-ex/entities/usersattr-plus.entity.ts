import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class UsersAttrPLUS {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  employeenumber: string;

  @Column()
  sudirroles: string;

  @Column()
  project: string;

  @Column()
  projectroles: string;
}
