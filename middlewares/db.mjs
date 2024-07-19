import redis from '../configs/redis.mjs';
import db from '../configs/db.mjs';

const dbMiddleware = () => async (ctx, next) => {
  ctx.redis = redis;
  ctx.db = db;
  await next();
};

export default dbMiddleware;