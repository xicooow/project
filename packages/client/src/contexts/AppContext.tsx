import { AnyRouter } from "@trpc/server";
import { TRPCClient } from "@trpc/client";
import { MantineProvider } from "@mantine/core";
import { FunctionComponent, PropsWithChildren } from "react";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

import { App } from "../App";
import { withAppContext } from "./withAppContext";
import { ThemeProps, mantineProps } from "../themes";
import { trpc, trpcClient, queryClient } from "../trpc";

export type AppContextProps = PropsWithChildren<{
  queryClient: QueryClient;
  mantineProps: ThemeProps;
  trpcClient: TRPCClient<AnyRouter>;
}>;

export const AppContext: FunctionComponent<AppContextProps> = ({
  trpcClient,
  queryClient,
  mantineProps,
  children,
}) => {
  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <MantineProvider {...mantineProps}>{children}</MantineProvider>
      </QueryClientProvider>
    </trpc.Provider>
  );
};

export const AppWithContexts = withAppContext(App, {
  trpcClient,
  queryClient,
  mantineProps,
});
