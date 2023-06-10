import jwt from "jsonwebtoken";
import type { User } from "@project/types";

import { defaultProcedure } from "..";
import { UserController } from "../../controllers/user.controller";
import { generateCode, getError, getJWTSecret, sendMail } from "../../utils";
import { ValidationController } from "../../controllers/validation.controller";

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
      const code = generateCode();
      const userId = user._id.toString();
      const token = jwt.sign({ userId }, getJWTSecret(), { expiresIn: "1d" });
      await ValidationController.create({ code, token, userId });
      await sendMail({
        to: email,
        subject: "Validate your login",
        html: `<p>Activation Code: <strong>${code}</strong></p>`,
      });
    } catch (error) {
      throw getError(error);
    }
  });
