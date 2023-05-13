import { initTRPC } from "@trpc/server";

import { makeLogger } from "../middlewares/logger";

const logger = makeLogger();
const t = initTRPC.create();

export const router = t.router;
export const middleware = t.middleware;
export const publicProcedure = t.procedure;
export const defaultProcedure = publicProcedure.use(logger(middleware));
