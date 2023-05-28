import type { User } from "@project/types";

import { StoreContextProps } from "../contexts/StoreContext";

export type State = StoreContextProps["data"];

export type ActionType =
  | {
      type: "SET_USER";
      payload: User;
    }
  | {
      type: "CLEANUP";
    };
