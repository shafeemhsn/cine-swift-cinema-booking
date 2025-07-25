import "reflect-metadata";
import { DataSource } from "typeorm";

import { User } from "../modules/users/user.entity";

import dotenv from "dotenv";
import { SeatConfig } from "../modules/seats/seatConfig.entity";
import { Bookings } from "../modules/booking/booking.entity";

dotenv.config();

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: true,
  logging: false,
  entities: [User, SeatConfig, Bookings],
});
