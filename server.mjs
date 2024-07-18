import Koa from 'koa';
import Router from 'koa-router';
import bodyParser from 'koa-bodyparser';
import serve from 'koa-static';
import mount from 'koa-mount';
import Redis from 'ioredis';
import mysql from 'mysql2/promise';
import next from 'next';
import path from 'path';
import { fileURLToPath } from 'url';

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev: false, customServer: true });
const handle = app.getRequestHandler();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

(async () => {
  try {
    // const redis = new Redis('redis://default:520Fangfang@127.0.0.1:6379/0');
    // const db = await mysql.createConnection({
    //   host: 'localhost',
    //   user: 'root',
    //   database: 'database_boss',
    //   password: '520Fangfang'
    // });
    await app.prepare();
    const server = new Koa();
    const router = new Router();
    server.use(async (ctx, next) => {
      await next();
      console.log(`Request path: ${ctx.path}, Status code: ${ctx.status}`);
    });
    server.use(bodyParser());
    server.use(mount('/_next', serve(path.join(__dirname, '.next'))));
    server.use(async (ctx) => {
      try {
        await handle(ctx.req, ctx.res);
        ctx.respond = false; // 告诉 Koa 不要自动发送响应
      } catch (err) {
        console.log('err', err)
      }
    });
    server.use(router.routes());
    server.use(router.allowedMethods());

    server.listen(4000, () => {
      console.log('Ready on http://localhost:4000');
    });
    // server.use(router.routes());
    // server.use(router.allowedMethods());
    // server.use(async (ctx) => {
    //   try {
    //     await handle(ctx.req, ctx.res);
    //     ctx.respond = false;
    //   } catch (err) {
    //     console.log('err', err);
    //   }
    // });
    //
    // server.listen(3000, () => {
    //   console.log('> Ready on http://localhost:3000');
    // });
  } catch (error) {
    console.error('Failed to start server:', error);
  }
})();