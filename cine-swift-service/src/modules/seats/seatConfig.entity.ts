import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

import { ISeat } from "./seat.interface";

@Entity()
export class SeatConfig implements ISeat {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ nullable: true })
  cinemaId: string;

  @Column({ nullable: true })
  seatId: string;

  @Column({ nullable: true })
  status: string;

  @Column({ nullable: true })
  type: string;

  @Column({ nullable: true })
  noChildren: boolean;

  constructor(court: Partial<SeatConfig>) {
    Object.assign(this, court);
  }
}
