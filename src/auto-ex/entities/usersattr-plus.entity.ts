import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class UsersAttrPLUS {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  EmployeeNumber: string;

  @Column()
  type: string;

  @Column()
  value: string;
}
