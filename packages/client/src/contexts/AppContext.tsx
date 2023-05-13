import { AnyRouter } from "@trpc/server";
import { TRPCClient } from "@trpc/client";
import { FunctionComponent, PropsWithChildren } from "react";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

import App from "../App";
import { withAppContext } from "./withAppContext";
import { trpc, trpcClient, queryClient } from "../trpc";

export type AppContextProps = {
  queryClient: QueryClient;
  trpcClient: TRPCClient<AnyRouter>;
} & PropsWithChildren;

export const AppContext: FunctionComponent<AppContextProps> = ({
  trpcClient,
  queryClient,
  children,
}) => {
  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </trpc.Provider>
  );
};

export const AppWithContexts = withAppContext(App, { trpcClient, queryClient });
