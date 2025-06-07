import dotenv from "dotenv";
import * as bcrypt from "bcrypt";

import { IUser } from "../users/user.interface";

import HttpException from "../../util/http-exception.model";
import { encrypt } from "./encrypt";
import { createUser, getUserByEmail } from "../users/user.repository";
import { AuthResult, LoginInput } from "./auth.interface";
import { User } from "../users/user.entity";

dotenv.config();

export const signup = async (registerUser: IUser): Promise<AuthResult> => {
  try {
    console.info(`Signup attempt: ${registerUser?.email || "unknown email"}`);

    const user = new User();
    user.firstName = registerUser.firstName;
    user.lastName = registerUser.lastName;
    user.email = registerUser.email;
    user.salt = await bcrypt.genSalt();
    user.password = await hashPassword(registerUser.password, user.salt);
    user.role = "customer";

    const newUser = await createUser(user);

    console.info(`User created: ${newUser.firstName || "unknown name"}`);

    const token = encrypt.generateToken({
      userId: newUser.id,
      email: newUser.email,
    });

    console.info(`Token generated for signup: ${newUser.email}`);

    return {
      data: {
        user: {
          userId: newUser.id,
          firstName: newUser.firstName,
          lastName: newUser.lastName,
          email: newUser.email,
          role: newUser.role,
        },
        accessToken: token,
      },
    };
  } catch (error: any) {
    console.error(
      `Signup error for email ${registerUser?.email || "unknown"}: ${
        error.message
      }`
    );

    if (error.code === "23505") {
      throw new HttpException(409, {
        message: "Email already exist",
        data: {
          accessToken: null,
        },
        error: { errmsg: error.message },
      });
    } else {
      throw new HttpException(500, {
        message: "Server error",
        error: { error },
      });
    }
  }
};

export const login = async (loginInput: LoginInput): Promise<AuthResult> => {
  try {
    console.info(`Login attempt: ${loginInput.email}`);

    const user: any = await getUserByEmail(loginInput.email);
    if (!user) {
      console.warn(
        `Login failed: user not found for email ${loginInput.email}`
      );
      throw new HttpException(401, {
        message: "Invalid email or password",
        result: false,
      });
    }

    const isMatch = await encrypt.verifyPassword(
      user.password,
      loginInput.password
    );

    if (!isMatch) {
      console.warn(`Login failed: password mismatch for ${loginInput.email}`);
      throw new HttpException(401, {
        message: "Invalid email or password",
        result: false,
      });
    }

    const token = encrypt.generateToken({
      userId: user.id,
      email: user.email,
    });

    console.info(`Login successful: ${user.email}`);

    return {
      data: {
        user: {
          userId: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          role: user.role,
          email: user.email,
        },
        accessToken: token,
      },
    };
  } catch (error: any) {
    console.error(
      `Login error for email ${loginInput.email}: ${error.message}`
    );
    throw error;
  }
};

export const hashPassword = async (
  password: string,
  salt: string
): Promise<string> => {
  return bcrypt.hash(password, salt);
};
