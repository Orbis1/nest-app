import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

//@Index(['name', 'type'])
@Entity()
export class Event {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: string;

  @Index()
  @Column()
  name: string;

  @Column('json', { nullable: true })
  payload: Record<string, any>;
}
