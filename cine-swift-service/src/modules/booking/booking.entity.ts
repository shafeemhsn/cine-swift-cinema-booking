import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";
import { IBooking } from "./booking.interface";

@Entity()
export class Bookings implements IBooking {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ nullable: true })
  bookingId: string;

  @Column({ nullable: true })
  userId: string;

  @Column({ nullable: true })
  showtimeId: string;

  @Column({ nullable: true })
  cinemaId: string;

  @Column({ nullable: true })
  seatId: string;

  @Column({ nullable: true })
  totalAmount: number;

  @Column({ nullable: true })
  status: string;

  constructor(court: Partial<Bookings>) {
    Object.assign(this, court);
  }
}
