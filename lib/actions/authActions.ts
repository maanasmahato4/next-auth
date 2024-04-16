"use server";

import DBConnection from "../database/database";
import User from "../models/user";
import bcrypt from "bcrypt";

export interface IUser {
  username: string;
  email: string;
  phone: string;
  password: string;
}

DBConnection();

export async function registerUser(user: IUser) {
  try {
    const result = await User.create({
      ...user,
      password: await bcrypt.hash(user.password, 10),
    });

    const resultUser = {
      _id: result._id.toString(),
      username: result.username,
      email: result.email,
    };

    return resultUser;
  } catch (error: any) {
    console.error(error);
    throw new Error(error.message);
  }
}
