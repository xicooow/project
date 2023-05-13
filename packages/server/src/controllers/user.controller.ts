import { FilterQuery } from "mongoose";
import type { User } from "@project/types";

import { getError } from "../utils";
import { UserModel } from "../models/user.model";

function $UserController() {
  return {
    async getUserByEmail(email: User["email"]) {
      try {
        const user = await UserModel.findOne({ email }).exec();
        if (!user) {
          throw new Error(`User with email <${email}> does not exist`);
        }
        return user.toObject();
      } catch (error) {
        throw getError(error);
      }
    },
    async exists(filter: FilterQuery<User>) {
      try {
        const user = await UserModel.exists(filter).exec();
        return !!user;
      } catch (error) {
        throw getError(error);
      }
    },
  };
}

export const UserController = $UserController();
