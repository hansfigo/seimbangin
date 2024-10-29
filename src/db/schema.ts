import { mysqlTable, serial, varchar } from "drizzle-orm/mysql-core";

// user table schema
export const usersTable = mysqlTable("users", {
  id: serial().primaryKey(),
  first_name: varchar({ length: 255 }).notNull(),
  last_name: varchar({ length: 255 }).notNull(),
  username: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  password : varchar({ length: 255 }).notNull(),
});

// export const transactionsTable = mysqlTable("transactions", {
//   id: serial().primaryKey(),
//   user_id: int().notNull(),
//   amount: int().notNull(),
//   created_at: varchar({ length: 255 }).notNull(),
// });
