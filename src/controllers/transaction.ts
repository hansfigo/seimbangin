import { Request, Response } from "express";
import db from "../db";
import { transactionsTable, usersTable } from "../db/schema";
import { validationResult } from "express-validator";
import { eq } from "drizzle-orm";

export const transactionController = {
  create: async (req: Request, res: Response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }

    const { type, category, amount, description } = req.body;

    const user = await db.query.usersTable.findFirst({
      where: (user, { eq }) => eq(user.id, req.user.id),
    });

    if (!user) {
      res.status(404).send({
        status: "error",
        message: "User not found",
      });
      return;
    }

    if (type == 1 && user.balance < amount) {
      res.status(400).send({
        status: "error",
        message: "Insufficient balance",
      });
      return;
    }

    try {
      await db.insert(transactionsTable).values({
        user_id: req.user.id,
        type,
        category,
        amount,
        description,
      });

      const newBalance =
        type == 0
          ? Number(user.balance) + Number(amount)
          : Number(user.balance) - Number(amount);

      await db
        .update(usersTable)
        .set({
          balance: newBalance.toString(),
        })
        .where(eq(usersTable.id, req.user.id));

      res.send({
        status: "success",
        message: "Transaction created successfully",
        data: {
          user_id: req.user.id,
          balance: newBalance,
          type,
          category,
          amount,
          description,
        },
      });
    } catch (error) {
      res.status(500).send({
        status: "error",
        message: "Error creating transaction",
        error: error,
      });
      return;
    }
  },
};
