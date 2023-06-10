import type { Validation } from "@project/types";

import { getError } from "../utils";
import { ValidationModel } from "../models/validation.model";

function $ValidationController() {
  return {
    async create(validationData: Omit<Validation, "_id">) {
      try {
        const validation = new ValidationModel({ ...validationData });
        const createdValidation = await validation.save();
        return createdValidation;
      } catch (error) {
        throw getError(error);
      }
    },
  };
}

export const ValidationController = $ValidationController();
