/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_TRPC_BATCH_LINK_URL: string;
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
