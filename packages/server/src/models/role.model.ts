import { Schema, model } from "mongoose";
import type { Role } from "@project/types";

const schema = new Schema<Role>(
  {
    level: {
      type: String,
      required: true,
      default: "viewer",
      enum: ["root", "admin", "viewer"],
    },
    privileges: {
      read: {
        type: Boolean,
        default: true,
      },
      write: {
        type: Boolean,
        default: false,
      },
      delete: {
        type: Boolean,
        default: false,
      },
    },
  },
  { versionKey: false }
);

schema.pre("validate", function (next) {
  let error: Error | undefined;

  switch (this.level) {
    case "root":
      this.privileges = {
        read: true,
        write: true,
        delete: true,
      };
      break;
    case "admin":
      this.privileges = {
        read: true,
        write: true,
        delete: false,
      };
      break;
    case "viewer":
      this.privileges = {
        read: true,
        write: false,
        delete: false,
      };
      break;
    default:
      error = new Error("Invalid role level");
      break;
  }

  next(error);
});

export const RoleModel = model("Role", schema);
