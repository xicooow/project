import { logger } from "../utils";
import { middleware } from "../trpc";

export function makeLogger() {
  return (fn: typeof middleware) =>
    fn(async function (opts) {
      const start = Date.now();
      const result = await opts.next();
      const durationMs = Date.now() - start;

      const meta = { path: opts.path, type: opts.type, durationMs };

      if (result.ok) {
        logger.info({
          message: "OK request",
          ...meta,
        });
      } else {
        logger.error({
          message: "Non-OK request",
          ...meta,
        });
      }

      return result;
    });
}
