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

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  salt: string;

  @Column()
  role: string;
}
