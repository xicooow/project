import { User } from "@project/types";

import { defaultProcedure } from "..";
import { getError } from "../../utils";
import { UserController } from "../../controllers/user.controller";

export const login = defaultProcedure
  .input(function (value): User["email"] {
    if (!value) {
      throw new Error("Missing email");
    }
    if (typeof value !== "string") {
      throw new Error("Invalid email");
    }

    return value;
  })
  .mutation(async function ({ input: email }) {
    try {
      const user = await UserController.getUserByEmail(email);
      return {
        ...user,
        _id: user._id.toString(),
      };
    } catch (error) {
      throw getError(error);
    }
  });
