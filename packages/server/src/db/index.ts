import mongoose from "mongoose";
import { Role } from "@project/types";

import { DB_URL, getError } from "../utils";
import { RoleController } from "../controllers/role.controller";

export async function connect() {
  return await mongoose.connect(DB_URL, { dbName: "main" });
}

export async function migrate() {
  const promises: Promise<{ level: Role["level"]; exists: boolean }>[] = [];

  const levels: Role["level"][] = ["root", "admin", "viewer"];
  for (const level of levels) {
    promises.push(
      new Promise(async function (resolve, reject) {
        try {
          const exists = await RoleController.exists({ level });
          resolve({ level, exists });
        } catch (error) {
          reject(getError(error));
        }
      })
    );
  }

  const resultSet = await Promise.allSettled(promises);
  for (const result of resultSet) {
    if (result.status === "fulfilled") {
      const { level, exists } = result.value;
      if (exists) return;

      try {
        await RoleController.create(level);
      } catch (error) {
        throw getError(error);
      }
    } else if (result.status === "rejected") {
      throw getError(result.reason);
    }
  }
}
