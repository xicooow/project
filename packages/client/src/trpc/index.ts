import type { AppRouter } from "@project/server";
import { QueryClient } from "@tanstack/react-query";
import { createTRPCReact, httpBatchLink } from "@trpc/react-query";

import { tRPCBatchLinkURL } from "../utils";

export const trpc = createTRPCReact<AppRouter>();
export const queryClient = new QueryClient();
export const trpcClient = trpc.createClient({
  links: [httpBatchLink({ url: tRPCBatchLinkURL() })],
});
