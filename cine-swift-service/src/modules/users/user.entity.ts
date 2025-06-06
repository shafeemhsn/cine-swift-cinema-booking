import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

import { IUser } from "./user.interface";

@Entity()
export class User implements IUser {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  @Column()
  password: string;
}
