import { FilterQuery } from "mongoose";
import type { User, CreateUser } from "@project/types";

import { getError } from "../utils";
import { UserModel } from "../models/user.model";
import { RoleController } from "./role.controller";

function $UserController() {
  return {
    async create(userData: CreateUser) {
      try {
        const viewerRole = await RoleController.getRoleByLevel("viewer");
        const user = new UserModel({ ...userData, role: viewerRole._id });
        const createdUser = await user.save();
        return createdUser.populate("role");
      } catch (error) {
        throw getError(error);
      }
    },
    async getUserByEmail(email: User["email"]) {
      try {
        const user = await UserModel.findOne({ email }).populate("role").exec();
        if (!user) {
          throw new Error(`User with email <${email}> does not exist`);
        }
        return user;
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
