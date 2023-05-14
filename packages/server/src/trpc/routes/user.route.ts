import { CreateUser } from "@project/types";

import { defaultProcedure } from "..";
import { getError } from "../../utils";
import { UserController } from "../../controllers/user.controller";

export const userProcedure = defaultProcedure
  .input(function (value): CreateUser {
    if (!value) {
      throw new Error("Missing user data");
    }
    if (typeof value !== "object" || Array.isArray(value)) {
      throw new Error("Invalid user data");
    }

    return value as CreateUser;
  })
  .mutation(async function ({ input: userData }) {
    try {
      const createdUser = await UserController.create(userData);
      return {
        ...createdUser.toObject(),
        _id: createdUser._id.toString(),
      };
    } catch (error) {
      throw getError(error);
    }
  });
