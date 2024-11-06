import {
  bigint,
  decimal,
  int,
  mysqlEnum,
  mysqlTable,
  serial,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/mysql-core";

export const transactionCategoryEnums = mysqlEnum("category", [
  "food",
  "transportation",
  "utilities",
  "entertainment",
  "shopping",
  "healthcare",
  "education",
  "others",
]);

// user table schema
export const usersTable = mysqlTable("users", {
  id: bigint({ mode: "number" }).primaryKey().autoincrement(),
  role: int().notNull().default(0).notNull(), // 0 for user, 1 for admin
  full_name: varchar({ length: 255 }).notNull(),
  age: int().notNull().default(17),
  balance: decimal({ precision: 16, scale: 2 }).notNull().default("0.0"),
  username: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  password: varchar({ length: 255 }).notNull(),
  profilePicture: varchar("profile_picture", { length: 256 }),
  createdAt: timestamp("created_at"),
  updatedAt: timestamp("updated_at"),
});

export const userFinancial = mysqlTable("user_financial_profile", {
  id: bigint({ mode: "number" }).primaryKey().autoincrement(),
  user_id: bigint({ mode: "number" })
    .references(() => usersTable.id)
    .notNull(),
  monthly_income: decimal(),
  current_savings: decimal(),
  debt: decimal(),
  financial_goals: text(),
  risk_management: decimal(),
});

export const transactionsTable = mysqlTable("transactions", {
  id: bigint({ mode: "number" }).primaryKey().autoincrement(),
  user_id: bigint({ mode: "number" })
    .references(() => usersTable.id)
    .notNull(),
  type: int().notNull().default(0), // 0 for income , 1 for expense
  category: transactionCategoryEnums.notNull(),
  amount: decimal().notNull(),
  description: text("description"),
  createdAt: timestamp("created_at"),
  updatedAt: timestamp("updated_at"),
});
