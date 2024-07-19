import Router from "koa-router";
import UsersController from "../controllers/usersController.mjs";

const router = new Router({ prefix: '/api/users' });

router.get("/", UsersController.getUsers);
router.get("/:id", UsersController.getUserById);
router.post("/", UsersController.createUser);
router.put("/:id", UsersController.updateUser);
router.delete("/:id", UsersController.deleteUser);

export default router;
