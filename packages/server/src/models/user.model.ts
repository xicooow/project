import { Schema, model } from "mongoose";
import type { User } from "@project/types";

interface UserSchema extends Omit<User, "_id" | "created_date"> {
  created_date: Date;
}

const schema = new Schema<UserSchema>(
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
    email: {
      trim: true,
      type: String,
      unique: true,
      required: true,
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
