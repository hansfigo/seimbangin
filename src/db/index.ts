import "dotenv/config";
import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";

// database configuration
const host = process.env.DB_HOST;
const user = process.env.DB_USER;
const password = process.env.DB_PASSWORD;
const database = process.env.DB_NAME;

// create a connection pool
const poolConnection = mysql.createPool({
  host: host || "",
  user: user || "",
  password: password || "",
  database: database || "",
});

// create a drizzle instance
const db = drizzle({ client: poolConnection });

export default db;
