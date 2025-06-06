import { AppDataSource } from "../../config/postgres-db";
import { User } from "./user.entity";
import { IUser } from "./user.interface";

const userRepo = AppDataSource.getRepository(User);

export const createUser = async (createUser: User): Promise<User> => {
  try {
    console.info(`Creating user: ${createUser.email}`);
    return await userRepo.save(createUser);
  } catch (error: any) {
    console.error(
      `Error creating user: ${createUser.email}, error: ${error.message}`
    );
    throw error;
  }
};
