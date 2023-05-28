import {
  useEffect,
  useReducer,
  createContext,
  PropsWithChildren,
  FunctionComponent,
} from "react";
import type { User } from "@project/types";

import { useCacheUser } from "../hooks/useCacheUser";
import { reducer, initialState } from "../store/reducer";

export type StoreContextProps = {
  data: { user: User };
  methods: { cleanup: () => void; setUser: (user: User) => void };
};

export const StoreContext = createContext<StoreContextProps | null>(null);

export const StoreContextProvider: FunctionComponent<PropsWithChildren> = ({
  children,
}) => {
  const { cacheUser } = useCacheUser();
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(
    function () {
      if (cacheUser) setUser(cacheUser);
    },
    [cacheUser]
  );

  function setUser(user: User) {
    dispatch({ type: "SET_USER", payload: { ...user } });
  }

  function cleanup() {
    dispatch({ type: "CLEANUP" });
  }

  const value: StoreContextProps = {
    data: state,
    methods: { setUser, cleanup },
  };

  return (
    <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
  );
};
