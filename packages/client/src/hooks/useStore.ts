import { useContext } from "react";

import { StoreContext } from "../contexts/StoreContext";

export function useStore() {
  const context = useContext(StoreContext);

  if (!context) {
    throw new Error("useStore must be used within StoreContextProvider");
  }

  return {
    ...context.data,
    ...context.methods,
  };
}
