import { AppDataSource } from "../../config/postgres-db";
import { SeatConfig } from "./seatConfig.entity";
import { ISeat } from "./seat.interface";

const seatConfigRepo = AppDataSource.getRepository(SeatConfig);

export const createSeatConfig = async (
  createSeatConfig: ISeat
): Promise<SeatConfig> => {
  try {
    console.info(`Creating SeatConfig: ${createSeatConfig.seatId}`);
    const data = new SeatConfig(createSeatConfig);

    return await seatConfigRepo.save(data);
  } catch (error: any) {
    console.error(
      `Error creating SeatConfig: ${createSeatConfig.seatId}, error: ${error.message}`
    );
    throw error;
  }
};

export const getAllSeatConfig = async (): Promise<SeatConfig[]> => {
  try {
    return await seatConfigRepo.find({
      where: {
        cinemaId: "C001",
      },
    });
  } catch (error: any) {
    console.error(`Error retrieving SeatConfig, error: ${error.message}`);
    throw error;
  }
};
