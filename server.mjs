import Koa from "koa";
import bodyParser from "koa-bodyparser";
import next from "next";
import cors from "koa-cors";
import db from "./middlewares/db.mjs";
import logs from "./middlewares/logs.mjs";
import router from "./routes/index.mjs";

const app = next({});
const handle = app.getRequestHandler();
const run = async () => {
  try {
    await app.prepare();
    const server = new Koa();
    server
    .use(cors({
      origin: "http://localhost:3000", // 允许的源
      credentials: true
    }))
    .use(db())
    .use(logs())
    .use(bodyParser())
    .use(router.preventNext(handle))
    .use(router.routes())
    .use(router.allowedMethods());

    server.listen(3001, () => {
      console.log("> Ready on http://localhost:3001");
    });
  }
  catch (error) {
    console.error("Failed to start server:", error);
  }
};


run();