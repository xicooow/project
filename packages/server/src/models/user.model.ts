import { Schema, model } from "mongoose";
import type { User } from "@project/types";

const schema = new Schema<User>(
  {
    first_name: {
      trim: true,
      type: String,
      minlength: 2,
      maxlength: 16,
      required: true,
    },
    last_name: {
      trim: true,
      type: String,
      minlength: 2,
      maxlength: 16,
      default: null,
    },
    active: {
      default: false,
      type: Boolean,
    },
    session_count: {
      default: 0,
      type: Number,
    },
    created_date: {
      type: Date,
      default: new Date(),
    },
    role: {
      ref: "Role",
      required: true,
      type: Schema.Types.ObjectId,
    },
    display_name: {
      trim: true,
      type: String,
      minlength: 4,
      maxlength: 32,
    },
  },
  { versionKey: false }
);

schema.pre("validate", function (next) {
  this.display_name = `${this.first_name}`;
  if (this.last_name) {
    this.display_name += ` ${this.last_name}`;
  }

  this.display_name = this.display_name.toLowerCase();

  next();
});

export const UserModel = model("User", schema);
