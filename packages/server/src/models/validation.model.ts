import { Schema, model } from "mongoose";
import type { Validation } from "@project/types";

interface ValidationSchema extends Omit<Validation, "_id"> {}

const schema = new Schema<ValidationSchema>(
  {
    code: {
      type: String,
      minlength: 6,
      maxlength: 6,
      required: true,
    },
    token: {
      type: String,
      unique: true,
      required: true,
    },
    userId: {
      type: String,
      unique: true,
      required: true,
    },
  },
  { versionKey: false }
);

export const ValidationModel = model("Validation", schema);
