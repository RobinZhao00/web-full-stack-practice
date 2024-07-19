import Redis from "ioredis";

class RedisPool {
  constructor(options, poolSize) {
    this.pool = [];
    this.poolSize = poolSize || 10;
    this.options = options;

    for (let i = 0; i < this.poolSize; i++) {
      const client = new Redis(this.options);
      this.pool.push(client);
    }

    this.current = 0;
  }

  getClient() {
    const client = this.pool[this.current];
    this.current = (this.current + 1) % this.poolSize;
    return client;
  }

  quitAll() {
    this.pool.forEach(client => client.quit());
  }
}

const pool = new RedisPool({
  host: "127.0.0.1",
  port: 6379,
  password: "520Fangfang",
  db: 0
}, 10);

export default pool;

// const redis = new Redis('redis://default:520Fangfang@127.0.0.1:6379/0');
