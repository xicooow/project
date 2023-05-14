import { router } from "./";
import { userProcedure } from "./routes/user.route";
import { loginProcedure } from "./routes/login.route";

export const appRouter = router({ loginProcedure, userProcedure });
