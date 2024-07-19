import Router from "koa-router";
import users from "./users.mjs";

const router = new Router();
router.use(users.routes(), users.allowedMethods());

router.preventNext = (handle) => async (ctx, next) => {
  router.get('/(.*)', async (ctx) => {
    try {
      await handle(ctx.req, ctx.res);
    } catch (err) {
    }
    ctx.respond = false;
  });
  await next();
};

export default router;
