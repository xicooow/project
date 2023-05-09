import { router, publicProcedure } from "./";
import { RoleController } from "../controllers/role.controller";

export const appRouter = router({
  getRoles: publicProcedure.query(async function () {
    const roles = await RoleController.getAll();
    const leanedRoles = roles.map((role) => ({
      ...role.toObject(),
      _id: role._id.toString(),
    }));

    return leanedRoles;
  }),
});
