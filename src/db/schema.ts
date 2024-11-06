import {
  int,
  mysqlEnum,
  mysqlTable,
  serial,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/mysql-core";

// user table schema
export const usersTable = mysqlTable("users", {
  id: serial().primaryKey(),
  role: int().notNull().default(0).notNull(), // 0 for user, 1 for admin
  full_name: varchar({ length: 255 }).notNull(),
  age: int().notNull().default(17),
  balance: int().notNull().default(0),
  username: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  password: varchar({ length: 255 }).notNull(),
  profilePicture: varchar("profile_picture", { length: 256 }),
  createdAt: timestamp("created_at"),
  updatedAt: timestamp("updated_at"),
});

// export const transactionsTable = mysqlTable("transactions", {
//   id: serial().primaryKey(),
//   user_id: int()
//     .references(() => usersTable.id)
//     .notNull(),
//   type: int().notNull().default(0), // 0 for income , 1 for expense
//   amount: int().notNull(),
//   description: text("description"),
//   createdAt: timestamp("created_at"),
//   updatedAt: timestamp("updated_at"),
// });
