import { FilterQuery } from "mongoose";
import type { Role } from "@project/types";

import { getError } from "../utils";
import { RoleModel } from "../models/role.model";

function $RoleController() {
  return {
    async getRoleByLevel(level: Role["level"]) {
      try {
        const role = await RoleModel.findOne({ level }).exec();
        if (!role) {
          throw new Error(`Role with level <${level}> does not exist`);
        }
        return role;
      } catch (error) {
        throw getError(error);
      }
    },
    async create(level: Role["level"]) {
      try {
        const role = new RoleModel({ level });
        return await role.save();
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
