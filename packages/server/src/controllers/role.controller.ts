import { FilterQuery } from "mongoose";
import type { Role } from "@project/types";

import { getError } from "../utils";
import { RoleModel } from "../models/role.model";

function $RoleController() {
  return {
    async getAll() {
      try {
        const roles = await RoleModel.find({}).exec();
        return roles;
      } catch (error) {
        throw getError(error);
      }
    },
    async create({ level }: Pick<Role, "level">) {
      try {
        const role = new RoleModel({ level });
        const createdRole = await role.save();
        return createdRole.toObject();
      } catch (error) {
        throw getError(error);
      }
    },
    async exists(filter: FilterQuery<Role>) {
      try {
        const role = await RoleModel.exists(filter).exec();
        return !!role;
      } catch (error) {
        throw getError(error);
      }
    },
  };
}

export const RoleController = $RoleController();
