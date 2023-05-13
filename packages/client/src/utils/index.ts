// functions
export function tRPCBatchLinkURL() {
  const tRPCBatchLinkURL = import.meta.env.VITE_TRPC_BATCH_LINK_URL;
  if (!tRPCBatchLinkURL) {
    throw new Error("Missing required tRPC url config!");
  }

  return tRPCBatchLinkURL;
}
