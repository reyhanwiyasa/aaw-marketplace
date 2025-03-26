import bcrypt from "bcrypt";
import { NewUser } from "../../../db/schema/users";
import { insertNewUser } from "../dao/insertNewUser.dao";
import {
  InternalServerErrorResponse,
  ConflictResponse,
} from "../../commons/patterns";

export const registerService = async (
  username: string,
  email: string,
  password: string,
  full_name: string,
  address: string,
  phone_number: string
) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    if (!process.env.TENANT_ID) {
      return new InternalServerErrorResponse(
        "Server tenant ID is missing"
      ).generate();
    }

    const userData: NewUser = {
      tenant_id: process.env.TENANT_ID,
      username,
      email,
      password: hashedPassword,
      full_name,
      address,
      phone_number,
    };

    const newUser = await insertNewUser(userData);

    return {
      data: newUser,
      status: 201,
    };
  } catch (err: any) {
    if (err?.code === "23505") {
      // PostgreSQL unique violation
      return new ConflictResponse(
        "A user with this username or email already exists."
      ).generate();
    }

    return new InternalServerErrorResponse(err).generate();
  }
};
