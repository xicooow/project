import cors from "cors";
import dotenv from "dotenv";
import { createHTTPServer } from "@trpc/server/adapters/standalone";

// load .env stuff
dotenv.config();

import { connect, migrate } from "./db";
import { appRouter } from "./trpc/router";
import { PORT, getError, logger } from "./utils";

// high-level server side router export
export type AppRouter = typeof appRouter;

// db + http server
init();

async function init() {
  try {
    await connect();
    logger.info("DB connected");

    await migrate();
    logger.info("DB migrated");

    const server = createHTTPServer({ middleware: cors(), router: appRouter });
    server.listen(PORT);
    logger.info("HTTP server up in PORT %d", PORT);
  } catch (error) {
    throw getError(error);
  }
}
