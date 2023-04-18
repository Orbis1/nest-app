import { Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'sudiruserattr_plus' })
export class UsersAttrPLUS {
  @PrimaryColumn()
  employeenumber: string;

  @PrimaryColumn()
  sudirroles: string;

  @PrimaryColumn()
  project: string;

  @PrimaryColumn()
  projectroles: string;
}
