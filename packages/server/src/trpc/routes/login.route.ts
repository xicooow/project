import crypto from "crypto";
import type { User } from "@project/types";

import { defaultProcedure } from "..";
import { getError, sendMail } from "../../utils";
import { UserController } from "../../controllers/user.controller";

export const loginProcedure = defaultProcedure
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
      user.session_count = user.session_count + 1;
      await user.save();
      /** @todo save user token as pending */
      await sendMail({
        to: email,
        subject: "Validate your login",
        html: `<p>Token: <strong>${crypto.randomUUID()}</strong></p>`,
      });
      return {
        ...user.toObject(),
        _id: user._id.toString(),
      };
    } catch (error) {
      throw getError(error);
    }
  });
