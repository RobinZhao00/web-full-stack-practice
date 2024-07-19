import mysql from "mysql2/promise";

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  database: "database_boss",
  password: "520Fangfang",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

export default pool;
