import cors from "cors";
import dotenv from "dotenv";
import { createHTTPServer } from "@trpc/server/adapters/standalone";

// load .env stuff
dotenv.config();

import { connect, migrate } from "./db";
import { PORT, getError } from "./utils";
import { appRouter } from "./trpc/router";

// high-level server side router export
export type AppRouter = typeof appRouter;

// db + http server
init();

async function init() {
  try {
    await connect();
    console.log("DB connected");

    await migrate();
    console.log("DB migrated");

    const server = createHTTPServer({ middleware: cors(), router: appRouter });
    server.listen(PORT);
    console.log(`HTTP server up in PORT ${PORT}`);
  } catch (error) {
    throw getError(error);
  }
}
